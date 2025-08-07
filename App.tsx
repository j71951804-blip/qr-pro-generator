import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ToastProvider } from './components/ui/Toast';
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import WiFiQRGeneratorPage from './pages/WiFiQRGeneratorPage';
import BusinessCardQRGeneratorPage from './pages/BusinessCardQRGeneratorPage';
import RestaurantMenuQRPage from './pages/RestaurantMenuQRPage';
import BulkQRGeneratorPage from './pages/BulkQRGeneratorPage';
import { Menu } from 'lucide-react';

// Tech QR Logo Component
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

// Meta Manager Component for Dynamic Meta Tags
const MetaManager: React.FC<{ 
  title: string; 
  description: string; 
  canonical?: string;
  ogImage?: string;
}> = ({ title, description, canonical, ogImage }) => {
  React.useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]') || 
      document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonical || `https://qr-pro-generator.com${window.location.pathname}`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (ogUrl) ogUrl.setAttribute('content', canonical || `https://qr-pro-generator.com${window.location.pathname}`);
    
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
    }
  }, [title, description, canonical, ogImage]);

  return null;
};

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <TechQRLogo className="h-8 w-8" />
                            <span className="text-xl font-bold text-dark">QR Pro Generator</span>
                        </NavLink>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                                }`
                            }
                        >
                            Generator
                        </NavLink>
                        
                        {/* QR Types Dropdown */}
                        <div className="relative group">
                            <button className="text-base font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1">
                                QR Types
                                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="py-2">
                                    <NavLink 
                                        to="/wifi-qr-generator" 
                                        className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50"
                                    >
                                        WiFi QR Generator
                                    </NavLink>
                                    <NavLink 
                                        to="/business-card-qr-generator" 
                                        className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50"
                                    >
                                        Business Card QR
                                    </NavLink>
                                    <NavLink 
                                        to="/restaurant-menu-qr" 
                                        className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50"
                                    >
                                        Restaurant Menu QR
                                    </NavLink>
                                    <NavLink 
                                        to="/bulk-qr-generator" 
                                        className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50"
                                    >
                                        Bulk QR Generator
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        
                        <NavLink 
                            to="/faq" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                                }`
                            }
                        >
                            FAQ
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Sign Up Free
                        </button>
                        
                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6 text-secondary" />
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
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Generator
                            </NavLink>
                            <NavLink 
                                to="/wifi-qr-generator" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                WiFi QR Generator
                            </NavLink>
                            <NavLink 
                                to="/business-card-qr-generator" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Business Card QR
                            </NavLink>
                            <NavLink 
                                to="/restaurant-menu-qr" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Restaurant Menu QR
                            </NavLink>
                            <NavLink 
                                to="/bulk-qr-generator" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Bulk QR Generator
                            </NavLink>
                            <NavLink 
                                to="/faq" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                FAQ
                            </NavLink>
                            <NavLink 
                                to="/contact" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
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

