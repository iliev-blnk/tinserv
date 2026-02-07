import { useEffect, useState, useRef } from 'react';
import { Users, Clock, Building2, Globe } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: 2547,
        suffix: '+',
        label: 'Active Volunteers',
        description: 'Dedicated individuals making a difference',
    },
    {
        icon: Clock,
        value: 15420,
        suffix: '',
        label: 'Hours Donated',
        description: 'Time invested in community service',
    },
    {
        icon: Building2,
        value: 58,
        suffix: '',
        label: 'Partner Organizations',
        description: 'Non-profits in our network',
    },
    {
        icon: Globe,
        value: 12,
        suffix: '',
        label: 'Communities Served',
        description: 'Local areas positively impacted',
    },
];

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
        <div ref={ref} className="font-heading text-4xl lg:text-5xl font-bold text-gray-900">
            {count.toLocaleString()}{suffix}
        </div>
    );
}

export default function Stats() {
    return (
        <section id="impact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        Our Impact
                    </span>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Together We're Stronger
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Every volunteer hour creates ripples of positive change. See the impact our community has made.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="relative group bg-white rounded-2xl p-8 text-center border border-gray-100 card-hover"
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-50 text-brand-600 mb-6 group-hover:bg-brand-100 transition-colors">
                                <stat.icon className="h-7 w-7" />
                            </div>

                            {/* Value */}
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                            {/* Label */}
                            <div className="text-lg font-semibold text-gray-900 mt-2 mb-1">
                                {stat.label}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
