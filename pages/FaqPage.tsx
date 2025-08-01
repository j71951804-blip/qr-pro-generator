import React, { useState } from 'react';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'Is the QR code generator completely free to use?',
      answer: 'Yes! Our QR code generator is completely free with no hidden fees. You can create unlimited QR codes, customize them, and download in multiple formats without any cost.'
    },
    {
      question: 'What types of QR codes can I create?',
      answer: 'You can create QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, and contact cards (vCard). Each type has specific customization options.'
    },
    {
      question: 'What file formats can I download?',
      answer: 'Your QR codes can be downloaded in three formats: PNG (for web and print), SVG (scalable vector), and PDF (document-ready). All formats maintain high quality at any size.'
    },
    {
      question: 'Do the QR codes expire?',
      answer: 'No, QR codes generated with our tool never expire. Once created, they will work indefinitely as long as the content they point to (like a website) remains active.'
    },
    {
      question: 'Can I customize the appearance of my QR codes?',
      answer: 'Absolutely! You can customize the dot color, background color, size (100-1000px), and error correction level. This lets you match your brand colors and requirements.'
    },
    {
      question: 'What is bulk QR code generation?',
      answer: 'Bulk generation allows you to upload a CSV file with multiple data entries and generate dozens or hundreds of QR codes at once. Perfect for events, inventory management, or marketing campaigns.'
    },
    {
      question: 'How do I create a WiFi QR code?',
      answer: 'Select "WiFi" type, enter your network name (SSID), choose encryption type (WPA/WEP/None), and enter the password. Guests can scan the code to connect automatically.'
    },
    {
      question: 'What are error correction levels?',
      answer: 'Error correction helps QR codes remain scannable even if partially damaged. Low (7%) for clean environments, Medium (15%) for general use, Quartile (25%) for outdoor use, High (30%) for harsh conditions.'
    },
    {
      question: 'Can I track QR code scans?',
      answer: 'Our basic generator creates static QR codes that don\'t include tracking. For analytics and scan tracking, consider upgrading to our premium features or using dynamic QR codes.'
    },
    {
      question: 'Are there any size limitations?',
      answer: 'QR codes can be generated from 100px to 1000px. For print materials, we recommend at least 300px. The data capacity depends on content type: URLs (~2000 chars), text (~4000 chars).'
    },
    {
      question: 'How do I create a business card QR code?',
      answer: 'Choose "vCard" type and fill in contact details like name, phone, email, company, and website. When scanned, it allows people to save your contact information directly to their phone.'
    },
    {
      question: 'Can I use these QR codes commercially?',
      answer: 'Yes! QR codes generated with our tool can be used for any purpose including commercial use, marketing materials, business cards, product packaging, and promotional campaigns.'
    },
    {
      question: 'Why won\'t my QR code scan properly?',
      answer: 'Common issues: too small size (use 300px+ for print), low contrast colors, damaged or blurry image, or too much/too little data. Try increasing size, using dark dots on light background, and testing with multiple apps.'
    },
    {
      question: 'Do I need to create an account to use the generator?',
      answer: 'No account required! You can generate and download QR codes immediately. However, signing up for our newsletter gives you access to exclusive tips and advanced features as they become available.'
    }
  ];

  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-secondary">Everything you need to know about our QR code generator</p>
        </div>

        {/* Ad Space */}
        <div className="mb-8">
          <AdPlaceholder width={728} height={90} text="Advertisement" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-dark pr-4">{faq.question}</h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-secondary flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-8 rounded-lg mt-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
              <p className="mb-6 opacity-90">Can't find what you're looking for? We're here to help.</p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Space */}
            <AdPlaceholder width={300} height={250} text="Advertisement" />

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-dark mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/" className="block text-primary hover:underline">🔗 QR Code Generator</a>
                <a href="/blog" className="block text-primary hover:underline">📝 Blog & Tutorials</a>
                <a href="/contact" className="block text-primary hover:underline">💬 Contact Support</a>
                <a href="#" className="block text-primary hover:underline">📧 Email Newsletter</a>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-dark mb-4">Popular Topics</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => toggleItem(1)}
                  className="block text-secondary hover:text-primary transition-colors text-sm"
                >
                  QR Code Types
                </button>
                <button 
                  onClick={() => toggleItem(2)}
                  className="block text-secondary hover:text-primary transition-colors text-sm"
                >
                  Download Formats
                </button>
                <button 
                  onClick={() => toggleItem(4)}
                  className="block text-secondary hover:text-primary transition-colors text-sm"
                >
                  Customization
                </button>
                <button 
                  onClick={() => toggleItem(5)}
                  className="block text-secondary hover:text-primary transition-colors text-sm"
                >
                  Bulk Generation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