const Footer: React.FC = () => (
    <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-secondary mb-6">
                <p className="mb-2">&copy; {new Date().getFullYear()} QR Pro Generator. All rights reserved.</p>
                <p className="text-sm">Free QR code generator for URLs, text, WiFi, business cards and more.</p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
                <NavLink to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</NavLink>
                <NavLink to="/terms" className="hover:text-primary transition-colors">Terms of Service</NavLink>
                <a href="#affiliate" className="hover:text-primary transition-colors">Affiliate Disclosure</a>
                <a href="#dmca" className="hover:text-primary transition-colors">DMCA</a>
            </div>
            
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                    Keywords: QR code generator, free QR maker, QR code creator, bulk QR codes, custom QR codes
                </p>
            </div>
        </div>
    </footer>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
        const handleError = () => setHasError(true);
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-dark mb-4">Oops! Something went wrong</h1>
                    <p className="text-secondary mb-4">We're sorry for the inconvenience. Please refresh the page to try again.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

// Enhanced 404 Component with Better SEO
const NotFound: React.FC = () => (
    <>
        <MetaManager 
            title="Page Not Found - QR Pro Generator | Free QR Code Maker"
            description="The page you're looking for doesn't exist. Try our free QR code generator for URLs, WiFi, business cards, and more. No registration required."
        />
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-dark mb-4">404 - Page Not Found</h1>
                    <p className="text-secondary mb-8">The page you're looking for doesn't exist, but our QR generator is ready to help!</p>
                    
                    {/* Popular Tools */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <NavLink 
                            to="/" 
                            className="block bg-primary text-white p-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                        >
                            🎯 Free QR Generator
                            <div className="text-sm opacity-90">Create any QR code</div>
                        </NavLink>
                        <NavLink 
                            to="/wifi-qr-generator" 
                            className="block bg-green-600 text-white p-4 rounded-md font-semibold hover:bg-green-700 transition-colors"
                        >
                            📶 WiFi QR Generator
                            <div className="text-sm opacity-90">Share WiFi passwords</div>
                        </NavLink>
                        <NavLink 
                            to="/business-card-qr-generator" 
                            className="block bg-purple-600 text-white p-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
                        >
                            💼 Business Card QR
                            <div className="text-sm opacity-90">Digital vCard codes</div>
                        </NavLink>
                        <NavLink 
                            to="/restaurant-menu-qr" 
                            className="block bg-orange-600 text-white p-4 rounded-md font-semibold hover:bg-orange-700 transition-colors"
                        >
                            🍽️ Menu QR Codes
                            <div className="text-sm opacity-90">Contactless dining</div>
                        </NavLink>
                    </div>
                    
                    {/* Help Section */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <NavLink to="/faq" className="text-primary hover:underline">Browse FAQ</NavLink>
                            <NavLink to="/contact" className="text-primary hover:underline">Contact Support</NavLink>
                            <a href="mailto:support@qr-pro-generator.com" className="text-primary hover:underline">Email Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ToastProvider>
                <BrowserRouter>
                    <div className="min-h-screen flex flex-col font-sans bg-light">
                        <Header />
                        
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/faq" element={<FaqPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/privacy" element={<PrivacyPage />} />
                                <Route path="/terms" element={<TermsOfServicePage />} />
                                
                                {/* Primary QR generator pages */}
                                <Route path="/wifi-qr-generator" element={<WiFiQRGeneratorPage />} />
                                <Route path="/business-card-qr-generator" element={<BusinessCardQRGeneratorPage />} />
                                <Route path="/restaurant-menu-qr" element={<RestaurantMenuQRPage />} />
                                <Route path="/bulk-qr-generator" element={<BulkQRGeneratorPage />} />
                                
                                {/* SEO-friendly alternative routes */}
                                <Route path="/free-qr-code-generator" element={<HomePage />} />
                                <Route path="/qr-code-maker" element={<HomePage />} />
                                <Route path="/custom-qr-codes" element={<HomePage />} />
                                <Route path="/wifi-qr-code-generator" element={<WiFiQRGeneratorPage />} />
                                <Route path="/vcard-qr-generator" element={<BusinessCardQRGeneratorPage />} />
                                <Route path="/qr-generator-free" element={<HomePage />} />
                                <Route path="/online-qr-code-generator" element={<HomePage />} />
                                
                                {/* Redirect common variations */}
                                <Route path="/qr-code-with-logo" element={<HomePage />} />
                                <Route path="/bulk-qr-code-generator" element={<BulkQRGeneratorPage />} />
                                <Route path="/restaurant-qr-code" element={<RestaurantMenuQRPage />} />
                                
                                {/* Handle query parameters gracefully */}
                                <Route path="/generator" element={<HomePage />} />
                                <Route path="/create" element={<HomePage />} />
                                <Route path="/make" element={<HomePage />} />
                                
                                {/* 404 Fallback with SEO optimization */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        
                        <Footer />
                        <Analytics />
                    </div>
                </BrowserRouter>
            </ToastProvider>
        </ErrorBoundary>
    );
};

export default App;
