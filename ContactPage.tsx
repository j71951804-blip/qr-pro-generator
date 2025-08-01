
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">Get In Touch</h1>
          <p className="mt-2 text-lg text-secondary">We'd love to hear from you. Contact us for support, partnerships, or feedback.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-dark mb-4">Contact Information</h2>
            <div className="space-y-4 text-secondary">
              <p className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-primary" /> 123 QR Code Lane, Tech City, 12345</p>
              <p className="flex items-center"><Phone className="w-5 h-5 mr-3 text-primary" /> (123) 456-7890</p>
              <p className="flex items-center"><Mail className="w-5 h-5 mr-3 text-primary" /> support@qrprogenerator.com</p>
            </div>
          </div>
          <form>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md focus:ring-primary focus:border-primary" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md focus:ring-primary focus:border-primary" />
              <textarea placeholder="Your Message" rows={5} className="w-full p-3 border rounded-md focus:ring-primary focus:border-primary"></textarea>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
