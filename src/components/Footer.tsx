import React from 'react';
import { Globe2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Globe2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">Shymaxx</span>
            </div>
            <p className="text-gray-400">Premium cross-border logistics solutions for modern businesses.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">International Freight</a></li>
              <li><a href="#" className="hover:text-blue-500">Supply Chain</a></li>
              <li><a href="#" className="hover:text-blue-500">Last Mile Delivery</a></li>
              <li><a href="#" className="hover:text-blue-500">Customs Clearance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500">Press</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Shymaxx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}