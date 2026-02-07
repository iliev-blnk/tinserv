import { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export default function CallToAction() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-100 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    {/* Content */}
                    <div className="relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                            <Sparkles className="h-4 w-4 text-amber-400" />
                            <span className="text-white/90 text-sm font-medium">Start making a difference today</span>
                        </div>

                        <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white mb-4">
                            Ready to Change Lives?
                        </h2>
                        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                            Join thousands of volunteers who are creating positive change in their communities.
                            Sign up for updates and be the first to know about new opportunities.
                        </p>

                        {/* Form */}
                        {isSubmitted ? (
                            <div className="inline-flex items-center gap-3 bg-brand-500/20 text-brand-300 px-6 py-4 rounded-xl">
                                <div className="bg-brand-500 p-1 rounded-full">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium">Thanks! We'll be in touch soon.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                                />
                                <button
                                    type="submit"
                                    className="btn-primary text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    Get Started
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </form>
                        )}

                        {/* Trust indicators */}
                        <p className="text-gray-500 text-sm mt-6">
                            ✓ No spam, ever · ✓ Unsubscribe anytime · ✓ Weekly updates
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
