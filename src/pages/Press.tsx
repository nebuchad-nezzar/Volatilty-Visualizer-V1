import React from 'react';
import { Newspaper, Award, TrendingUp } from 'lucide-react';

export default function Press() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "Shymaxx Expands Operations to Southeast Asia",
      description: "New regional headquarters in Singapore to serve growing market demand.",
      category: "Company News"
    },
    {
      date: "February 28, 2024",
      title: "Q4 2023 Financial Results",
      description: "Record-breaking quarter with 45% year-over-year growth.",
      category: "Financial News"
    },
    {
      date: "January 10, 2024",
      title: "Shymaxx Launches Sustainable Shipping Initiative",
      description: "Commitment to reduce carbon emissions by 50% by 2030.",
      category: "Sustainability"
    }
  ];

  const newsFeatures = [
    {
      source: "TechCrunch",
      title: "How Shymaxx is Revolutionizing Global Logistics",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300"
    },
    {
      source: "Forbes",
      title: "The Future of Supply Chain Management",
      date: "February 15, 2024",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=300"
    },
    {
      source: "Bloomberg",
      title: "Shymaxx's Innovation in Cross-Border Logistics",
      date: "January 25, 2024",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=300"
    }
  ];

  const awards = [
    {
      year: "2024",
      title: "Best Logistics Technology Solution",
      organization: "Supply Chain Excellence Awards"
    },
    {
      year: "2023",
      title: "Innovation in Global Trade",
      organization: "World Trade Organization"
    },
    {
      year: "2023",
      title: "Sustainability Leadership Award",
      organization: "Green Logistics Association"
    }
  ];

  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Press & Media</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest news, updates, and recognition from Shymaxx
            </p>
          </div>

          {/* Latest Press Releases */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Newspaper className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Latest Press Releases</h2>
            </div>
            <div className="grid gap-8">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">{release.date}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {release.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* News Features */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">In the News</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {newsFeatures.map((news, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{news.source} • {news.date}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{news.title}</h3>
                    <button className="text-blue-600 font-semibold hover:text-blue-700">
                      Read Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Awards & Recognition</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{award.year}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600">{award.organization}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Contact */}
          <div className="bg-blue-600 rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Media Contact</h2>
                <p className="text-blue-100 mb-8">
                  For press inquiries, please contact our media relations team.
                </p>
                <div className="space-y-4 text-blue-100">
                  <p>Email: press@shymaxx.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </div>
              <div>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold w-full">
                  Download Press Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}