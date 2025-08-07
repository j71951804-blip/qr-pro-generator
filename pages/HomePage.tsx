// pages/HomePage.tsx - SEO Optimized Version
import React, { useState, useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { EmailCaptureModal } from '../components/modals/EmailCaptureModal';
import { QRCodeStats } from '../components/content/QRCodeStats';
import { QRCodeBenefits } from '../components/content/QRCodeBenefits';
import { Link, useLocation } from 'react-router-dom';
import { Wifi, CreditCard, Users, Smartphone, Download, Star, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    // Track user engagement for SEO
    const trackEngagement = (action: string, details?: string) => {
        if (typeof window !== 'undefined' && (window as any).trackEngagement) {
            (window as any).trackEngagement(action, details);
        }
    };

    // Handle query parameters for SEO
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const qParam = params.get('q');
        
        // If there are query parameters, clean the URL for SEO
        if (qParam || params.toString()) {
            // Track the search term if present
            if (qParam) {
                trackEngagement('search_query', qParam);
            }
            
            // Clean URL by removing query parameters
            window.history.replaceState({}, '', location.pathname);
        }
    }, [location]);

    // Update meta tags based on current route
    useEffect(() => {
        let title = "Free QR Code Generator - Create WiFi, vCard, Business Card QR Codes | QR Pro Generator";
        let description = "Generate unlimited free QR codes for URLs, WiFi, business cards, restaurants & more. Customize colors, add logos, download PNG/SVG/PDF. No registration required - 1M+ codes created!";
        let canonical = "https://qr-pro-generator.com/";

        // Handle different route variations
        if (location.pathname === '/free-qr-code-generator') {
            title = "Free QR Code Generator - No Registration Required | QR Pro Generator";
            description = "100% free QR code generator with no signup required. Create unlimited QR codes for any purpose. Download instantly in PNG, SVG, PDF formats.";
            canonical = "https://qr-pro-generator.com/free-qr-code-generator";
        } else if (location.pathname === '/qr-code-maker') {
            title = "QR Code Maker - Easy Online QR Generator | QR Pro Generator";
            description = "Easy-to-use QR code maker for creating custom QR codes online. Professional quality, instant download, perfect for business and personal use.";
            canonical = "https://qr-pro-generator.com/qr-code-maker";
        }

        // Update title
        document.title = title;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
        
        // Update canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonical);
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        
        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDesc) ogDesc.setAttribute('content', description);
        if (ogUrl) ogUrl.setAttribute('content', canonical);
        
    }, [location.pathname]);

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* UPDATED: SEO-Optimized Hero Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4">
                        <span className="hero-keywords">Free QR Code Generator</span>
                        <br />
                        <span className="text-3xl md:text-4xl text-secondary font-bold">
                            Create WiFi, vCard & Business Card QR Codes
                        </span>
                    </h1>
                    
                    <p className="text-xl text-secondary max-w-3xl mx-auto mb-4">
                        Generate unlimited <strong>free QR codes</strong> for websites, WiFi networks, business cards, restaurant menus and more. 
                        Customize colors, add logos, download in PNG/SVG/PDF format.
                    </p>
                    
                    {/* NEW: Key Benefits for SEO */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-primary mb-6">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>No Registration Required</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Unlimited QR Codes</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Commercial Use OK</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>High Quality Downloads</span>
                        </div>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-dark">50,000+ Businesses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Download className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-dark">1M+ QR Codes Created</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span className="font-semibold text-dark">4.8/5 Rating</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NEW: Quick Access Links for Popular QR Types */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-center text-dark mb-6">Popular QR Code Types</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <Link 
                            to="/wifi-qr-generator" 
                            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                            onClick={() => trackEngagement('quick_access_click', 'wifi')}
                        >
                            <Wifi className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-dark text-center">WiFi QR Codes</h3>
                            <p className="text-xs text-secondary text-center mt-1">Share WiFi passwords instantly</p>
                        </Link>
                        
                        <Link 
                            to="/business-card-qr-generator" 
                            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                            onClick={() => trackEngagement('quick_access_click', 'vcard')}
                        >
                            <CreditCard className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-dark text-center">Business Cards</h3>
                            <p className="text-xs text-secondary text-center mt-1">Digital vCard contact info</p>
                        </Link>
                        
                        <Link 
                            to="/restaurant-menu-qr" 
                            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                            onClick={() => trackEngagement('quick_access_click', 'menu')}
                        >
                            <Smartphone className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-dark text-center">Restaurant Menus</h3>
                            <p className="text-xs text-secondary text-center mt-1">Contactless dining solutions</p>
                        </Link>
                        
                        <Link 
                            to="/bulk-qr-generator" 
                            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                            onClick={() => trackEngagement('quick_access_click', 'bulk')}
                        >
                            <Download className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-dark text-center">Bulk Generator</h3>
                            <p className="text-xs text-secondary text-center mt-1">Generate hundreds at once</p>
                        </Link>
                    </div>
                </div>

                {/* NEW: Stats Section */}
                <div className="mb-8 flex justify-center">
                    <div className="w-full max-w-md">
                        <QRCodeStats />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="flex-1">
                        {/* Main QR Code Generator */}
                        <div id="main-content">
                            <QrCodeGenerator />
                        </div>
                        
                        {/* NEW: SEO Content Section with Target Keywords */}
                        <div className="mt-12">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-dark mb-6 text-center">
                                    Why Choose Our Free QR Code Generator?
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <QRCodeBenefits />
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-dark">🎯 Complete QR Code Solution</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Multiple QR Code Types</p>
                                                    <p className="text-sm text-secondary">URLs, WiFi, vCard, Email, SMS, Phone, Text</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Custom Design Options</p>
                                                    <p className="text-sm text-secondary">Colors, logos, sizes, error correction levels</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Professional Downloads</p>
                                                    <p className="text-sm text-secondary">PNG, SVG, PDF formats in high resolution</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Bulk Generation</p>
                                                    <p className="text-sm text-secondary">Create hundreds from CSV files</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Mobile Optimized</p>
                                                    <p className="text-sm text-secondary">Works perfectly on all devices</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-dark">Commercial Use</p>
                                                    <p className="text-sm text-secondary">Free for business and personal use</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NEW: Use Cases Section for SEO */}
                        <div className="mt-12">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                                    QR Code Use Cases & Applications
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">🍽️ Restaurants & Cafes</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Digital menus and specials</li>
                                            <li>• WiFi sharing for customers</li>
                                            <li>• Online ordering systems</li>
                                            <li>• Customer feedback forms</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">💼 Business & Marketing</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Digital business cards (vCard)</li>
                                            <li>• Product information & catalogs</li>
                                            <li>• Event registration & check-ins</li>
                                            <li>• Social media promotions</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">🏢 Retail & E-commerce</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Product reviews & testimonials</li>
                                            <li>• Loyalty programs & discounts</li>
                                            <li>• Inventory management</li>
                                            <li>• Customer support links</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">🎓 Education & Training</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Course materials & resources</li>
                                            <li>• Assignment submissions</li>
                                            <li>• Campus WiFi access</li>
                                            <li>• Virtual classroom links</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">🏥 Healthcare & Services</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Patient check-in systems</li>
                                            <li>• Appointment scheduling</li>
                                            <li>• Contact information sharing</li>
                                            <li>• Health forms & surveys</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-primary mb-2">🎉 Events & Entertainment</h3>
                                        <ul className="text-sm text-secondary space-y-1">
                                            <li>• Ticket validation & entry</li>
                                            <li>• Event schedules & maps</li>
                                            <li>• Photo sharing & galleries</li>
                                            <li>• Networking & contact exchange</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NEW: FAQ Section on Homepage for SEO */}
                        <div className="mt-12">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <span className="font-semibold text-dark">Is this QR code generator really free?</span>
                                            <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 text-secondary">
                                            Yes, our QR code generator is completely free with no hidden costs, registration requirements, or limitations. You can create unlimited QR codes and download them in high quality PNG, SVG, and PDF formats.
                                        </div>
                                    </details>
                                    
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <span className="font-semibold text-dark">What types of QR codes can I create?</span>
                                            <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 text-secondary">
                                            You can create QR codes for URLs/websites, WiFi networks, business cards (vCard), email addresses, SMS messages, phone numbers, and plain text. Each type is optimized for its specific use case.
                                        </div>
                                    </details>
                                    
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <span className="font-semibold text-dark">Can I customize the QR code design?</span>
                                            <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 text-secondary">
                                            Absolutely! You can customize colors, adjust sizes, add your logo, and choose error correction levels. All customization features are free and help you create QR codes that match your brand.
                                        </div>
                                    </details>
                                    
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <span className="font-semibold text-dark">Do the QR codes expire?</span>
                                            <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 text-secondary">
                                            No, our QR codes never expire! They are static QR codes that will work forever as long as the content they link to (e.g., the URL) is active. Perfect for printed materials and long-term use.
                                        </div>
                                    </details>
                                    
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <span className="font-semibold text-dark">Can I use these QR codes for commercial purposes?</span>
                                            <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 text-secondary">
                                            Yes! All QR codes generated with our tool are free for both personal and commercial use. You can use them on business cards, marketing materials, products, and any commercial applications.
                                        </div>
                                    </details>
                                </div>
                                
                                <div className="mt-6 text-center">
                                    <Link 
                                        to="/faq" 
                                        className="inline-flex items-center text-primary hover:text-blue-700 font-semibold"
                                        onClick={() => trackEngagement('faq_more_click')}
                                    >
                                        View All FAQs →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* SEO Content Section with Target Keywords */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Complete QR Code Generator Solution for Your Business
                                </h2>
                                <div className="prose max-w-none text-secondary leading-relaxed">
                                    <p className="mb-4">
                                        Our <strong>free QR code generator</strong> provides everything you need to create professional QR codes for your business, marketing campaigns, and personal use. Whether you're a restaurant owner looking to create <strong>digital menu QR codes</strong>, a retailer wanting to bridge online and offline experiences, or an event organizer streamlining check-ins, our comprehensive QR code maker has you covered.
                                    </p>
                                    <p className="mb-4">
                                        Generate <strong>WiFi QR codes</strong> to share network credentials instantly, create <strong>vCard QR codes</strong> for digital business cards, or build <strong>custom QR codes</strong> for websites, email addresses, phone numbers, SMS messages, and plain text. Each QR code can be customized with your brand colors, logos, and downloaded in multiple formats including PNG for web use, SVG for scalable graphics, and PDF for professional printing.
                                    </p>
                                    <p className="mb-4">
                                        With support for <strong>bulk QR code generation</strong> from CSV files, you can create hundreds of QR codes at once - perfect for inventory management, event tickets, or marketing campaigns. Our <strong>QR code generator with logo</strong> functionality allows you to maintain brand consistency across all your marketing materials.
                                    </p>
                                    <p>
                                        All QR codes are generated instantly in your browser with no data sent to external servers, ensuring your privacy and security. Unlike other QR code generators that charge monthly fees or limit functionality, our tool is completely free for both personal and commercial use, making it the perfect choice for <strong>small businesses</strong>, restaurants, retailers, and enterprises alike.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* NEW: Related Tools Section */}
                        <div className="mt-12">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                                    Popular QR Code Generators
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Link 
                                        to="/wifi-qr-generator" 
                                        className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                                        onClick={() => trackEngagement('related_tool_click', 'wifi')}
                                    >
                                        <Wifi className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-dark">WiFi QR Generator</h3>
                                        <p className="text-sm text-secondary mt-1">Share WiFi passwords securely</p>
                                    </Link>
                                    
                                    <Link 
                                        to="/business-card-qr-generator" 
                                        className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                                        onClick={() => trackEngagement('related_tool_click', 'vcard')}
                                    >
                                        <CreditCard className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-dark">vCard QR Generator</h3>
                                        <p className="text-sm text-secondary mt-1">Digital business cards</p>
                                    </Link>
                                    
                                    <Link 
                                        to="/bulk-qr-generator" 
                                        className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                                        onClick={() => trackEngagement('related_tool_click', 'bulk')}
                                    >
                                        <Download className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-dark">Bulk QR Generator</h3>
                                        <p className="text-sm text-secondary mt-1">Generate hundreds at once</p>
                                    </Link>
                                    
                                    <Link 
                                        to="/restaurant-menu-qr" 
                                        className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                                        onClick={() => trackEngagement('related_tool_click', 'menu')}
                                    >
                                        <Smartphone className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-dark">Menu QR Generator</h3>
                                        <p className="text-sm text-secondary mt-1">Contactless dining solutions</p>
                                    </Link>
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
