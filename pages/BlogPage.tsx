// pages/BlogPage.tsx - EXPANDED with more content
import React from 'react';

const blogPosts = [
  {
    title: 'The Complete Guide to QR Code Marketing in 2025',
    excerpt: 'Discover how QR codes are revolutionizing marketing campaigns. From restaurant menus to retail experiences, learn the latest strategies and best practices for successful QR code implementation.',
    date: 'January 28, 2025',
    category: 'Marketing',
    imageUrl: 'https://picsum.photos/seed/blog1/400/250',
    readTime: '8 min read',
    author: 'Sarah Marketing'
  },
  {
    title: 'QR Code Security: Protecting Your Business and Customers',
    excerpt: 'Learn essential security practices for QR codes. Understand common threats, implement security measures, and educate your customers about safe QR code scanning practices.',
    date: 'January 25, 2025',
    category: 'Security',
    imageUrl: 'https://picsum.photos/seed/blog2/400/250',
    readTime: '6 min read',
    author: 'Mike Security'
  },
  {
    title: 'Restaurant QR Code Menus: Implementation Best Practices',
    excerpt: 'Transform your restaurant experience with digital menus. Complete guide to creating, implementing, and optimizing QR code menus for better customer satisfaction and operational efficiency.',
    date: 'January 22, 2025',
    category: 'Restaurant',
    imageUrl: 'https://picsum.photos/seed/blog3/400/250',
    readTime: '7 min read',
    author: 'Chef Digital'
  },
  {
    title: 'QR Code Analytics: Measuring Campaign Success',
    excerpt: 'Track and analyze your QR code performance with advanced analytics. Learn which metrics matter, how to set up tracking, and optimize your campaigns for better ROI.',
    date: 'January 19, 2025',
    category: 'Analytics',
    imageUrl: 'https://picsum.photos/seed/blog4/400/250',
    readTime: '9 min read',
    author: 'Data Analytics Pro'
  },
  {
    title: 'Event Management Revolution: QR Codes for Check-ins and More',
    excerpt: 'Streamline your events with QR code technology. From contactless check-ins to digital programs and networking, discover how QR codes enhance the event experience.',
    date: 'January 16, 2025',
    category: 'Events',
    imageUrl: 'https://picsum.photos/seed/blog5/400/250',
    readTime: '5 min read',
    author: 'Event Manager'
  },
  {
    title: 'Retail QR Codes: Bridging Physical and Digital Shopping',
    excerpt: 'Connect your physical store with digital experiences. Learn how retailers use QR codes for product information, reviews, loyalty programs, and seamless omnichannel experiences.',
    date: 'January 13, 2025',
    category: 'Retail',
    imageUrl: 'https://picsum.photos/seed/blog6/400/250',
    readTime: '6 min read',
    author: 'Retail Expert'
  },
  {
    title: 'QR Code Design Principles: Creating Scannable and Beautiful Codes',
    excerpt: 'Master the art of QR code design. Balance aesthetics with functionality, understand size requirements, color choices, and error correction levels for optimal performance.',
    date: 'January 10, 2025',
    category: 'Design',
    imageUrl: 'https://picsum.photos/seed/blog7/400/250',
    readTime: '7 min read',
    author: 'Design Guru'
  },
  {
    title: 'Healthcare QR Codes: Improving Patient Experience and Safety',
    excerpt: 'Explore how healthcare providers use QR codes for patient check-ins, medical records access, prescription information, and contactless healthcare delivery.',
    date: 'January 7, 2025',
    category: 'Healthcare',
    imageUrl: 'https://picsum.photos/seed/blog8/400/250',
    readTime: '8 min read',
    author: 'Health Tech'
  },
  {
    title: 'QR Code ROI: Calculating the Business Impact',
    excerpt: 'Measure the financial impact of your QR code campaigns. Learn to calculate ROI, track conversions, and justify QR code investments with concrete business metrics.',
    date: 'January 4, 2025',
    category: 'Business',
    imageUrl: 'https://picsum.photos/seed/blog9/400/250',
    readTime: '6 min read',
    author: 'Business Analyst'
  },
  {
    title: 'International QR Code Marketing: Cultural Considerations',
    excerpt: 'Expand your QR code campaigns globally. Understand cultural differences, adoption rates, and localization strategies for successful international QR code marketing.',
    date: 'January 1, 2025',
    category: 'Global',
    imageUrl: 'https://picsum.photos/seed/blog10/400/250',
    readTime: '9 min read',
    author: 'Global Marketing'
  },
  {
    title: 'QR Code Accessibility: Making Codes Inclusive for Everyone',
    excerpt: 'Design QR codes that work for users with disabilities. Learn about color contrast requirements, size considerations, and alternative access methods for inclusive QR experiences.',
    date: 'December 28, 2024',
    category: 'Accessibility',
    imageUrl: 'https://picsum.photos/seed/blog11/400/250',
    readTime: '5 min read',
    author: 'Accessibility Expert'
  },
  {
    title: 'Advanced QR Code Applications: Beyond Basic Links',
    excerpt: 'Explore innovative QR code uses including augmented reality triggers, blockchain integration, IoT device configuration, and advanced data transmission techniques.',
    date: 'December 25, 2024',
    category: 'Innovation',
    imageUrl: 'https://picsum.photos/seed/blog12/400/250',
    readTime: '10 min read',
    author: 'Tech Innovator'
  }
];

const categories = ['All', 'Marketing', 'Security', 'Restaurant', 'Analytics', 'Events', 'Retail', 'Design', 'Healthcare', 'Business', 'Global', 'Accessibility', 'Innovation'];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">QR Code Blog & Resources</h1>
          <p className="mt-2 text-lg text-secondary max-w-2xl mx-auto">
            Expert insights, practical guides, and industry trends for QR code marketing and implementation.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden shadow-lg">
            <div className="p-8 text-white">
              <div className="max-w-2xl">
                <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured Article
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  The Future of QR Codes: Trends and Predictions for 2025
                </h2>
                <p className="text-blue-100 mb-6">
                  Explore emerging trends in QR code technology, from AI integration to augmented reality experiences. 
                  Discover what's coming next in the QR code revolution and how to prepare your business.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-primary font-semibold bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-dark hover:text-primary transition-colors cursor-pointer mb-3">
                  {post.title}
                </h2>
                <p className="text-base text-secondary mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{post.date}</p>
                    <p className="text-xs text-gray-400">By {post.author}</p>
                  </div>
                  <button className="text-primary font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-dark mb-4">Stay Updated</h3>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            Get the latest QR code insights, case studies, and industry trends delivered to your inbox weekly.
            Join 10,000+ marketers who trust our newsletter.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            No spam, unsubscribe anytime. Read our privacy policy.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-dark text-center mb-8">Explore By Topic</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1).map(category => {
              const count = blogPosts.filter(post => post.category === category).length;
              return (
                <div key={category} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-dark mb-2">{category}</h4>
                  <p className="text-secondary text-sm mb-3">{count} articles</p>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Explore {category} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
