import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useLanguage();

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Mitchell',
            role: 'Weekend Volunteer',
            organization: 'City Food Bank',
            image: '/photo1.jpg',
            quote: t.testimonials.quote1,
        },
        {
            id: 2,
            name: 'Marcus Johnson',
            role: 'Youth Mentor',
            organization: 'After-School Alliance',
            image: '/photo2.jpg',
            quote: t.testimonials.quote2,
        },
        {
            id: 3,
            name: 'Emily Chen',
            role: 'Environmental Volunteer',
            organization: 'Green City Initiative',
            image: '/photo3.jpg',
            quote: t.testimonials.quote3,
        },
    ];

    const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-500 font-black text-xs uppercase tracking-[0.2em] mb-3">
                        {t.testimonials.title}
                    </span>
                    <h2 className="font-black-heading text-4xl sm:text-5xl lg:text-7xl text-gray-900 mb-4">
                        Hear From Our Community
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {t.testimonials.subtitle}
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="relative bg-gray-50 border-l-8 border-brand-500 pt-12 pb-8 px-6 sm:p-8 lg:p-12 shadow-[4px_4px_0_0_#f97316] sm:shadow-[8px_8px_0_0_#f97316]">
                    {/* Quote icon */}
                    <div className="absolute -top-6 left-8 lg:left-12">
                        <div className="bg-brand-500 p-3 shadow-lg">
                            <Quote className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="lg:flex items-center gap-12">
                        {/* Image */}
                        <div className="flex-shrink-0 mb-8 lg:mb-0">
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="w-24 h-24 lg:w-32 lg:h-32 object-cover mx-auto lg:mx-0"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <blockquote className="text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
                                "{testimonials[activeIndex].quote}"
                            </blockquote>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="font-heading font-bold text-gray-900 text-lg">
                                        {testimonials[activeIndex].name}
                                    </div>
                                    <div className="text-brand-500 font-medium">
                                        {testimonials[activeIndex].role}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {testimonials[activeIndex].organization}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={prev}
                                        className="p-2 border-2 border-gray-300 text-gray-500 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <div className="text-gray-500 text-sm font-medium">
                                        {activeIndex + 1} / {testimonials.length}
                                    </div>
                                    <button
                                        onClick={next}
                                        className="p-2 border-2 border-gray-300 text-gray-500 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-2 rounded-full transition-all ${index === activeIndex
                                    ? 'bg-brand-500 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
