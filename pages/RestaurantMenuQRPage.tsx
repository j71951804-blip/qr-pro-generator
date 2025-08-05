// pages/RestaurantMenuQRPage.tsx
import React, { useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { Utensils, Smartphone, Shield, Clock, TrendingUp, CheckCircle, Star, Users } from 'lucide-react';

const RestaurantMenuQRPage: React.FC = () => {
    useEffect(() => {
        // Update page title for SEO
        document.title = 'Free Restaurant Menu QR Code Generator - Contactless Dining | QR Pro Generator';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Create free restaurant menu QR codes for contactless dining. Perfect for cafes, restaurants, bars. Safe, hygienic, and modern dining experience.');
        }
    }, []);

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <Utensils className="w-12 h-12" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Free Restaurant Menu QR Code Generator
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
                            Create contactless dining experiences with digital menu QR codes. Safe, hygienic, and modern - perfect for restaurants, cafes, bars, and food services.
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Shield className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Contactless & Safe</h3>
                                <p className="text-sm text-orange-100">Reduce physical contact and improve hygiene</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Smartphone className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Easy for Customers</h3>
                                <p className="text-sm text-orange-100">Just scan with phone camera</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Increase Orders</h3>
                                <p className="text-sm text-orange-100">Link to online ordering systems</p>
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
                                Create Your Menu QR Code
                            </h2>
                            <p className="text-secondary text-center mb-6">
                                Enter your menu website URL or online ordering link to create a QR code that customers can scan to view your menu safely.
                            </p>
                            <QrCodeGenerator />
                        </div>

                        {/* Implementation Guide */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                How to Implement Menu QR Codes
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-orange-600">1</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Create Digital Menu</h4>
                                    <p className="text-sm text-secondary">Upload your menu online or use a menu platform</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-orange-600">2</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Generate QR Code</h4>
                                    <p className="text-sm text-secondary">Create QR code linking to your digital menu</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-orange-600">3</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Print & Display</h4>
                                    <p className="text-sm text-secondary">Place QR codes on tables, counters, windows</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-orange-600">4</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Customers Scan</h4>
                                    <p className="text-sm text-secondary">Instant access to menu on their phones</p>
                                </div>
                            </div>
                        </div>

                        {/* Use Cases Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Perfect for Every Food Business
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <Utensils className="w-8 h-8 text-red-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Full-Service Restaurants</h4>
                                    <p className="text-sm text-secondary">Table-side menu access, wine lists, daily specials</p>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-lg">
                                    <Clock className="w-8 h-8 text-orange-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Fast Casual & QSR</h4>
                                    <p className="text-sm text-secondary">Quick ordering, drive-thru menus, pickup orders</p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <Users className="w-8 h-8 text-yellow-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Cafes & Coffee Shops</h4>
                                    <p className="text-sm text-secondary">Beverage menus, pastry selections, loyalty programs</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <Star className="w-8 h-8 text-green-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Bars & Nightlife</h4>
                                    <p className="text-sm text-secondary">Cocktail menus, beer lists, happy hour specials</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Food Trucks</h4>
                                    <p className="text-sm text-secondary">Mobile menus, location updates, social media</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <Shield className="w-8 h-8 text-purple-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Hotels & Resorts</h4>
                                    <p className="text-sm text-secondary">Room service, restaurant guides, amenity info</p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Benefits of Digital Menu QR Codes
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-semibold text-dark">For Restaurants</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Cost Savings</p>
                                                <p className="text-sm text-secondary">No printing costs for menu updates</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Real-Time Updates</p>
                                                <p className="text-sm text-secondary">Change prices and items instantly</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Analytics & Insights</p>
                                                <p className="text-sm text-secondary">Track menu views and popular items</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Eco-Friendly</p>
                                                <p className="text-sm text-secondary">Reduce paper waste and printing</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-semibold text-dark">For Customers</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Hygienic & Safe</p>
                                                <p className="text-sm text-secondary">No shared physical menus</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Always Current</p>
                                                <p className="text-sm text-secondary">Never see outdated prices or items</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Easy Access</p>
                                                <p className="text-sm text-secondary">View on personal device at own pace</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-dark">Enhanced Features</p>
                                                <p className="text-sm text-secondary">Photos, reviews, nutritional info</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Best Practices Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Menu QR Code Best Practices
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-dark mb-4">Design Tips</h4>
                                    <ul className="space-y-2 text-secondary">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            <span>Make QR codes at least 2x2 inches for easy scanning</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            <span>Use high contrast colors (dark QR on light background)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            <span>Add clear instructions: "Scan for Menu"</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            <span>Include your restaurant logo for branding</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-dark mb-4">Placement Ideas</h4>
                                    <ul className="space-y-2 text-secondary">
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500 font-bold">•</span>
                                            <span>Table tents and table toppers</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500 font-bold">•</span>
                                            <span>Window decals and entrance displays</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500 font-bold">•</span>
                                            <span>Counter stands and register areas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500 font-bold">•</span>
                                            <span>Social media posts and websites</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* SEO Content Section */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Complete Restaurant Menu QR Code Solution
                                </h2>
                                <div className="prose max-w-none text-secondary leading-relaxed">
                                    <p className="mb-4">
                                        Transform your restaurant's dining experience with our <strong>free restaurant menu QR code generator</strong>. Create contactless digital menus that customers can access instantly by scanning with their smartphone cameras. Perfect for restaurants, cafes, bars, food trucks, and any food service business looking to modernize their operations.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Restaurant QR codes</strong> have become essential for modern dining, offering a safe, hygienic alternative to traditional paper menus. Our generator creates high-quality QR codes that link directly to your digital menu, online ordering system, or restaurant website. Customize with your brand colors and logo to maintain consistent branding across all customer touchpoints.
                                    </p>
                                    <p className="mb-4">
                                        Ideal for <strong>contactless dining experiences</strong>, menu QR codes reduce physical contact while providing customers with up-to-date menu information, prices, and availability. Update your menu in real-time without reprinting costs, showcase high-quality food photos, include detailed ingredient lists and nutritional information, and even integrate with online ordering and payment systems.
                                    </p>
                                    <p>
                                        Whether you're implementing <strong>QR code menus for COVID safety</strong>, reducing operational costs, or simply modernizing your restaurant's technology, our free generator provides everything you need. Download in print-ready PDF format for table tents, PNG for digital displays, or SVG for scalable signage. Join thousands of restaurants already using QR code menus to enhance their customer experience.
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

export default RestaurantMenuQRPage;
