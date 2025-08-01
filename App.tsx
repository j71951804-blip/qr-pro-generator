import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react'; // Import Analytics
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import { QrCode } from 'lucide-react';
import { AdPlaceholder } from './components/layout/AdPlaceholder';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/#" className="flex items-center space-x-2">
                            <QrCode className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-dark">QR Pro Generator</span>
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className={({ isActive }) => `text-base font-medium ${isActive ? 'text-primary' : 'text-secondary'} hover:text-primary`}>Generator</NavLink>
                        <NavLink to="/blog" className={({ isActive }) => `text-base font-medium ${isActive ? 'text-primary' : 'text-secondary'} hover:text-primary`}>Blog</NavLink>
                        <NavLink to="/faq" className={({ isActive }) => `text-base font-medium ${isActive ? 'text-primary' : 'text-secondary'} hover:text-primary`}>FAQ</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `text-base font-medium ${isActive ? 'text-primary' : 'text-secondary'} hover:text-primary`}>Contact</NavLink>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-secondary">
            <p>&copy; {new Date().getFullYear()} QR Pro Generator. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="hover:text-primary">Privacy Policy</a>
                <a href="#" className="hover:text-primary">Terms of Service</a>
                <a href="#" className="hover:text-primary">Affiliate Disclosure</a>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <div className="flex justify-center my-4 px-4">
          <AdPlaceholder width={728} height={90} text="Header Ad - 728x90" />
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* SEO Routes */}
            <Route path="/free-qr-code-generator" element={<HomePage />} />
            <Route path="/qr-code-maker" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics /> {/* Add Analytics component */}
      </div>
    </HashRouter>
  );
};

export default App;
