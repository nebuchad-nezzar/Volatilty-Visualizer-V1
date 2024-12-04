import React from 'react';
import { FileCheck, Shield, Globe2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CustomsClearance() {
  const services = [
    {
      icon: <FileCheck className="h-12 w-12 text-blue-600" />,
      title: "Documentation",
      description: "Complete customs documentation preparation and verification."
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Compliance",
      description: "Ensure compliance with international trade regulations."
    },
    {
      icon: <Globe2 className="h-12 w-12 text-blue-600" />,
      title: "Global Coverage",
      description: "Customs clearance services in major ports worldwide."
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Fast Processing",
      description: "Expedited customs clearance for time-sensitive shipments."
    }
  ];

  const features = [
    "Import/Export documentation",
    "Duty & tax calculation",
    "Trade compliance consulting",
    "Risk assessment",
    "Classification services",
    "Regulatory updates"
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customs Clearance Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your international trade with our expert customs clearance services
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Customs Solutions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800"
                  alt="Customs Clearance"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need Customs Clearance Support?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Our experts are ready to help you navigate customs requirements
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}