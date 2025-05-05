import React from 'react';
import { Star, Zap, History, Search } from 'lucide-react';

const features = [
  {
    icon: <Star className="h-8 w-8 text-green-500 mb-4" />,
    title: 'Favorite Currencies',
    description: 'Star your most-used currencies for quick access and keep them at the top of your list.'
  },
  {
    icon: <Zap className="h-8 w-8 text-green-500 mb-4" />,
    title: 'Real-Time Conversion',
    description: 'Instantly convert between currencies with up-to-date exchange rates.'
  },
  {
    icon: <Search className="h-8 w-8 text-green-500 mb-4" />,
    title: 'Smart Search',
    description: 'Quickly find currencies by name or code with our intelligent search feature.'
  },
  {
    icon: <History className="h-8 w-8 text-green-500 mb-4" />,
    title: 'Persistent Settings',
    description: 'Your preferences, including favorite currencies and amounts, are saved automatically.'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features