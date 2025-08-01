import React, { useState } from 'react';
import { QrCodeGenerator } from '../components/QrCodeGenerator';
import { EmailCaptureModal } from '../components/EmailCaptureModal';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { AFFILIATE_TOOLS } from '../constants';
import { ExternalLink } from 'lucide-react';

const HomePage: React.FC = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Show email modal after user generates a few QR codes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailModal(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Professional QR Code Generator
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Create custom QR codes for URLs, WiFi, business cards, and more. 
            Download in PNG, SVG, or PDF format.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✨ Unlimited Generation</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📱 Mobile Optimized</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🚀 Bulk Creation</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">💎 High Quality</span>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="container mx-auto px-4 py-4">
        <AdPlaceholder width={728} height={90} text="Advertisement" />
      </div>

      {/* Main QR Generator */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Generator */}
          <div className="lg:col-span-3">
            <QrCodeGenerator />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Space */}
            <AdPlaceholder width={300} height={250} text="Advertisement" />

            {/* Recommended Tools */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-dark mb-4">Recommended Tools</h3>
              <div className="space-y-4">
                {AFFILIATE_TOOLS.map((tool, index) => (
                  <a
                    key={index}
                    href={tool.link}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tool.logoUrl} alt={tool.name} className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark text-sm">{tool.name}</h4>
                      <p className="text-xs text-secondary">{tool.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-dark">Why Choose QR Pro Generator?</h2>
            <p className="mt-2 text-lg text-secondary">Professional features for businesses and individuals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Custom Styling</h3>
              <p className="text-secondary">Choose colors, sizes, and error correction levels to match your brand.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Bulk Generation</h3>
              <p className="text-secondary">Upload a CSV file and generate hundreds of QR codes at once.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">High Quality</h3>
              <p className="text-secondary">Download in PNG, SVG, or PDF formats for any use case.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
};

export default HomePage;
