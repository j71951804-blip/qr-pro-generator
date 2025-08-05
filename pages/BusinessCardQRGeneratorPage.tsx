// pages/BusinessCardQRGeneratorPage.tsx
import React, { useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { CreditCard, User, Mail, Phone, Building, Globe, CheckCircle, Star } from 'lucide-react';

const BusinessCardQRGeneratorPage: React.FC = () => {
    useEffect(() => {
        // Update page title for SEO
        document.title = 'Free Business Card QR Code Generator - vCard QR Codes | QR Pro Generator';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Create free vCard QR codes for digital business cards. Share contact info instantly - name, phone, email, company. Professional networking made easy.');
        }
    }, []);

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <CreditCard className="w-12 h-12" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Free Business Card QR Code Generator
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                            Create professional vCard QR codes for digital business cards. Share your contact information instantly with a simple scan - no more lost business cards!
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <User className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Professional Networking</h3>
                                <p className="text-sm text-blue-100">Instant contact sharing at events</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Phone className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Complete Contact Info</h3>
                                <p className="text-sm text-blue-100">Name, phone, email, company, website</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Always Up-to-Date</h3>
                                <p className="text-sm text-blue-100">Update your info anytime</p>
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
                                Create Your vCard QR Code
                            </h2>
                            <p className="text-secondary text-center mb-6">
                                Enter your business card details below to generate a vCard QR code that automatically adds your contact to phones and address books.
                            </p>
                            <QrCodeGenerator />
                        </div>

                        {/* How It Works Section */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                How Business Card QR Codes Work
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">1</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Enter Details</h4>
                                    <p className="text-sm text-secondary">Add your name, phone, email, company info</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">2</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Generate QR</h4>
                                    <p className="text-sm text-secondary">Get your custom vCard QR code instantly</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">3</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Share & Print</h4>
                                    <p className="text-sm text-secondary">Add to business cards, email signatures</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">4</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Instant Contact</h4>
                                    <p className="text-sm text-secondary">Others scan to save your contact</p>
                                </div>
                            </div>
                        </div>

                        {/* Use Cases Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Perfect for Professional Networking
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <Building className="w-8 h-8 text-purple-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Business Cards</h4>
                                    <p className="text-sm text-secondary">Print QR codes on traditional business cards for digital contact sharing</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <Mail className="w-8 h-8 text-blue-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Email Signatures</h4>
                                    <p className="text-sm text-secondary">Add to email signatures for easy contact saving</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <User className="w-8 h-8 text-green-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Conference Badges</h4>
                                    <p className="text-sm text-secondary">Perfect for trade shows and networking events</p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <Globe className="w-8 h-8 text-yellow-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Website Contact</h4>
                                    <p className="text-sm text-secondary">Add to websites and online profiles</p>
                                </div>
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <Phone className="w-8 h-8 text-red-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Sales Materials</h4>
                                    <p className="text-sm text-secondary">Include in brochures and marketing materials</p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <Star className="w-8 h-8 text-indigo-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Social Media</h4>
                                    <p className="text-sm text-secondary">Share on LinkedIn, Instagram stories, etc.</p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Why Use vCard QR Codes?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Eco-Friendly</h4>
                                            <p className="text-secondary">Reduce paper waste with digital business cards</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Always Accurate</h4>
                                            <p className="text-secondary">Update your info without reprinting cards</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Professional Image</h4>
                                            <p className="text-secondary">Stand out with modern, tech-savvy approach</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Instant Contact Saving</h4>
                                            <p className="text-secondary">No manual typing - scan and save to phone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Trackable Engagement</h4>
                                            <p className="text-secondary">See how many people scan your contact QR</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Universal Compatibility</h4>
                                            <p className="text-secondary">Works with all phones and QR code scanners</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Content Section */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Professional vCard QR Code Generator for Modern Networking
                                </h2>
                                <div className="prose max-w-none text-secondary leading-relaxed">
                                    <p className="mb-4">
                                        Transform your networking with our <strong>free business card QR code generator</strong>. Create professional vCard QR codes that instantly share your complete contact information - name, phone number, email address, company details, and website - with a simple smartphone scan.
                                    </p>
                                    <p className="mb-4">
                                        Perfect for <strong>sales professionals, entrepreneurs, consultants, and business owners</strong>, vCard QR codes eliminate the need for manual contact entry and ensure your information is saved accurately every time. Whether you're at trade shows, networking events, client meetings, or conferences, digital business card QR codes make professional networking seamless and efficient.
                                    </p>
                                    <p className="mb-4">
                                        Our <strong>vCard QR generator</strong> supports all standard contact fields including multiple phone numbers, email addresses, physical addresses, job titles, company information, and social media links. Each QR code can be customized with your brand colors and downloaded in high-resolution formats perfect for business cards, email signatures, marketing materials, and online profiles.
                                    </p>
                                    <p>
                                        Unlike traditional paper business cards that can be lost or thrown away, <strong>digital business card QR codes</strong> ensure your contact information is immediately saved to smartphones and address books. This modern approach to professional networking increases contact retention rates and demonstrates your commitment to innovation and sustainability.
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

export default BusinessCardQRGeneratorPage;
