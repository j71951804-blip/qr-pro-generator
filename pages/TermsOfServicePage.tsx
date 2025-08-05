// pages/TermsOfServicePage.tsx
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-dark mb-6">Terms of Service</h1>
          <p className="text-sm text-secondary mb-8">Last updated: August 5, 2025</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-secondary mb-4">
              By accessing and using QR Pro Generator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">2. Description of Service</h2>
            <p className="text-secondary mb-4">
              QR Pro Generator is a free online tool that allows users to create QR codes for various purposes including URLs, WiFi credentials, business cards (vCard), text, email, SMS, and phone numbers. The service is provided free of charge for both personal and commercial use.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">3. User Responsibilities</h2>
            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">3.1 Acceptable Use</h3>
            <p className="text-secondary mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
            <ul className="list-disc pl-6 text-secondary mb-4">
              <li>To create QR codes that link to illegal, harmful, threatening, abusive, defamatory, or obscene content</li>
              <li>To violate any applicable local, state, national, or international law or regulation</li>
              <li>To transmit or procure the sending of any advertising or promotional material without appropriate consent</li>
              <li>To impersonate or attempt to impersonate the Company, another user, or any other person or entity</li>
              <li>To engage in any activity that disrupts or interferes with the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">3.2 Content Responsibility</h3>
            <p className="text-secondary mb-4">
              You are solely responsible for all content, information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials that you encode in QR codes created using our Service. You represent and warrant that you have all necessary rights to use such content.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">4. Intellectual Property Rights</h2>
            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">4.1 Service Ownership</h3>
            <p className="text-secondary mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of QR Pro Generator and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">4.2 QR Code Ownership</h3>
            <p className="text-secondary mb-4">
              QR codes generated using our Service are owned by you. You retain all rights to the content you encode and the resulting QR codes. You may use these QR codes for any lawful purpose, including commercial use, without restriction.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">5. Privacy and Data Processing</h2>
            <p className="text-secondary mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">5.1 Data Processing</h3>
            <p className="text-secondary mb-4">
              QR code generation is performed locally in your browser. The content you input for QR codes is not transmitted to our servers unless you explicitly choose to save or share it through optional features.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">6. Service Availability</h2>
            <p className="text-secondary mb-4">
              We strive to provide continuous access to our Service, but we do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">7. Disclaimers</h2>
            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">7.1 Service Provided "As Is"</h3>
            <p className="text-secondary mb-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Service.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">7.2 QR Code Functionality</h3>
            <p className="text-secondary mb-4">
              While we strive to generate functional QR codes, we do not guarantee that all generated QR codes will work perfectly across
