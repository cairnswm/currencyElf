import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <CurrencyProvider>
      <Router basename="/exchange">
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/converter" element={<ConverterPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} Currency Elf. All rights reserved.</p>
              <p className="text-gray-400 text-sm mt-2">
                Exchange rates provided by exchangeratesapi.io via Cairnsgames API.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </CurrencyProvider>
  );
}

export default App;