import { useEffect, useState, useRef } from 'react';
import { Users, Clock, Building2, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 2000;
                    const steps = 60;
                    const increment = value / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <div ref={ref} className="font-black-heading text-4xl lg:text-5xl text-white">
            {count.toLocaleString()}{suffix}
        </div>
    );
}

export default function Stats() {
    const { t } = useLanguage();

    const stats = [
        { icon: Users,     value: 2547,  suffix: '+', label: t.impact.volunteers },
        { icon: Clock,     value: 15420, suffix: '',  label: t.impact.hours },
        { icon: Building2, value: 58,    suffix: '',  label: t.impact.organizations },
        { icon: Globe,     value: 12,    suffix: '',  label: t.impact.projects },
    ];

    return (
        <section id="impact" className="py-24 bg-[#1a1a1a] border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-black-heading text-5xl lg:text-7xl text-white mb-4">
                        {t.impact.title}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t.impact.subtitle}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="relative group bg-white/5 border border-white/10 hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300 p-8 text-center"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-500/20 text-brand-400 mb-6 group-hover:bg-brand-500/30 transition-colors">
                                <stat.icon className="h-7 w-7" />
                            </div>

                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                            <div className="text-lg font-bold text-white mt-2">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
