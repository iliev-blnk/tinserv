import { useEffect, useRef } from 'react';

// "Raze": a light sits behind the TinSerV runner and his silhouette cuts shafts
// through it. The light follows the pointer, and drifts around the logo's own
// sparkle position when nobody is steering it.
// Technique: draw the glow with the runner cut out into a half-size buffer, then
// smear that buffer outward from the light many times with additive blending.

const FIG = { w: 567, h: 654 };
const PARTS = {
  leg: { x: 0, y: 376 },
  torso: { x: 144, y: 119 },
  head: { x: 132, y: 128 },
} as const;
const SPARK = { x: 488, y: 80 };

type Part = keyof typeof PARTS;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Solid black copy of a piece, for the silhouette and the occluder.
function silhouette(img: HTMLImageElement) {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d')!;
  g.drawImage(img, 0, 0);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = '#000';
  g.fillRect(0, 0, c.width, c.height);
  return c;
}

// Light colours: warm (yellow-orange) and cold (blue). The hero fades between them.
const WARM = { core: [255, 250, 232], mid: [255, 196, 40], edge: [255, 80, 0], dust: [255, 226, 160], halo: [255, 230, 0] };
const COLD = { core: [240, 248, 255], mid: [110, 160, 255], edge: [40, 30, 210], dust: [200, 220, 255], halo: [159, 195, 255] };
type Rgb = number[];
const mixRgb = (a: Rgb, b: Rgb, k: number) => a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',');

// 0 = warm, 1 = cold. Opens warm, turns cold around 3.5 s and holds it for 20 s,
// then alternates 15 s warm / 15 s cold. Every switch is a 3 s fade.
const FADE = 3;
function coldness(t: number) {
  const ramp = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
  if (t < 2) return 0;
  if (t < 25) return ramp((t - 2) / FADE);
  const p = (t - 25) % 30;
  if (p < 15) return 1 - ramp(p / FADE);
  return ramp((p - 15) / FADE);
}

function noiseTile(size: number, alpha: number) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const d = g.createImageData(size, size);
  for (let i = 0; i < d.data.length; i += 4) {
    const v = Math.random() * 255;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
    d.data[i + 3] = alpha;
  }
  g.putImageData(d, 0, 0);
  return c;
}

