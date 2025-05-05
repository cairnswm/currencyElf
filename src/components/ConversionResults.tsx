import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { ExternalLink, Star, Search } from 'lucide-react';

const ConversionResults: React.FC = () => {
  const { currencies, baseCurrency, amount, rates, isLoading, starredCurrencies, toggleStarredCurrency } = useCurrency();
  const [filterText, setFilterText] = useState('');

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading conversion rates...</p>
      </div>
    );
  }

  // Sort currencies with starred ones first and filter based on search text
  const sortedAndFilteredCurrencies = [...Object.entries(rates)]
    .filter(([currencyCode]) => {
      const currency = currencies.find(c => c.code === currencyCode);
      if (!currency) return false;
      
      const searchText = filterText.toLowerCase();
      return currency.code.toLowerCase().includes(searchText) ||
             currency.name.toLowerCase().includes(searchText);
    })
    .sort(([codeA], [codeB]) => {
      const isAStarred = starredCurrencies.includes(codeA);
      const isBStarred = starredCurrencies.includes(codeB);
      if (isAStarred && !isBStarred) return -1;
      if (!isAStarred && isBStarred) return 1;
      return codeA.localeCompare(codeB);
    });

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Conversion Results</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Filter currencies..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredCurrencies.map(([currencyCode, rate]) => {
          const currency = currencies.find(c => c.code === currencyCode);
          if (!currency) return null;
          
          const convertedAmount = amount * rate;
          const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'code',
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
          }).format(convertedAmount);

          const isStarred = starredCurrencies.includes(currencyCode);

          return (
            <div 
              key={currencyCode}
              className={`p-4 rounded-lg shadow-sm border ${
                baseCurrency === currencyCode ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
              } hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">{currencyCode}</span>
                    <button
                      onClick={() => toggleStarredCurrency(currencyCode)}
                      className="ml-2 focus:outline-none"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{currency.name}</p>
                </div>
                {baseCurrency !== currencyCode && (
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    <span>1 {baseCurrency} = {rate.toFixed(4)} {currencyCode}</span>
                    <ExternalLink className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-gray-800 flex items-baseline">
                  {formattedAmount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionResults;