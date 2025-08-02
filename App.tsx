// App.tsx - UPDATED (No Ad Placeholders)
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import { QrCode, Menu } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <QrCode className="h-8 w-8 text-primary" />
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
                        <NavLink 
                            to="/blog" 
                            className={({ isActive }) => 
                                `text-base font-medium transition-colors ${
                                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                                }`
                            }
                        >
                            Blog
                        </NavLink>
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
                                to="/blog" 
                                className={({ isActive }) => 
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive ? 'text-primary bg-blue-50' : 'text-secondary hover:text-primary hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
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
                <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
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

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <HashRouter>
                <div className="min-h-screen flex flex-col font-sans bg-light">
                    <Header />
                    
                    {/* REMOVED: Header Ad Placeholder - Now clean header */}
                    
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            
                            {/* SEO-friendly alternative routes */}
                            <Route path="/free-qr-code-generator" element={<HomePage />} />
                            <Route path="/qr-code-maker" element={<HomePage />} />
                            <Route path="/bulk-qr-generator" element={<HomePage />} />
                            <Route path="/custom-qr-codes" element={<HomePage />} />
                            
                            {/* 404 Fallback */}
                            <Route path="*" element={
                                <div className="container mx-auto px-4 py-16 text-center">
                                    <h1 className="text-4xl font-bold text-dark mb-4">404 - Page Not Found</h1>
                                    <p className="text-secondary mb-8">The page you're looking for doesn't exist.</p>
                                    <NavLink 
                                        to="/" 
                                        className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Go to QR Generator
                                    </NavLink>
                                </div>
                            } />
                        </Routes>
                    </main>
                    
                    <Footer />
                    <Analytics />
                </div>
            </HashRouter>
        </ErrorBoundary>
    );
};

export default App;
