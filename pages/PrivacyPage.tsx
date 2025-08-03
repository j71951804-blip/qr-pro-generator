// pages/PrivacyPage.tsx
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-dark mb-6">Privacy Policy</h1>
          <p className="text-sm text-secondary mb-8">Last updated: August 2, 2025</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Introduction</h2>
            <p className="text-secondary mb-4">
              QR Pro Generator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our QR code generation service at qr-pro-generator.com.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li>QR code content you input (URLs, text, contact information, etc.)</li>
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Feedback or inquiries you submit through our contact forms</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>IP address and general location information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li><strong>Service Provision:</strong> Generate QR codes and provide our core functionality</li>
              <li><strong>Analytics:</strong> Understand usage patterns to improve our service</li>
              <li><strong>Communication:</strong> Send newsletters or respond to inquiries (with your consent)</li>
              <li><strong>Security:</strong> Protect against fraud and ensure service security</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Data Processing</h2>
            <p className="text-secondary mb-4">
              <strong>Client-Side Processing:</strong> All QR code generation happens directly in your browser. The content you enter for QR codes is processed locally and is not transmitted to our servers unless you explicitly choose to save or share it.
            </p>
            <p className="text-secondary mb-4">
              <strong>No Data Storage:</strong> We do not store the content of your QR codes on our servers. Once you close your browser or navigate away, your QR code data is deleted from your device's temporary memory.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Information Sharing</h2>
            <p className="text-secondary mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li><strong>Service Providers:</strong> Trusted third-party services that help us operate our website (analytics, hosting)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Third-Party Services</h2>
            <p className="text-secondary mb-4">Our website uses the following third-party services:</p>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li><strong>Google Analytics:</strong> For website usage analytics</li>
              <li><strong>Vercel:</strong> For website hosting and performance</li>
              <li><strong>CDN Services:</strong> For fast content delivery</li>
            </ul>
            <p className="text-secondary mb-4">
              These services have their own privacy policies, and we encourage you to review them.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Cookies and Tracking</h2>
            <p className="text-secondary mb-4">
              We use cookies and similar technologies to enhance your experience and analyze website usage. You can control cookies through your browser settings, though some features may not function properly if cookies are disabled.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Data Security</h2>
            <p className="text-secondary mb-4">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Your Rights</h2>
            <p className="text-secondary mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Children's Privacy</h2>
            <p className="text-secondary mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">International Users</h2>
            <p className="text-secondary mb-4">
              Our service is hosted in the United States. If you are accessing our service from outside the US, please be aware that your information may be transferred to, stored, and processed in the US.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-secondary mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Contact Us</h2>
            <p className="text-secondary mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none text-secondary mb-4">
              <li>Email: privacy@qr-pro-generator.com</li>
              <li>Website: https://qr-pro-generator.com/contact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
