import React, { useState, useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { EmailCaptureModal } from '../components/modals/EmailCaptureModal';
import { QRCodeStats } from '../components/content/QRCodeStats';
import { QRCodeBenefits } from '../components/content/QRCodeBenefits';

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 15000); // Open modal after 15 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-2">Free QR Code Generator</h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">Create, customize, and download high-quality QR codes in seconds. Perfect for business cards, marketing, and more.</p>
                     <div className="mt-6">
                        <p className="text-md text-dark font-semibold">Join 50,000+ businesses and create your QR code now!</p>
                        <p className="text-sm text-secondary mt-1">Over 1 Million QR codes generated</p>
                    </div>
                </div>

                {/* Replace header ad with valuable content */}
                <div className="mb-8 flex justify-center">
                    <div className="w-full max-w-md">
                        <QRCodeStats />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="flex-1">
                        <QrCodeGenerator />
                        
                        {/* Add additional valuable content below generator */}
                        <div className="mt-12">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                                    Why Choose Our QR Code Generator?
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <QRCodeBenefits />
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-dark">🎯 Key Features</h3>
                                        <ul className="space-y-2 text-secondary">
                                            <li>• Multiple QR code types (URL, WiFi, vCard, etc.)</li>
                                            <li>• Customizable colors and sizes</li>
                                            <li>• High-quality downloads (PNG, SVG, PDF)</li>
                                            <li>• Bulk generation from CSV files</li>
                                            <li>• No registration required</li>
                                            <li>• Commercial use allowed</li>
                                            <li>• Mobile-optimized interface</li>
                                            <li>• Instant generation and preview</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Content Section */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Complete QR Code Solution for Your Business
                                </h2>
                                <div className="prose max-w-none text-secondary">
                                    <p className="mb-4">
                                        Our free QR code generator provides everything you need to create professional QR codes for your business, marketing campaigns, and personal use. Whether you're a restaurant owner looking to create digital menus, a retailer wanting to bridge online and offline experiences, or an event organizer streamlining check-ins, our tool has you covered.
                                    </p>
                                    <p className="mb-4">
                                        Generate QR codes for websites, WiFi networks, contact information (vCards), email addresses, phone numbers, SMS messages, and plain text. Each QR code can be customized with your brand colors and downloaded in multiple formats including PNG for web use, SVG for scalable graphics, and PDF for professional printing.
                                    </p>
                                    <p>
                                        With support for bulk generation from CSV files, you can create hundreds of QR codes at once - perfect for inventory management, event tickets, or marketing campaigns. All QR codes are generated instantly in your browser with no data sent to external servers, ensuring your privacy and security.
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
            <EmailCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default HomePage;
