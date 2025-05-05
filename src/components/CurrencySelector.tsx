import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const { currencies, baseCurrency, setBaseCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCurrencies(
        currencies.filter(
          currency => 
            currency.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
            currency.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCurrencies(currencies);
    }
  }, [searchTerm, currencies]);

  const handleSelect = (code: string) => {
    setBaseCurrency(code);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Get the current selected currency object
  const selectedCurrency = currencies.find(c => c.code === baseCurrency);

  return (
    <div className="relative w-full md:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-blue-400 transition-colors"
      >
        <div className="flex items-center">
          <span>{selectedCurrency?.code} - {selectedCurrency?.name}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <ul>
            {filteredCurrencies.map((currency) => (
              <li key={currency.code}>
                <button
                  onClick={() => handleSelect(currency.code)}
                  className={`flex items-center w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                    currency.code === baseCurrency ? 'bg-blue-100' : ''
                  }`}
                >
                  <span>
                    <span className="font-medium">{currency.code}</span> - {currency.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;