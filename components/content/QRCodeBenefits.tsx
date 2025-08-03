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
