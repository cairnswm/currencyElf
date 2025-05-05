import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-green-500" />
            <span className="font-bold text-xl text-gray-800">Currency Elf</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link to="/converter" className="text-gray-600 hover:text-green-500 transition-colors">
              Converter
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-green-500 transition-colors">
              Help
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-green-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/converter" 
                className="text-gray-600 hover:text-green-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Converter
              </Link>
              <Link 
                to="/help" 
                className="text-gray-600 hover:text-green-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;