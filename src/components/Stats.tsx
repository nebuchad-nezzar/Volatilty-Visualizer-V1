import React from 'react';

export default function Stats() {
  return (
    <div className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-blue-100">Countries Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">1M+</div>
            <div className="text-blue-100">Shipments Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-blue-100">On-Time Delivery</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-100">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}