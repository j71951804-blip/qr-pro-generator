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
