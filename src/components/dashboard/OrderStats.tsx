import React from 'react';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';

export default function OrderStats() {
  // Mock data - replace with actual data from your backend
  const stats = [
    {
      icon: <Package className="h-6 w-6 text-blue-600" />,
      label: 'Total Orders',
      value: '156',
      change: '+12.5%',
      positive: true
    },
    {
      icon: <Truck className="h-6 w-6 text-green-600" />,
      label: 'In Transit',
      value: '23',
      change: '+5.0%',
      positive: true
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-600" />,
      label: 'Pending',
      value: '8',
      change: '-2.3%',
      positive: false
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      label: 'Delivered',
      value: '125',
      change: '+18.2%',
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
            <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}