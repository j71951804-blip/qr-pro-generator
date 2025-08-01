import React, { useState, useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { EmailCaptureModal } from '../components/modals/EmailCaptureModal';

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

                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="flex-1">
                        <QrCodeGenerator />
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