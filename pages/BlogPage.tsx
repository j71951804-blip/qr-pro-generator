
import React from 'react';

const blogPosts = [
  {
    title: '10 Creative Ways to Use QR Codes in Your Marketing',
    excerpt: 'Unlock the potential of QR codes with these innovative marketing strategies that will engage your customers and boost your brand visibility.',
    date: 'October 26, 2023',
    category: 'Marketing',
    imageUrl: 'https://picsum.photos/seed/blog1/400/250'
  },
  {
    title: 'The Ultimate Guide to QR Code Analytics',
    excerpt: 'Learn how to track QR code scans, analyze the data, and optimize your campaigns for better results. A must-read for data-driven marketers.',
    date: 'October 22, 2023',
    category: 'Analytics',
    imageUrl: 'https://picsum.photos/seed/blog2/400/250'
  },
  {
    title: 'Static vs. Dynamic QR Codes: Which One Should You Use?',
    excerpt: 'Understand the key differences between static and dynamic QR codes and find out which type is the right choice for your specific needs.',
    date: 'October 18, 2023',
    category: 'Guides',
    imageUrl: 'https://picsum.photos/seed/blog3/400/250'
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">Our Blog</h1>
          <p className="mt-2 text-lg text-secondary">Insights, tips, and guides on QR code marketing.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-primary font-semibold">{post.category}</p>
                <h2 className="mt-2 text-xl font-bold text-dark hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                <p className="mt-3 text-base text-secondary">{post.excerpt}</p>
                <p className="mt-4 text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
