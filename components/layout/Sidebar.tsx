import React from 'react';
import { AFFILIATE_TOOLS } from '../../constants';
import { QRCodeTips, UseCases, Newsletter, SecuritySection } from '../content/QRCodeTips';

export const Sidebar: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-dark mb-4">Upgrade to Pro</h3>
                <ul className="space-y-3 text-sm text-secondary mb-4">
                    <li className="flex items-center">✅ Dynamic QR Codes</li>
                    <li className="flex items-center">✅ Advanced Analytics</li>
                    <li className="flex items-center">✅ Bulk Generation</li>
                    <li className="flex items-center">✅ Team Collaboration</li>
                    <li className="flex items-center">✅ Custom Branding</li>
                    <li className="flex items-center">✅ API Access</li>
                </ul>
                <button className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                    Learn More
                </button>
            </div>
            
            {/* Replace AdPlaceholder with valuable content */}
            <QRCodeTips />
            
            <UseCases />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-dark mb-4">Recommended Tools</h3>
                <div className="space-y-4">
                    {AFFILIATE_TOOLS.map(tool => (
                        <a href={tool.link} key={tool.name} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                            <img src={tool.logoUrl} alt={`${tool.name} logo`} className="w-10 h-10 rounded-md" />
                            <div>
                                <p className="font-semibold text-dark group-hover:text-primary transition-colors">{tool.name}</p>
                                <p className="text-sm text-secondary">{tool.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <Newsletter />

            <SecuritySection />
        </div>
    );
};
