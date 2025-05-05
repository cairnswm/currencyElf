import React from 'react';
import CurrencySelector from '../components/CurrencySelector';
import ConversionResults from '../components/ConversionResults';
import { useCurrency } from '../context/CurrencyContext';

const ConverterPage: React.FC = () => {
  const { amount, setAmount, error } = useCurrency();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAmount(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setAmount(numValue);
      }
    }
  };

  return (
    <div className="py-8 px-4 container mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Currency Converter</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              From Currency
            </label>
            <CurrencySelector />
          </div>
          
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount || ''}
              onChange={handleAmountChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount to convert"
              min="0"
              step="any"
            />
          </div>
        </div>
        
        <ConversionResults />
      </div>
    </div>
  );
};

export default ConverterPage;