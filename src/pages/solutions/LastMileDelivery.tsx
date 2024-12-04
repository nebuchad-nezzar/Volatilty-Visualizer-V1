import React from 'react';
import { Truck, MapPin, Clock, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LastMileDelivery() {
  const features = [
    {
      icon: <MapPin className="h-12 w-12 text-blue-600" />,
      title: "Route Optimization",
      description: "AI-powered route planning for efficient deliveries."
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Real-time Tracking",
      description: "Live tracking and delivery status updates."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-blue-600" />,
      title: "Mobile App",
      description: "User-friendly app for delivery management."
    },
    {
      icon: <Truck className="h-12 w-12 text-blue-600" />,
      title: "Fleet Management",
      description: "Comprehensive fleet tracking and maintenance."
    }
  ];

  const benefits = [
    "Reduced delivery times",
    "Lower operational costs",
    "Improved customer satisfaction",
    "Environmental sustainability",
    "Flexible delivery options",
    "Proof of delivery system"
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Last Mile Delivery Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Efficient and reliable last mile delivery services for your business
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1687831680680-6nIkztwmYMQ?auto=format&fit=crop&q=80&w=800"
                alt="Last Mile Delivery"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Our Last Mile Solution</h2>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your Deliveries?</h2>
                <p className="text-blue-100 mb-8">
                  Transform your last mile delivery operations with our advanced solutions.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Get Started
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-blue-100">On-Time Delivery</div>
                </div>
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">30%</div>
                  <div className="text-blue-100">Cost Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}