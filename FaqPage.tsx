
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="text-lg font-medium text-dark">{question}</span>
        <ChevronDown
          className={`w-6 h-6 text-secondary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 pr-4">
          <p className="text-secondary">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: 'Are the QR codes generated for free?',
      answer: 'Yes, all QR codes generated on our platform are completely free for both personal and commercial use. We support our service through advertising and affiliate partnerships.'
    },
    {
      question: 'Do the QR codes expire?',
      answer: 'No, the QR codes you create are static and do not expire. They will work as long as the data they point to (e.g., the URL) is active.'
    },
    {
      question: 'Can I customize the design of my QR code?',
      answer: 'Absolutely! You can change the colors of the QR code and its background, adjust the size, and select an error correction level to ensure scannability.'
    },
    {
      question: 'What download formats are available?',
      answer: 'You can download your generated QR codes in high-quality PNG, SVG (vector), and PDF formats, suitable for both web and print.'
    },
    {
      question: 'What is QR code analytics?',
      answer: 'QR code analytics allows you to track how many times your code is scanned. This is a premium feature that uses dynamic QR codes. Sign up to our newsletter to be notified when we launch advanced features!'
    }
  ];

  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-secondary">Find answers to common questions about our QR code generator.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
