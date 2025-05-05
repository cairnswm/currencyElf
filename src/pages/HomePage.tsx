import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                1
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Select Your Base Currency</h3>
                <p className="text-gray-600">Choose the currency you want to convert from using our intuitive dropdown selector.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                2
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Enter Your Amount</h3>
                <p className="text-gray-600">Type in the amount you want to convert to other currencies.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0">
                3
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">View Instant Conversions</h3>
                <p className="text-gray-600">See real-time conversion rates for all available currencies at once.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;