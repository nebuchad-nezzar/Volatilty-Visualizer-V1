import React from 'react';
import { Globe2, Shield, BarChart3, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Globe2 className="h-8 w-8 text-blue-600" />,
      title: "Global Network",
      description: "Access to worldwide shipping routes and trusted partners across continents."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Shipping",
      description: "End-to-end encryption and real-time tracking for complete peace of mind."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Analytics",
      description: "Detailed insights and reporting to optimize your supply chain."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service in multiple languages."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Shymaxx</h2>
          <p className="text-xl text-gray-600">Innovative solutions for modern logistics challenges</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}