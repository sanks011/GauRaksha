import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">GauRaksha</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#hero" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#about" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#breedingNetwork" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Breeding Network</a>
              <a href="#protectionInitiatives" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Protection</a>
              <a href="#resourceCenter" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
              <a href="#reportingPortal" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Report</a>
              <a href="#communityForum" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Community</a>
              <a href="#contact" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-neutral-700 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className="block" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-neutral-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#hero" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="#about" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="#breedingNetwork" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Breeding Network</a>
          <a href="#protectionInitiatives" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Protection</a>
          <a href="#resourceCenter" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Resources</a>
          <a href="#reportingPortal" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Report</a>
          <a href="#communityForum" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Community</a>
          <a href="#contact" className="block bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;