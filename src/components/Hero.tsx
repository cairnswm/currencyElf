import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-700 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <DollarSign className="h-16 w-16 mx-auto mb-6 text-green-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Smart Currency Conversion Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Convert currencies instantly, save your favorites, and access them anytime
          </p>
          <Link 
            to="/converter" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg bg-white text-green-600 hover:bg-green-50 transition-colors duration-200"
          >
            Start Converting <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero