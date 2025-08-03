// pages/TutorialsPage.tsx
import React from 'react';
import { Play, Download, Clock, Users } from 'lucide-react';

const tutorials = [
  {
    title: 'Creating Your First QR Code',
    description: 'Step-by-step guide to generating your first QR code with customization options.',
    duration: '5 min',
    difficulty: 'Beginner',
    category: 'Getting Started',
    videoUrl: '#',
    downloadUrl: '#'
  },
  {
    title: 'QR Code Marketing Campaign Setup',
    description: 'Learn how to plan, create, and execute successful QR code marketing campaigns.',
    duration: '15 min',
    difficulty: 'Intermediate',
    category: 'Marketing',
    videoUrl: '#',
    downloadUrl: '#'
  },
  {
    title: 'Advanced QR Code Analytics',
    description: 'Master QR code tracking and analytics to measure campaign performance.',
    duration: '12 min',
    difficulty: 'Advanced',
    category: 'Analytics',
    videoUrl: '#',
    downloadUrl: '#'
  },
  {
    title: 'Restaurant Digital Menu Implementation',
    description: 'Complete guide to implementing QR code menus in your restaurant.',
    duration: '10 min',
    difficulty: 'Intermediate',
    category: 'Restaurant',
    videoUrl: '#',
    downloadUrl: '#'
  }
];

const TutorialsPage: React.FC = () => {
  return (
    <div className="bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-dark">QR Code Tutorials</h1>
          <p className="mt-2 text-lg text-secondary">Learn QR code best practices with our comprehensive video tutorials and guides.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Play className="w-16 h-16 text-primary" />
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">{tutorial.category}</span>
                <h3 className="text-xl font-bold text-dark mt-2 mb-3">{tutorial.title}</h3>
                <p className="text-secondary mb-4">{tutorial.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tutorial.duration}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Watch Tutorial
                  </button>
                  <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// pages/ResourcesPage.tsx
import React from 'react';
import { FileText, Image, Video, Code } from 'lucide-react';

const resources = [
  {
    title: 'QR Code Size Guidelines Poster',
    description: 'Printable poster showing optimal QR code sizes for different use cases.',
    type: 'PDF',
    icon: FileText,
    size: '2.1 MB',
    downloads: '15,234'
  },
  {
    title: 'QR Code Design Templates',
    description: 'Professional design templates for various industries and use cases.',
    type: 'PSD/AI',
    icon
