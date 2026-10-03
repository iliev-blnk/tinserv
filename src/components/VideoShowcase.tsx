import { useLanguage } from '../contexts/LanguageContext';

const photos = [
  { src: '/media/photo_4.jpg', alt: 'TinSerV volunteers in winter' },
  { src: '/media/photo1.jpg', alt: 'Community service volunteers' },
  { src: '/media/photo2.jpg', alt: 'Outdoor volunteer group' },
  { src: '/media/photo3.jpg', alt: 'TinSerV volunteers' },
];

export default function VideoShowcase() {
  const { t } = useLanguage();
  const videos = [
    { src: '/media/copii.mp4', poster: '/media/copii.jpg', title: t.videoShowcase.video1, tall: true },
    { src: '/media/colinde.mp4', poster: '/media/colinde.jpg', title: t.videoShowcase.video2, tall: false },
  ];

  return (
    <section id="media" className="scroll-mt-20 border-t border-paper/10">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="font-black-heading mb-4 text-5xl text-white sm:text-6xl">{t.site.media.title}</h2>
        <p className="mb-12 max-w-xl text-paper/60">{t.videoShowcase.subtitle}</p>

        {/* big + wide + two small: fills a 2-column grid on phones and 4×2 on desktop */}
        <div className="mb-4 grid grid-cols-2 gap-4 lg:h-[34rem] lg:grid-cols-4 lg:grid-rows-2">
          {photos.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`h-full w-full object-cover ${
                i === 0 ? 'col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto'
                : i === 1 ? 'col-span-2 aspect-[2/1] lg:aspect-auto'
                : 'aspect-square lg:aspect-auto'
              }`}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_3.16fr]">
          {videos.map((v) => (
            <figure key={v.src}>
              <video
                className={`w-full bg-black object-cover ${v.tall ? 'aspect-[9/16]' : 'aspect-video'}`}
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="none"
              />
              <figcaption className="mt-3 text-sm text-paper/60">{v.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
