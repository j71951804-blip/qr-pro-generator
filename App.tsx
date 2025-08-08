import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

// Simple Logo Component
const TechQRLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
        <rect x="2" y="2" width="7" height="7" rx="1" fill="#0d6efd"/>
        <rect x="2" y="23" width="7" height="7" rx="1" fill="#0d6efd"/>
        <rect x="23" y="2" width="7" height="7" rx="1" fill="#0d6efd"/>
        <rect x="11" y="11" width="10" height="10" rx="2" fill="#6c757d" opacity="0.3"/>
        <rect x="13" y="13" width="6" height="6" rx="1" fill="#0d6efd"/>
        <rect x="23" y="13" width="2" height="2" fill="#0d6efd"/>
        <rect x="27" y="13" width="2" height="2" fill="#0d6efd"/>
        <rect x="23" y="17" width="2" height="2" fill="#0d6efd"/>
        <rect x="27" y="17" width="2" height="2" fill="#0d6efd"/>
        <rect x="11" y="23" width="3" height="3" fill="#0d6efd"/>
        <rect x="16" y="23" width="3" height="3" fill="#0d6efd"/>
        <rect x="21" y="23" width="3" height="3" fill="#0d6efd"/>
        <rect x="26" y="23" width="3" height="3" fill="#0d6efd"/>
    </svg>
);

// Simple Page Components
const HomePage: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
            Free QR Code Generator
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Create Your QR Code</h2>
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Enter URL or Text:</label>
                    <input
                        type="text"
                        defaultValue="https://example.com"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Generate QR Code
                </button>
                <div className="mt-6 text-center">
                    <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed">
                        <p className="text-gray-500">QR Code Preview</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AboutPage: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About QR Pro Generator</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
                QR Pro Generator is a free tool for creating QR codes for various purposes.
            </p>
            <p className="text-gray-600">
                Generate QR codes for URLs, WiFi networks, business cards, and more!
            </p>
        </div>
    </div>
);

const ContactPage: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
                Get in touch with us for support or feedback.
            </p>
            <div className="space-y-2">
                <p><strong>Email:</strong> support@qr-pro-generator.com</p>
                <p><strong>Website:</strong> https://qr-pro-generator.com</p>
            </div>
        </div>
    </div>
);

const NotFoundPage: React.FC = () => (
    <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <NavLink 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Go Home
        </NavLink>
    </div>
);

// Simple Header Component
const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <TechQRLogo className="h-8 w-8" />
                            <span className="text-xl font-bold text-gray-900">QR Pro Generator</span>
                        </NavLink>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                }`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Sign Up Free
                        </button>
                        
                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink 
                                to="/contact" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

// Simple Footer Component
const Footer: React.FC = () => (
    <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600 mb-6">
                <p className="mb-2">&copy; {new Date().getFullYear()} QR Pro Generator. All rights reserved.</p>
                <p className="text-sm">Free QR code generator for URLs, text, WiFi, business cards and more.</p>
            </div>
        </div>
    </footer>
);

// Main App Component
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans" style={{backgroundColor: '#f8f9fa'}}>
                <Header />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
