import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE"; // TODO: Replace with your Google Script Web App URL

export default function Registration() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
            alert("Please configure the Google Script URL in src/pages/Registration.tsx");
            setIsSubmitting(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('message', formData.message);

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Important for Google Apps Script to work without complex CORS headers
            });

            // Since mode is 'no-cors', we can't read the response, so we assume success if no network error thrown
            setIsSubmitted(true);
        } catch (err) {
            console.error("Submission error:", err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 py-12 relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>{t.registration.back}</span>
                </Link>

                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                                    {t.registration.title}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {t.registration.subtitle}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 ml-1">
                                        {t.registration.fields.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                                        placeholder="Ion Popescu"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 ml-1">
                                            {t.registration.fields.email}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                                            placeholder="ion@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 ml-1">
                                            {t.registration.fields.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                                            placeholder="+373 60 123 456"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 ml-1">
                                        {t.registration.fields.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none resize-none"
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white font-bold text-lg shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed hover:transform-none' : ''}`}
                                >
                                    <span>{isSubmitting ? 'Se trimite...' : t.registration.fields.submit}</span>
                                    {!isSubmitting && <Send className="w-5 h-5" />}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {t.registration.success}
                            </h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Te vom contacta în curând cu mai multe detalii.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-all border border-gray-700"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>{t.registration.back}</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
