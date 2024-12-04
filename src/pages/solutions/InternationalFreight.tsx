import React from 'react';
import { Plane, Ship, Truck, Clock, Shield, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternationalFreight() {
  const services = [
    {
      icon: <Plane className="h-12 w-12 text-blue-600" />,
      title: "Air Freight",
      description: "Express worldwide air freight services for time-sensitive cargo."
    },
    {
      icon: <Ship className="h-12 w-12 text-blue-600" />,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions for large shipments."
    },
    {
      icon: <Truck className="h-12 w-12 text-blue-600" />,
      title: "Ground Transport",
      description: "Reliable ground transportation across continents."
    }
  ];

  const features = [
    "Door-to-door delivery options",
    "Real-time shipment tracking",
    "Customs documentation support",
    "Cargo insurance coverage",
    "Temperature-controlled shipping",
    "Hazardous materials handling"
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">International Freight Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive international shipping solutions tailored to your business needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
                alt="International Freight"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Freight Services?</h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Ship?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get a quote for your international shipment today
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}