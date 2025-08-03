import React from 'react';
import { Lightbulb, Zap, Shield, Smartphone } from 'lucide-react';

export const QRCodeTips: React.FC = () => {
    const tips = [
        {
            icon: Lightbulb,
            title: "Design for Scanning",
            description: "Ensure high contrast and adequate size for easy scanning"
        },
        {
            icon: Zap,
            title: "Test Before Publishing",
            description: "Always test your QR codes on multiple devices and apps"
        },
        {
            icon: Shield,
            title: "Use HTTPS URLs",
            description: "Secure URLs build trust and work better with modern devices"
        },
        {
            icon: Smartphone,
            title: "Consider Context",
            description: "Place QR codes where people can easily scan them"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">
                💡 Pro QR Code Tips
            </h3>
            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <tip.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-dark text-sm">{tip.title}</h4>
                            <p className="text-secondary text-xs mt-1">{tip.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// components/content/UseCases.tsx
import React from 'react';

export const UseCases: React.FC = () => {
    const useCases = [
        { industry: "Restaurants", use: "Digital menus & reviews" },
        { industry: "Retail", use: "Product info & promotions" },
        { industry: "Events", use: "Check-ins & schedules" },
        { industry: "Education", use: "Learning resources" },
        { industry: "Real Estate", use: "Property listings" },
        { industry: "Healthcare", use: "Patient information" }
    ];

    return (
        <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">
                🚀 Popular Use Cases
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {useCases.map((useCase, index) => (
                    <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <h4 className="font-semibold text-primary text-sm">{useCase.industry}</h4>
                        <p className="text-secondary text-xs mt-1">{useCase.use}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// components/content/QRCodeBenefits.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

export const QRCodeBenefits: React.FC = () => {
    const benefits = [
        "Bridge physical and digital worlds",
        "Track engagement and analytics",
        "Contactless information sharing",
        "Easy updates without reprinting",
        "Cost-effective marketing tool",
        "Instant access to information"
    ];

    return (
        <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">
                ✨ Why Use QR Codes?
            </h3>
            <div className="space-y-2">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-secondary text-sm">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// components/content/Newsletter.tsx
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

// components/content/QRCodeStats.tsx
import React from 'react';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

export const QRCodeStats: React.FC = () => {
    const stats = [
        { icon: Users, value: "50,000+", label: "Happy Users" },
        { icon: Globe, value: "1M+", label: "QR Codes Created" },
        { icon: TrendingUp, value: "99.9%", label: "Uptime" },
        { icon: Zap, value: "<1sec", label: "Generation Speed" }
    ];

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
            <h3 className="text-lg font-bold text-center mb-4">📊 Platform Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <stat.icon className="w-6 h-6 mx-auto mb-1 opacity-80" />
                        <div className="font-bold text-lg">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// components/content/SecuritySection.tsx
import React from 'react';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

export const SecuritySection: React.FC = () => {
    const securityTips = [
        {
            icon: Shield,
            title: "Verify QR Sources",
            description: "Only scan QR codes from trusted sources"
        },
        {
            icon: Lock,
            title: "Check URLs",
            description: "Preview destination URLs before visiting"
        },
        {
            icon: Eye,
            title: "Inspect Before Scanning",
            description: "Look for signs of tampering or overlays"
        },
        {
            icon: AlertTriangle,
            title: "Be Cautious",
            description: "Don't download apps from QR codes in public"
        }
    ];

    return (
        <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-dark mb-4 text-center">
                🔐 QR Code Security
            </h3>
            <div className="space-y-4">
                {securityTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <tip.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-dark text-sm">{tip.title}</h4>
                            <p className="text-secondary text-xs mt-1">{tip.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
