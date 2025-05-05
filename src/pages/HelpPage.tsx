import React from 'react';
import { DollarSign, Star, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  return (
    <div className="py-8 px-4 container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">How to Use the Currency Converter</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-6">
            Our currency converter allows you to quickly convert between different currencies using real-time exchange rates.
            Follow these simple steps to get started:
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Your Base Currency</h3>
                <p className="text-gray-600">
                  Choose the currency you want to convert from using the dropdown menu. This selection will be remembered for your next visit.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter the Amount</h3>
                <p className="text-gray-600">
                  Type in the amount you want to convert. The conversions will update automatically as you type.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Features</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Favorite Currencies</h3>
                <p className="text-gray-600">
                  Click the star icon on any currency card to mark it as a favorite. Starred currencies will always appear at the top of your list and persist between visits.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Search className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Currency Filter</h3>
                <p className="text-gray-600">
                  Use the search box above the conversion results to quickly filter currencies by name or code.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <Link 
            to="/converter" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try the Converter <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;