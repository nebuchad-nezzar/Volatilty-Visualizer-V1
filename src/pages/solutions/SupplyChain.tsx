import React from 'react';
import { BarChart3, Box, RefreshCcw, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplyChain() {
  const features = [
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Real-time insights and predictive analytics for informed decision-making."
    },
    {
      icon: <Box className="h-12 w-12 text-blue-600" />,
      title: "Inventory Management",
      description: "Smart inventory control with automated reordering and optimization."
    },
    {
      icon: <RefreshCcw className="h-12 w-12 text-blue-600" />,
      title: "Process Automation",
      description: "Streamlined operations with AI-powered workflow automation."
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Performance Optimization",
      description: "Continuous improvement through data-driven optimization."
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Supply Chain Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your supply chain with intelligent automation and real-time visibility
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">End-to-End Visibility</h2>
                <p className="text-gray-600 mb-6">
                  Get complete visibility into your supply chain with our advanced tracking and monitoring solutions. From procurement to delivery, stay informed at every step.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Real-time order tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Inventory level monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Supplier performance tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Cost analysis and optimization</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800"
                  alt="Supply Chain Analytics"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Optimize Your Supply Chain?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Let's discuss how our solutions can transform your operations
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}