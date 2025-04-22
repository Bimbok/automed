import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from './button';

const Navbar = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md py-3 shadow-lg",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                AutoMed
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-700 hover:text-indigo-500">
              Home
            </Link>
            <Link to="/medicine-quality" className="text-sm font-medium text-slate-700 hover:text-indigo-500">
              Quality Analysis
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-700 hover:text-indigo-500">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-indigo-500">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-indigo-500">
              Contact
            </a>
          </div>
          
          {/* Login/Signup Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign up</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/medicine-quality"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Quality Analysis
          </Link>
          <a
            href="#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Contact
          </a>

          <div className="pt-4 pb-3 border-t border-slate-200">

            <div className="flex items-center px-5">
              <Link to="/login" className="block w-full">
                <Button variant="primary" className="w-full mb-2">
                  Login
                </Button>
              </Link>
            </div>

            <div className="flex items-center px-5">
              <Link to="/signup" className="block w-full">
                <Button variant="primary" className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;