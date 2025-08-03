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
