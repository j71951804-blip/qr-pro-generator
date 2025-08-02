import React from 'react';
import { AFFILIATE_TOOLS } from '../../constants';
import { QRCodeTips } from '../content/QRCodeTips';
import { UseCases } from '../content/Usecases';
import { Newsletter } from '../content/Newsletter';
import { SecuritySection } from '../content/SecuritySection';
import { QRCodeStats } from '../content/QRCodeStats';

export const Sidebar: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Pro Upgrade Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-dark mb-4">🚀 Upgrade to Pro</h3>
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
            
            {/* QR Code Tips */}
            <QRCodeTips />
            
            {/* Use Cases */}
            <UseCases />

            {/* Platform Stats */}
            <QRCodeStats />

            {/* Recommended Tools */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-dark mb-4">📦 Recommended Tools</h3>
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

            {/* Newsletter Signup */}
            <Newsletter />

            {/* Security Tips */}
            <SecuritySection />

            {/* Additional Value Section */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-dark mb-4">💡 QR Code Success Tips</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">1.</span>
                        <div>
                            <p className="font-semibold text-dark">Test Before Printing</p>
                            <p className="text-secondary">Always test QR codes on multiple devices</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-blue-500 font-bold">2.</span>
                        <div>
                            <p className="font-semibold text-dark">Size Matters</p>
                            <p className="text-secondary">Minimum 2x2 cm for print materials</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-purple-500 font-bold">3.</span>
                        <div>
                            <p className="font-semibold text-dark">Clear Call-to-Action</p>
                            <p className="text-secondary">Tell users what they'll get when scanning</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
