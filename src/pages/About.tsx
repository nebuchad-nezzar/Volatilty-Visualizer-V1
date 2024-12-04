import React from 'react';
import { Globe2, Users, Target, Award } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Emily Thompson",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "David Kim",
      role: "Global Logistics Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Shymaxx</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming global logistics through innovation and excellence since 2010
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Target className="h-12 w-12 text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To revolutionize global logistics through innovative technology and sustainable practices, 
                making international shipping accessible, efficient, and environmentally responsible.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Award className="h-12 w-12 text-blue-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the world's most trusted and innovative logistics partner, setting new standards 
                for efficiency, reliability, and sustainability in global trade.
              </p>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Stats */}
          <div className="bg-blue-600 rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">2010</div>
                <div className="text-blue-100">Founded</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Employees</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Global Offices</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$500M+</div>
                <div className="text-blue-100">Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}