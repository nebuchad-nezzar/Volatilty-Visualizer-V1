import React from 'react';
import { Truck, Package, Globe2, BarChart3, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      icon: <Package className="h-16 w-16 text-blue-600" />,
      title: "Freight Forwarding",
      description: "International shipping solutions with comprehensive customs clearance and documentation support.",
      features: [
        "Air freight services",
        "Ocean freight services",
        "Customs brokerage",
        "Documentation handling"
      ]
    },
    {
      icon: <Truck className="h-16 w-16 text-blue-600" />,
      title: "Ground Transportation",
      description: "Efficient ground transportation network with real-time tracking and route optimization.",
      features: [
        "Full truckload services",
        "Less than truckload",
        "Expedited delivery",
        "Last-mile delivery"
      ]
    },
    {
      icon: <BarChart3 className="h-16 w-16 text-blue-600" />,
      title: "Supply Chain Analytics",
      description: "Data-driven insights to optimize your supply chain operations and reduce costs.",
      features: [
        "Performance metrics",
        "Cost analysis",
        "Route optimization",
        "Inventory management"
      ]
    },
    {
      icon: <Shield className="h-16 w-16 text-blue-600" />,
      title: "Specialized Services",
      description: "Custom solutions for unique logistics challenges and specialized cargo requirements.",
      features: [
        "Temperature-controlled shipping",
        "Hazardous materials",
        "Project cargo",
        "Value-added services"
      ]
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive logistics services tailored to meet your specific business needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="h-2 w-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
                <p className="text-blue-100 mb-8">
                  Our team of experts will work with you to develop a tailored logistics solution that meets your unique requirements.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Contact Our Team
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-blue-100">Global Partners</div>
                </div>
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-blue-100">Support</div>
                </div>
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">99%</div>
                  <div className="text-blue-100">On-Time Delivery</div>
                </div>
                <div className="bg-blue-500 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-blue-100">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}