import { useMemo } from 'react';

// Ambient winter snowfall — a fixed, non-interactive overlay of drifting flakes.
// Sits above page content (z-40) but below the navbar and modals (z-50), and
// disables itself for users who prefer reduced motion (handled in index.css).
const FLAKE_COUNT = 55;

export default function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 8 + Math.random() * 14,
        delay: -Math.random() * 22,
        drift: (Math.random() * 2 - 1) * 50,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ['--drift' as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
