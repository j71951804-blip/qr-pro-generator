// Debug HomePage - Let's make sure the QR generator shows up
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wifi, CreditCard, Users, Smartphone, Download, Star, CheckCircle } from 'lucide-react';

// Simple QR Generator Component for testing
const SimpleQRGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState('https://example.com');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">QR Code Generator</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Enter URL or Text:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          <div className="mt-4 space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Generate QR Code
            </button>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">QR Code Preview</h3>
          <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-500">
              <div className="text-4xl mb-2">📱</div>
              <p>QR Code will appear here</p>
              <p className="text-sm mt-2">Enter data above to generate</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="bg-green-600 text-white py-2 px-3 rounded text-sm">PNG</button>
            <button className="bg-blue-600 text-white py-2 px-3 rounded text-sm">SVG</button>
            <button className="bg-red-600 text-white py-2 px-3 rounded text-sm">PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="text-blue-600">Free QR Code Generator</span>
          <br />
          <span className="text-3xl md:text-4xl text-gray-600 font-bold">
            Create WiFi, vCard & Business Card QR Codes
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Generate unlimited <strong>free QR codes</strong> for websites, WiFi networks, business cards, restaurant menus and more. 
          Customize colors, add logos, download in PNG/SVG/PDF format.
        </p>
        
        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-blue-600 mb-6">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>No Registration Required</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>Unlimited QR Codes</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>Commercial Use OK</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>High Quality Downloads</span>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">50,000+ Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">1M+ QR Codes Created</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Popular QR Code Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 text-center">WiFi QR Codes</h3>
            <p className="text-xs text-gray-600 text-center mt-1">Share WiFi passwords instantly</p>
          </div>
          
          <div className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 text-center">Business Cards</h3>
            <p className="text-xs text-gray-600 text-center mt-1">Digital vCard contact info</p>
          </div>
          
          <div className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 text-center">Restaurant Menus</h3>
            <p className="text-xs text-gray-600 text-center mt-1">Contactless dining solutions</p>
          </div>
          
          <div className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Download className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 text-center">Bulk Generator</h3>
            <p className="text-xs text-gray-600 text-center mt-1">Generate hundreds at once</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          {/* Main QR Code Generator */}
          <div id="main-content">
            <SimpleQRGenerator />
          </div>
          
          {/* Additional Content */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Choose Our Free QR Code Generator?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">🎯 Complete QR Code Solution</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Multiple QR Code Types</p>
                        <p className="text-sm text-gray-600">URLs, WiFi, vCard, Email, SMS, Phone, Text</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Custom Design Options</p>
                        <p className="text-sm text-gray-600">Colors, logos, sizes, error correction levels</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Professional Downloads</p>
                        <p className="text-sm text-gray-600">PNG, SVG, PDF formats in high resolution</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">✨ Key Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Always Free</p>
                        <p className="text-sm text-gray-600">No registration or payment required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Commercial Use</p>
                        <p className="text-sm text-gray-600">Free for business and personal use</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">No Expiration</p>
                        <p className="text-sm text-gray-600">QR codes work forever</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Pro Features Coming Soon</h3>
            <ul className="space-y-3 text-sm text-gray-600 mb-4">
              <li className="flex items-center">✅ Analytics & Tracking</li>
              <li className="flex items-center">✅ Custom Branding</li>
              <li className="flex items-center">✅ Team Collaboration</li>
              <li className="flex items-center">✅ API Access</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              Get Notified
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
