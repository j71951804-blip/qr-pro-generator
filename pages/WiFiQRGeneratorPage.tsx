// pages/WiFiQRGeneratorPage.tsx
import React, { useState, useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { Link } from 'react-router-dom';
import { Wifi, Shield, Smartphone, Download, CheckCircle, Star, ArrowRight } from 'lucide-react';

const WiFiQRGeneratorPage: React.FC = () => {
    useEffect(() => {
        // Update page title for SEO
        document.title = 'Free WiFi QR Code Generator - Share WiFi Passwords Instantly | QR Pro Generator';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Create free WiFi QR codes to share network passwords instantly. Secure, easy setup for restaurants, offices, homes. No app required - works on all devices.');
        }
    }, []);

    const [activeTab, setActiveTab] = useState<'generator' | 'guide' | 'examples'>('generator');

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <Wifi className="w-12 h-12" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Free WiFi QR Code Generator
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                            Create secure WiFi QR codes instantly. Let customers, guests, and visitors connect to your network with a simple scan - no passwords to type!
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Shield className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Secure & Safe</h3>
                                <p className="text-sm text-blue-100">Password encryption built-in</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Smartphone className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Works on All Devices</h3>
                                <p className="text-sm text-blue-100">iOS, Android, no app required</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Download className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">High Quality Downloads</h3>
                                <p className="text-sm text-blue-100">PNG, SVG, PDF formats</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button 
                                onClick={() => setActiveTab('generator')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Create WiFi QR Code
                            </button>
                            <button 
                                onClick={() => setActiveTab('guide')}
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                How It Works
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-md">
                        <button
                            onClick={() => setActiveTab('generator')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'generator' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'
                            }`}
                        >
                            Generator
                        </button>
                        <button
                            onClick={() => setActiveTab('guide')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'guide' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'
                            }`}
                        >
                            Setup Guide
                        </button>
                        <button
                            onClick={() => setActiveTab('examples')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                activeTab === 'examples' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'
                            }`}
                        >
                            Examples
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="flex-1">
                        {activeTab === 'generator' && (
                            <div>
                                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                    <h2 className="text-2xl font-bold text-dark mb-4 text-center">
                                        Create Your WiFi QR Code
                                    </h2>
                                    <p className="text-secondary text-center mb-6">
                                        Enter your WiFi network details below to generate a QR code that automatically connects devices to your network.
                                    </p>
                                    <QrCodeGenerator defaultType="wifi" />
                                </div>

                                {/* Benefits Section */}
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                                    <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                        Why Use WiFi QR Codes?
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Instant Connection</h4>
                                                    <p className="text-secondary">Guests connect in seconds without typing complex passwords</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Enhanced Security</h4>
                                                    <p className="text-secondary">No need to share passwords verbally or write them down</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Professional Image</h4>
                                                    <p className="text-secondary">Modern, tech-savvy approach impresses customers</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Universal Compatibility</h4>
                                                    <p className="text-secondary">Works on iPhone, Android, and all QR code scanners</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Cost Effective</h4>
                                                    <p className="text-secondary">Reduce support requests about WiFi passwords</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-dark">Easy Updates</h4>
                                                    <p className="text-secondary">Generate new codes when you change passwords</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'guide' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Complete WiFi QR Code Setup Guide
                                </h2>
                                
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark mb-2">Find Your WiFi Information</h3>
                                            <p className="text-secondary mb-3">
                                                You'll need your network name (SSID) and password. Check your router label, WiFi settings, or ask your IT administrator.
                                            </p>
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <strong>Tip:</strong> On Windows, type "netsh wlan show profile [network name] key=clear" in Command Prompt to see saved passwords.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark mb-2">Choose Security Type</h3>
                                            <p className="text-secondary mb-3">
                                                Most modern networks use WPA/WPA2 security. Legacy networks might use WEP, and guest networks might have no password.
                                            </p>
                                            <ul className="text-sm text-secondary space-y-1">
                                                <li>• <strong>WPA/WPA2:</strong> Most secure and common (recommended)</li>
                                                <li>• <strong>WEP:</strong> Older, less secure protocol</li>
                                                <li>• <strong>No Password:</strong> Open networks (not recommended for sensitive use)</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark mb-2">Generate Your QR Code</h3>
                                            <p className="text-secondary mb-3">
                                                Enter your network details in our generator above. Customize the design with your colors and logo if desired.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark mb-2">Download & Display</h3>
                                            <p className="text-secondary mb-3">
                                                Download in your preferred format and display where customers can easily scan:
                                            </p>
                                            <ul className="text-sm text-secondary space-y-1">
                                                <li>• Table tents and stands</li>
                                                <li>• Wall posters and signs</li>
                                                <li>• Business cards and flyers</li>
                                                <li>• Digital displays and screens</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-dark mb-2">Test & Optimize</h3>
                                            <p className="text-secondary mb-3">
                                                Test the QR code with different devices to ensure it works properly. Consider these optimization tips:
                                            </p>
                                            <ul className="text-sm text-secondary space-y-1">
                                                <li>• Minimum size: 2cm x 2cm for printed materials</li>
                                                <li>• High contrast colors for better scanning</li>
                                                <li>• Add instructions like "Scan to connect to WiFi"</li>
                                                <li>• Place at eye level for easy access</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Best Practices */}
                                <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                    <h3 className="text-lg font-semibold text-amber-800 mb-3">🔒 Security Best Practices</h3>
                                    <ul className="text-sm text-amber-700 space-y-2">
                                        <li>• Use strong, unique passwords for your WiFi network</li>
                                        <li>• Consider creating a separate guest network for visitors</li>
                                        <li>• Regularly update your router's firmware</li>
                                        <li>• Monitor connected devices periodically</li>
                                        <li>• Change WiFi passwords if they're compromised</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'examples' && (
                            <div>
                                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                    <h2 className="text-2xl font-bold text-dark mb-6">
                                        WiFi QR Code Examples & Use Cases
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🍽️</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Restaurants & Cafes</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Place WiFi QR codes on tables, menus, or receipts for instant customer connectivity.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Table tent cards</li>
                                                <li>• Menu inserts</li>
                                                <li>• Receipt bottoms</li>
                                                <li>• Wall displays</li>
                                            </ul>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🏨</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Hotels & Hospitality</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Simplify guest check-in with WiFi QR codes in rooms and common areas.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Room key cards</li>
                                                <li>• Lobby displays</li>
                                                <li>• Welcome packets</li>
                                                <li>• Conference rooms</li>
                                            </ul>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🏢</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Offices & Coworking</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Provide easy guest network access without compromising security.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Reception desks</li>
                                                <li>• Meeting rooms</li>
                                                <li>• Visitor badges</li>
                                                <li>• Common areas</li>
                                            </ul>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🛍️</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Retail Stores</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Enhance customer experience with free WiFi for browsing and comparing products.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Point of sale displays</li>
                                                <li>• Shopping bags</li>
                                                <li>• Fitting rooms</li>
                                                <li>• Store windows</li>
                                            </ul>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-red-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🏥</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Healthcare Facilities</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Keep patients and families connected during visits and appointments.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Waiting rooms</li>
                                                <li>• Patient rooms</li>
                                                <li>• Registration desks</li>
                                                <li>• Family lounges</li>
                                            </ul>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                                                <span className="text-2xl">🎓</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-dark mb-2">Educational Institutions</h3>
                                            <p className="text-secondary text-sm mb-3">
                                                Provide guest access for visitors, parents, and temporary users.
                                            </p>
                                            <ul className="text-xs text-secondary space-y-1">
                                                <li>• Visitor centers</li>
                                                <li>• Event venues</li>
                                                <li>• Libraries</li>
                                                <li>• Conference halls</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Design Tips */}
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <h3 className="text-2xl font-bold text-dark mb-6">Design Tips for WiFi QR Codes</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-semibold text-dark mb-4">Visual Design</h4>
                                            <ul className="space-y-3 text-secondary">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Use high contrast colors (dark QR on light background)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Include clear instructions like "Scan to Connect to WiFi"</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Add your logo for branding (but keep it small)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Show the network name for user confidence</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-lg font-semibold text-dark mb-4">Placement & Size</h4>
                                            <ul className="space-y-3 text-secondary">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Minimum 2cm x 2cm for reliable scanning</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Place at eye level or on frequently touched surfaces</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Ensure good lighting for camera scanning</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>Protected from weather if placed outdoors</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="mt-12 bg-gradient-to-r from-primary to-blue-700 text-white rounded-xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">Ready to Create Your WiFi QR Code?</h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Join thousands of businesses already using WiFi QR codes to enhance their customer experience. 
                                It's completely free and takes less than 2 minutes.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button 
                                    onClick={() => setActiveTab('generator')}
                                    className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                    Create WiFi QR Code
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <Link 
                                    to="/blog/wifi-qr-code-setup-guide"
                                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                                >
                                    Read Full Guide
                                </Link>
                            </div>
                        </div>

                        {/* SEO Content Section */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Complete WiFi QR Code Solution
                                </h2>
                                <div className="prose max-w-none text-secondary leading-relaxed">
                                    <p className="mb-4">
                                        Our <strong>free WiFi QR code generator</strong> makes it incredibly easy to share your wireless network credentials with customers, guests, and visitors. Unlike traditional methods that require manually typing complex passwords, WiFi QR codes allow instant connection with a simple scan from any smartphone camera.
                                    </p>
                                    <p className="mb-4">
                                        Perfect for <strong>restaurants, cafes, hotels, offices, retail stores, and healthcare facilities</strong>, WiFi QR codes enhance customer experience while maintaining network security. Our generator supports all security types including WPA/WPA2, WEP, and open networks, ensuring compatibility with any WiFi setup.
                                    </p>
                                    <p className="mb-4">
                                        Create professional-looking WiFi QR codes with custom colors, logos, and designs that match your brand identity. Download in high-resolution PNG, scalable SVG, or print-ready PDF formats. All codes are generated locally in your browser for maximum security and privacy.
                                    </p>
                                    <p>
                                        Whether you're running a <strong>coffee shop that wants to provide seamless internet access</strong>, a hotel looking to simplify guest connectivity, or an office needing secure visitor network access, our WiFi QR code generator provides a professional, modern solution that customers expect in today's digital world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                    
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <Sidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default WiFiQRGeneratorPage;
