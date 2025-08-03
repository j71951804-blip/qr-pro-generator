import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
    };

    if (subscribed) {
        return (
            <div className="bg-green-50 p-6 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-green-700">Thanks for subscribing!</h3>
                <p className="text-green-600 text-sm">We'll send you QR code tips and updates.</p>
            </div>
        );
    }

    return (
        <div className="bg-orange-50 p-6 rounded-lg">
            <div className="text-center mb-4">
                <Mail className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-dark">Stay Updated</h3>
                <p className="text-secondary text-sm">Get QR code marketing tips & new features</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                    <Send className="w-4 h-4" />
                    <span>Subscribe Free</span>
                </button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-2">No spam, unsubscribe anytime</p>
        </div>
    );
};
