import { Search, UserPlus, Heart } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Browse Opportunities',
        description: 'Explore local volunteer opportunities that match your interests, skills, and schedule.',
        color: 'from-brand-400 to-brand-500',
    },
    {
        icon: UserPlus,
        title: 'Sign Up & Connect',
        description: 'Create your profile and connect with organizations making a difference in your community.',
        color: 'from-amber-400 to-amber-500',
    },
    {
        icon: Heart,
        title: 'Make an Impact',
        description: 'Show up, contribute your time, and experience the joy of giving back to those in need.',
        color: 'from-coral-400 to-coral-500',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
                        Simple Process
                    </span>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Getting started is easy. Follow these three simple steps to begin your volunteering journey.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative group">
                            {/* Connector line (hidden on last item and mobile) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
                            )}

                            <div className="relative bg-white rounded-2xl p-8 text-center card-hover border border-gray-100">
                                {/* Step number */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
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
