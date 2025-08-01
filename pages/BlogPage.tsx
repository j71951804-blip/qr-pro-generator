import React from 'react';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      title: 'How to Create QR Codes for Restaurant Menus',
      excerpt: 'Learn how restaurants can use QR codes to create contactless menu experiences that customers love.',
      date: '2025-08-01',
      author: 'QR Pro Team',
      category: 'Business'
    },
    {
      title: 'QR Code Marketing Strategies That Actually Work',
      excerpt: 'Discover proven QR code marketing tactics that drive engagement and boost your business results.',
      date: '2025-07-28',
      author: 'Marketing Expert',
      category: 'Marketing'
    },
    {
      title: 'WiFi QR Codes: Complete Setup Guide',
      excerpt: 'Step-by-step instructions to create WiFi QR codes for your business, home, or events.',
      date: '2025-07-25',
      author: 'Tech Guide',
      category: 'Tutorial'
    },
    {
      title: 'Best QR Code Practices for Events',
      excerpt: 'Make your events more engaging with QR codes for registration, networking, and information sharing.',
      date: '2025-07-22',
      author: 'Event Planner',
      category: 'Events'
    },
    {
      title: 'Digital Business Cards with QR Codes',
      excerpt: 'Replace traditional business cards with smart QR codes that share all your contact information instantly.',
      date: '2025-07-20',
      author: 'Business Tips',
      category: 'Business'
    },
    {
      title: 'QR Code Security: What You Need to Know',
      excerpt: 'Understanding QR code security risks and how to create safe, trustworthy QR codes for your business.',
      date: '2025-07-18',
      author: 'Security Expert',
      category: 'Security'
    }
  ];

  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">QR Code Blog</h1>
          <p className="mt-2 text-lg text-secondary">Tips, tutorials, and best practices for QR code marketing</p>
        </div>

        {/* Ad Space */}
        <div className="mb-8">
          <AdPlaceholder width={728} height={90} text="Advertisement" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 text-sm text-secondary mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-dark mb-3 hover:text-primary cursor-pointer">
                    {post.title}
                  </h2>
                  
                  <p className="text-secondary mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border rounded-md text-secondary hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-primary text-white rounded-md">1</button>
                <button className="px-4 py-2 bg-white border rounded-md text-secondary hover:bg-gray-50">2</button>
                <button className="px-4 py-2 bg-white border rounded-md text-secondary hover:bg-gray-50">3</button>
                <button className="px-4 py-2 bg-white border rounded-md text-secondary hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Space */}
            <AdPlaceholder width={300} height={250} text="Advertisement" />

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-dark mb-4">Categories</h3>
              <div className="space-y-2">
                {['Business', 'Marketing', 'Tutorial', 'Events', 'Security', 'Tips'].map((category) => (
                  <a key={category} href="#" className="block text-secondary hover:text-primary transition-colors">
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-sm opacity-90 mb-4">Get the latest QR code tips and marketing strategies.</p>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="your.email@example.com" 
                  className="w-full p-3 rounded-md text-dark"
                />
                <button className="w-full bg-white text-primary py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
