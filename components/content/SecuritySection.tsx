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
