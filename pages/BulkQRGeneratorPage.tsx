// pages/BulkQRGeneratorPage.tsx
import React, { useEffect } from 'react';
import { QrCodeGenerator } from '../components/qrcode/QrCodeGenerator';
import { Sidebar } from '../components/layout/Sidebar';
import { Download, FileSpreadsheet, Zap, Building, Package, Users, CheckCircle, Clock } from 'lucide-react';

const BulkQRGeneratorPage: React.FC = () => {
    useEffect(() => {
        // Update page title for SEO
        document.title = 'Free Bulk QR Code Generator - Generate Hundreds from CSV | QR Pro Generator';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Generate hundreds of QR codes at once from CSV files. Perfect for inventory, events, marketing campaigns. Free bulk QR code generator for businesses.');
        }
    }, []);

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <Download className="w-12 h-12" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Free Bulk QR Code Generator
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed">
                            Generate hundreds of QR codes at once from CSV files. Perfect for inventory management, event tickets, product catalogs, and large-scale marketing campaigns.
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Zap className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                                <p className="text-sm text-indigo-100">Generate 1000+ QR codes in minutes</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">CSV Upload</h3>
                                <p className="text-sm text-indigo-100">Simple Excel/CSV file format</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <Package className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Organized Output</h3>
                                <p className="text-sm text-indigo-100">Download as organized ZIP file</p>
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
                                Bulk QR Code Generator
                            </h2>
                            <p className="text-secondary text-center mb-6">
                                Upload a CSV file with your data to generate multiple QR codes at once. Great for inventory, events, marketing campaigns, and more.
                            </p>
                            <QrCodeGenerator />
                        </div>

                        {/* How It Works Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                How Bulk QR Generation Works
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-indigo-600">1</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Prepare CSV File</h4>
                                    <p className="text-sm text-secondary">Create spreadsheet with filename and value columns</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-indigo-600">2</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Upload & Generate</h4>
                                    <p className="text-sm text-secondary">Upload your CSV and we'll generate all QR codes</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-indigo-600">3</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Download ZIP</h4>
                                    <p className="text-sm text-secondary">Get organized ZIP file with all your QR codes</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-indigo-600">4</span>
                                    </div>
                                    <h4 className="font-semibold text-dark mb-2">Use & Deploy</h4>
                                    <p className="text-sm text-secondary">Print, share, or implement your QR codes</p>
                                </div>
                            </div>
                        </div>

                        {/* CSV Format Guide */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                CSV File Format Guide
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-dark mb-4">Required Columns</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2 font-semibold">Column Name</th>
                                                    <th className="text-left py-2 font-semibold">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-mono text-indigo-600">filename</td>
                                                    <td className="py-2 text-secondary">Name for the QR code file</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 font-mono text-indigo-600">value</td>
                                                    <td className="py-2 text-secondary">URL or data to encode</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-dark mb-4">Example CSV Content</h4>
                                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                                        <div>filename,value</div>
                                        <div>product-001,https://shop.com/product1</div>
                                        <div>product-002,https://shop.com/product2</div>
                                        <div>event-ticket-a1,https://event.com/ticket/a1</div>
                                        <div>menu-table-5,https://restaurant.com/menu</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h5 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips:</h5>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Use descriptive filenames for easy organization</li>
                                    <li>• Keep URLs short for better QR code scanning</li>
                                    <li>• Test a few QR codes before bulk generation</li>
                                    <li>• Maximum recommended: 1000 QR codes per batch</li>
                                </ul>
                            </div>
                        </div>

                        {/* Use Cases Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Perfect for Large-Scale Projects
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Package className="w-8 h-8 text-purple-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Product Catalogs</h4>
                                    <p className="text-sm text-secondary">Link each product to detailed info, reviews, or purchase pages</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Users className="w-8 h-8 text-blue-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Event Management</h4>
                                    <p className="text-sm text-secondary">Individual tickets, attendee badges, session links</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Building className="w-8 h-8 text-green-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Real Estate</h4>
                                    <p className="text-sm text-secondary">Property listings, virtual tours, contact forms</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <FileSpreadsheet className="w-8 h-8 text-orange-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Inventory Management</h4>
                                    <p className="text-sm text-secondary">Asset tracking, equipment manuals, maintenance logs</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Clock className="w-8 h-8 text-red-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Educational Resources</h4>
                                    <p className="text-sm text-secondary">Course materials, assignments, learning modules</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <Zap className="w-8 h-8 text-indigo-600 mb-3" />
                                    <h4 className="font-semibold text-dark mb-2">Marketing Campaigns</h4>
                                    <p className="text-sm text-secondary">Landing pages, promotions, social media links</p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-6 text-center">
                                Why Choose Bulk QR Generation?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Time Efficiency</h4>
                                            <p className="text-secondary">Generate hundreds of QR codes in minutes instead of hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Consistent Quality</h4>
                                            <p className="text-secondary">All QR codes use the same design and error correction</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Organized Output</h4>
                                            <p className="text-secondary">Files named according to your specifications</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Scalable Solution</h4>
                                            <p className="text-secondary">Handle projects from dozens to thousands of QR codes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Cost Effective</h4>
                                            <p className="text-secondary">Free alternative to expensive bulk QR services</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-dark">Multiple Formats</h4>
                                            <p className="text-secondary">Download as PNG, SVG, or PDF for any use case</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Content Section */}
                        <div className="mt-12">
                            <div className="bg-gray-50 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-dark mb-6">
                                    Professional Bulk QR Code Generation for Enterprise
                                </h2>
                                <div className="prose max-w-none text-secondary leading-relaxed">
                                    <p className="mb-4">
                                        Streamline your large-scale QR code projects with our <strong>free bulk QR code generator</strong>. Perfect for businesses, educational institutions, event organizers, and marketing agencies that need to create hundreds or thousands of QR codes efficiently. Simply upload a CSV file with your data and generate professionally formatted QR codes in minutes.
                                    </p>
                                    <p className="mb-4">
                                        Our <strong>bulk QR generator</strong> supports all common QR code types including URLs, text, vCards, and more. Ideal for <strong>inventory management systems</strong>, product catalogs, event ticketing, real estate listings, educational resources, and marketing campaigns. Each QR code is generated with consistent quality settings and can be customized with your brand colors and sizing requirements.
                                    </p>
                                    <p className="mb-4">
                                        Enterprise-ready features include <strong>batch processing</strong> capabilities, organized file naming conventions, multiple download formats (PNG, SVG, PDF), and high-resolution output suitable for both digital and print applications. Unlike expensive enterprise QR services, our bulk generator is completely free with no limits on the number of QR codes you can create.
                                    </p>
                                    <p>
                                        Whether you're managing a <strong>large product inventory</strong>, organizing a major conference, or launching a multi-location marketing campaign, our bulk QR code generator provides the scalability and reliability you need. Download your QR codes as an organized ZIP file, ready for immediate deployment across your organization.
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

export default BulkQRGeneratorPage;