export default function Raze({ className = '' }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const host = el.parentElement;
    // Without motion the light stays warm, so the line is simply shown.
    if (reduced) host?.style.setProperty('--cold', '1');
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const STEPS = coarse ? 26 : 40;

    // Internal resolution is capped; the canvas is stretched to fit with CSS.
    // The glow is soft, so big screens lose nothing visible and the GPU does far less.
    const MAX_W = 1600;
    let W = 0, H = 0, k = 1, raf = 0, visible = true, alive = true;
    let body: Record<Part, HTMLCanvasElement> | null = null;
    let spark: HTMLImageElement | null = null;
    const light = document.createElement('canvas');
    const lctx = light.getContext('2d')!;
    const probe = document.createElement('canvas');
    const pctx = probe.getContext('2d', { willReadFrequently: true })!;
    const grain = ctx.createPattern(noiseTile(192, 30), 'repeat')!;
    const lines = document.createElement('canvas');
    let dust: { x: number; y: number; z: number; vx: number; vy: number; ph: number }[] = [];
    let lx = 0, ly = 0, pointer: [number, number] | null = null;

    // Runner on the right on wide screens, centred and lower on phones.
    const layout = () => {
      const wide = W > H * 1.05;
      // Short, wide windows (laptops, the 1200×630 share image) keep the head clear of the headline.
      const fh = wide ? Math.min(H * 0.74, W * 0.4 * FIG.h / FIG.w) : Math.min(H * 0.42, W * 0.8 * FIG.h / FIG.w);
      const cx = wide ? W * (W / H > 1.7 ? 0.74 : 0.7) : W * 0.5;
      const cy = wide ? H * 0.56 : H * 0.5;
      const s = fh / FIG.h;
      return { fh, cx, cy, home: [cx + (SPARK.x - FIG.w / 2) * s, cy + (SPARK.y - FIG.h / 2) * s] as [number, number] };
    };

    const drawRunner = (g: CanvasRenderingContext2D, cx: number, cy: number, h: number) => {
      if (!body) return;
      const s = h / FIG.h;
      for (const k of Object.keys(PARTS) as Part[]) {
        const im = body[k];
        g.drawImage(im, cx + (PARTS[k].x - FIG.w / 2) * s, cy + (PARTS[k].y - FIG.h / 2) * s, im.width * s, im.height * s);
      }
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      k = Math.min(1, MAX_W / Math.max(1, r.width));
      W = Math.max(1, Math.round(r.width * k));
      H = Math.max(1, Math.round(r.height * k));
      cv.width = W; cv.height = H;
      light.width = Math.ceil(W / 2); light.height = Math.ceil(H / 2);
      probe.width = Math.ceil(W / 12); probe.height = Math.ceil(H / 12);
      lines.width = W; lines.height = H;
      const lg = lines.getContext('2d')!;
      lg.strokeStyle = 'rgba(0,0,0,0.28)';
      for (let y = 0; y < H; y += 4) { lg.beginPath(); lg.moveTo(0, y + 0.5); lg.lineTo(W, y + 0.5); lg.stroke(); }
      dust = Array.from({ length: Math.round(W * H / 5000) }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: Math.random(),
        vx: (Math.random() - 0.5) * 0.5, vy: -0.15 - Math.random() * 0.4, ph: Math.random() * 6.28,
      }));
      [lx, ly] = layout().home;
      if (reduced) frame(0);
    };

    const frame = (now: number) => {
      if (!body || !spark) return;
      const t = now / 1000;
      const k = reduced ? 0 : coldness(t);
      // Lets the hero text follow the light: --cold drives the "iarna asta" line.
      host?.style.setProperty('--cold', k.toFixed(3));
      const { fh, cx, cy, home } = layout();
      const [tx, ty] = pointer && !reduced
        ? pointer
        : [home[0] + Math.sin(t * 0.5) * W * 0.05 - W * 0.01, home[1] + Math.sin(t * 0.8) * H * 0.04];
      lx += (tx - lx) * (pointer ? 0.08 : 0.04);
      ly += (ty - ly) * (pointer ? 0.08 : 0.04);

      // glow with the runner cut out of it
      lctx.globalCompositeOperation = 'source-over';
      lctx.fillStyle = '#000';
      lctx.fillRect(0, 0, light.width, light.height);
      const r = Math.max(W, H) * 0.5 * 0.42;
      const g = lctx.createRadialGradient(lx / 2, ly / 2, 0, lx / 2, ly / 2, r);
      g.addColorStop(0, `rgba(${mixRgb(WARM.core, COLD.core, k)},1)`);
      g.addColorStop(0.1, `rgba(${mixRgb(WARM.mid, COLD.mid, k)},0.9)`);
      g.addColorStop(0.45, `rgba(${mixRgb(WARM.edge, COLD.edge, k)},0.25)`);
      g.addColorStop(1, `rgba(${mixRgb(WARM.edge, COLD.edge, k)},0)`);
      lctx.fillStyle = g;
      lctx.fillRect(0, 0, light.width, light.height);
      drawRunner(lctx, cx / 2, cy / 2, fh / 2);

      // smear outward from the light: the gaps become shafts
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < STEPS; i++) {
        const s = 1 + i * (2 / STEPS);
        ctx.globalAlpha = (3.4 / STEPS) * Math.pow(1 - i / STEPS, 1.1);
        ctx.drawImage(light, lx * (1 - s), ly * (1 - s), W * s, H * s);
      }
      ctx.globalAlpha = 1;

      // dust shows only where the light actually reaches
      pctx.drawImage(cv, 0, 0, probe.width, probe.height);
      const px = pctx.getImageData(0, 0, probe.width, probe.height).data;
      const dustRgb = mixRgb(WARM.dust, COLD.dust, k);
      for (const d of dust) {
        d.x = (d.x + d.vx + Math.sin(t + d.ph) * 0.25 + W) % W;
        d.y = (d.y + d.vy + H) % H;
        const i = (Math.floor(d.y / 12) * probe.width + Math.floor(d.x / 12)) * 4;
        const lum = (px[i] + px[i + 1] + px[i + 2]) / 765;
        if (lum < 0.08) continue;
        ctx.fillStyle = `rgba(${dustRgb},${Math.min(1, lum * 1.4) * (0.35 + d.z * 0.6)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.5 + d.z * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      drawRunner(ctx, cx, cy, fh);
      const ss = fh * 0.1 * (1 + Math.sin(t * 2.2) * 0.05);
      ctx.save();
      ctx.shadowBlur = ss * 0.8;
      ctx.shadowColor = `rgb(${mixRgb(WARM.halo, COLD.halo, k)})`;
      ctx.translate(lx, ly);
      ctx.rotate(Math.sin(t * 0.9) * 0.12);
      ctx.drawImage(spark, -ss / 2, -ss / 2, ss, ss);
      ctx.restore();

      ctx.drawImage(lines, 0, 0);
      ctx.save();
      ctx.translate(Math.random() * 192, Math.random() * 192);
      ctx.fillStyle = grain;
      ctx.fillRect(-192, -192, W + 192, H + 192);
      ctx.restore();
    };

    const loop = (now: number) => {
      frame(now);
      if (alive && visible && !reduced) raf = requestAnimationFrame(loop);
    };
    const start = () => { cancelAnimationFrame(raf); if (!reduced) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      pointer = x >= 0 && y >= 0 && x <= r.width && y <= r.height ? [x * k, y * k] : null;
    };
    const onLeave = () => { pointer = null; };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    const onVis = () => { visible = !document.hidden; if (visible) start(); };

    Promise.all(['/raze/leg.png', '/raze/torso.png', '/raze/head.png', '/raze/sparkle.png'].map(loadImage)).then(([leg, torso, head, sp]) => {
      if (!alive) return;
      body = { leg: silhouette(leg), torso: silhouette(torso), head: silhouette(head) };
      spark = sp;
      resize();
      ro.observe(el);
      io.observe(el);
      window.addEventListener('pointermove', onMove);
      document.documentElement.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVis);
      if (reduced) frame(0); else start();
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <canvas ref={canvas} className="block w-full h-full" />
    </div>
  );
}
