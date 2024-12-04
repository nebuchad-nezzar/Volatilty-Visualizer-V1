import React from 'react';
import { Briefcase, Users, Heart, Zap } from 'lucide-react';

export default function Career() {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, wellness programs, and mental health support."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Growth & Development",
      description: "Continuous learning opportunities, mentorship programs, and career advancement."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous paid time off."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Competitive Package",
      description: "Above-market compensation, equity options, and performance bonuses."
    }
  ];

  const openings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "Supply Chain Analyst",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      title: "Global Logistics Manager",
      department: "Operations",
      location: "Singapore",
      type: "Full-time"
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "London, UK",
      type: "Full-time"
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build the future of global logistics with us. We're looking for passionate individuals who want to make a difference.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Join Shymaxx?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="space-y-1">
                        <p className="text-gray-600">{job.department}</p>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {job.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Don't see the right role?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              Submit Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}