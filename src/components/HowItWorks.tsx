import { Heart, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const stepIcons = [Heart, Users, Sparkles];

export default function HowItWorks() {
    const { t } = useLanguage();

    const steps = [
        {
            icon: stepIcons[0],
            title: t.howItWorks.step1.title,
            description: t.howItWorks.step1.description,
        },
        {
            icon: stepIcons[1],
            title: t.howItWorks.step2.title,
            description: t.howItWorks.step2.description,
        },
        {
            icon: stepIcons[2],
            title: t.howItWorks.step3.title,
            description: t.howItWorks.step3.description,
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-[#020617] border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-black-heading text-4xl sm:text-5xl lg:text-7xl frost-text mb-4">
                        {t.howItWorks.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {t.howItWorks.subtitle}
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-10 lg:gap-12 items-stretch">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative group flex flex-col">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-ice-500/30" />
                            )}

                            <div className="relative bg-white/[0.03] border border-white/10 hover:border-ice-500 p-6 sm:p-8 text-center transition-colors duration-300 h-full">
                                {/* Step number */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-ice-500 text-white flex items-center justify-center text-base font-black">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-ice-500 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <step.icon className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="font-heading text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
