import React from 'react';
import { Package, Truck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive logistics solutions tailored to your needs</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <Package className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">International Freight</h3>
            <p className="text-gray-600 mb-6">Air, ocean, and ground shipping solutions with real-time tracking and customs clearance.</p>
            <Link to="/services" className="text-blue-600 font-semibold hover:text-blue-700">Learn More →</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <Truck className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Supply Chain Solutions</h3>
            <p className="text-gray-600 mb-6">End-to-end supply chain management with advanced analytics and optimization.</p>
            <Link to="/services" className="text-blue-600 font-semibold hover:text-blue-700">Learn More →</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <MapPin className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Last Mile Delivery</h3>
            <p className="text-gray-600 mb-6">Efficient local delivery services with route optimization and real-time updates.</p>
            <Link to="/services" className="text-blue-600 font-semibold hover:text-blue-700">Learn More →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}