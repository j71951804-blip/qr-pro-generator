// Create this file as: pages/WiFiQRGeneratorPage.tsx
import React, { useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { Wifi, Shield, Smartphone, CheckCircle } from 'lucide-react';

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
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Instant Connection</h3>
                                <p className="text-sm text-blue-100">One scan connects automatically</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="flex-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-dark mb-4 text-center">
                                Create Your WiFi QR Code
                            </h2>
                            <p className="text-secondary text-center mb-6">
                                Enter your WiFi network details below to generate a QR code that automatically connects devices to your network.
                            </p>
                            <QrCodeGenerator />
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
