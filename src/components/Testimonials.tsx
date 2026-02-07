import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        role: 'Weekend Volunteer',
        organization: 'City Food Bank',
        image: '/photo1.jpg',
        quote: 'Volunteering here has been life-changing. The connections I\'ve made and the smiles I\'ve received make every hour worth it. TinSerV made it so easy to find opportunities that fit my schedule.',
    },
    {
        id: 2,
        name: 'Marcus Johnson',
        role: 'Youth Mentor',
        organization: 'After-School Alliance',
        image: '/photo2.jpg',
        quote: 'Being a mentor through this platform has given me purpose beyond my day job. Seeing kids grow and succeed because of our sessions is incredibly rewarding.',
    },
    {
        id: 3,
        name: 'Emily Chen',
        role: 'Environmental Volunteer',
        organization: 'Green City Initiative',
        image: '/photo3.jpg',
        quote: 'I started with one beach cleanup and now I lead monthly nature restoration projects. TinSerV helped me find my calling and a community of like-minded people.',
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">
                        Volunteer Stories
                    </span>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
                        Hear From Our Community
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Real stories from real volunteers who are making a difference every day.
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-700/50">
                    {/* Quote icon */}
                    <div className="absolute -top-6 left-8 lg:left-12">
                        <div className="bg-gradient-to-br from-brand-400 to-brand-500 p-3 rounded-xl shadow-lg">
                            <Quote className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="lg:flex items-center gap-12">
                        {/* Image */}
                        <div className="flex-shrink-0 mb-8 lg:mb-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-500/20 rounded-2xl blur-xl" />
                                <img
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].name}
                                    className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover mx-auto lg:mx-0"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <blockquote className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-6">
                                "{testimonials[activeIndex].quote}"
                            </blockquote>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="font-heading font-bold text-white text-lg">
                                        {testimonials[activeIndex].name}
                                    </div>
                                    <div className="text-brand-400 font-medium">
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
                                        className="p-2 rounded-full border border-gray-600 text-gray-400 hover:border-brand-500 hover:text-brand-400 transition-colors"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <div className="text-gray-500 text-sm font-medium">
                                        {activeIndex + 1} / {testimonials.length}
                                    </div>
                                    <button
                                        onClick={next}
                                        className="p-2 rounded-full border border-gray-600 text-gray-400 hover:border-brand-500 hover:text-brand-400 transition-colors"
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
                                className={`w-2 h-2 rounded-full transition-all ${index === activeIndex
                                    ? 'bg-brand-500 w-6'
                                    : 'bg-gray-600 hover:bg-gray-500'
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
