import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Cross-border Logistics
              <span className="text-blue-600"> Simplified</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium logistics solutions backed by cutting-edge technology and exceptional service. Ship smarter, faster, and more efficiently across borders.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/contact" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/solutions" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
              alt="Global Logistics"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}