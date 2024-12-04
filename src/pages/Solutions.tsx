import React from 'react';
import { Shield, Truck, BarChart3, Globe2, Package, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Solutions() {
  const solutions = [
    {
      icon: <Globe2 className="h-12 w-12 text-blue-600" />,
      title: "Global Logistics Network",
      description: "Access our extensive network of partners and routes spanning over 150 countries. Optimize your supply chain with our strategic global presence.",
      features: ["Multi-modal transportation", "Strategic hub locations", "International compliance", "Custom routing options"]
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Secure Supply Chain",
      description: "End-to-end security solutions protecting your cargo from origin to destination. Real-time monitoring and insurance coverage included.",
      features: ["24/7 monitoring", "Insurance coverage", "Temperature control", "Security protocols"]
    },
    {
      icon: <Package className="h-12 w-12 text-blue-600" />,
      title: "Smart Warehousing",
      description: "State-of-the-art warehousing facilities with advanced inventory management systems and automation.",
      features: ["Automated systems", "Inventory tracking", "Climate control", "Just-in-time delivery"]
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Logistics Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive logistics solutions designed to optimize your supply chain and drive business growth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{solution.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="h-2 w-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your logistics?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Let's discuss how our solutions can transform your supply chain
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