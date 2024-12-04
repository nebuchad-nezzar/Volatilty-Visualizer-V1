import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';

export default function RateCalculator() {
  const [formData, setFormData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    fromCountry: '',
    toCountry: '',
    shipmentType: 'standard'
  });

  const [rate, setRate] = useState<number | null>(null);

  const calculateRate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock rate calculation - replace with actual API call
    const volume = Number(formData.length) * Number(formData.width) * Number(formData.height);
    const weight = Number(formData.weight);
    const baseRate = 10;
    const volumetricWeight = volume / 5000; // Standard volumetric divisor
    const chargeableWeight = Math.max(weight, volumetricWeight);
    
    let multiplier = 1;
    switch (formData.shipmentType) {
      case 'express':
        multiplier = 2;
        break;
      case 'priority':
        multiplier = 3;
        break;
      default:
        multiplier = 1;
    }

    const calculatedRate = baseRate * chargeableWeight * multiplier;
    setRate(calculatedRate);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Rate Calculator</h2>
      </div>

      <form onSubmit={calculateRate} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (cm)
            </label>
            <input
              type="number"
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (cm)
            </label>
            <input
              type="number"
              value={formData.width}
              onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Country
            </label>
            <select
              value={formData.fromCountry}
              onChange={(e) => setFormData({ ...formData, fromCountry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CN">China</option>
              <option value="JP">Japan</option>
              {/* Add more countries */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Country
            </label>
            <select
              value={formData.toCountry}
              onChange={(e) => setFormData({ ...formData, toCountry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CN">China</option>
              <option value="JP">Japan</option>
              {/* Add more countries */}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shipment Type
          </label>
          <select
            value={formData.shipmentType}
            onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Calculate Rate
        </button>
      </form>

      {rate !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Estimated Rate:</span>
            <span className="text-2xl font-bold text-blue-600">
              <DollarSign className="h-6 w-6 inline-block" />
              {rate.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}