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
        <section className="py-24 bg-brand-500">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 border-2 border-white/40 px-4 py-1.5 mb-6">
                    <Sparkles className="h-4 w-4 text-white" />
                    <span className="text-white font-black text-xs uppercase tracking-widest">Start making a difference today</span>
                </div>

                <h2 className="font-black-heading text-5xl lg:text-8xl text-white mb-6">
                    Ready to Change Lives?
                </h2>
                <p className="text-white/80 text-xl max-w-xl mx-auto mb-8">
                    Join thousands of volunteers who are creating positive change in their communities.
                    Sign up for updates and be the first to know about new opportunities.
                </p>

                {/* Form */}
                {isSubmitted ? (
                    <div className="inline-flex items-center gap-3 bg-white/20 text-white px-6 py-4 border border-white/40">
                        <div className="bg-white p-1">
                            <Check className="h-4 w-4 text-brand-500" />
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
                            className="flex-1 px-5 py-4 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/40 border-0"
                        />
                        <button
                            type="submit"
                            className="btn-dark px-8 py-4 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Get Started
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </form>
                )}

                <p className="text-white/60 text-sm mt-6">
                    ✓ No spam, ever · ✓ Unsubscribe anytime · ✓ Weekly updates
                </p>
            </div>
        </section>
    );
}
