import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VideoShowcase() {
    const { t } = useLanguage();

    const videos = [
        {
            src: '/video1.MOV',
            title: t.videoShowcase.video1,
            type: 'video/quicktime'
        },
        {
            src: '/video2.mp4',
            title: t.videoShowcase.video2,
            type: 'video/mp4'
        }
    ];

    return (
        <section className="py-24 bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 px-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                        <span className="text-brand-400 font-bold text-sm tracking-wide uppercase">Media</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        {t.videoShowcase.title}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {t.videoShowcase.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    {videos.map((video, index) => (
                        <div key={index} className="group relative">
                            {/* Video Container */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-800 border border-gray-700/50 shadow-2xl transition-all duration-500 group-hover:border-brand-500/30 group-hover:shadow-brand-500/20">
                                <video
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    controls
                                    preload="metadata"
                                >
                                    <source src={video.src} type={video.type} />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />

                                {/* Play Button Decor (Optional, since controls are present, but adds premium feel) */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-16 h-16 rounded-full bg-brand-500/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <Play className="text-white fill-white w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mt-6 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors duration-300">
                                    {video.title}
                                </h3>
                                <div className="mt-2 w-12 h-1 bg-brand-500 rounded-full group-hover:w-24 transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
