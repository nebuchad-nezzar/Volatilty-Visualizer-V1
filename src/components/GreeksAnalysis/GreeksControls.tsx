import React from 'react';
import { Settings } from 'lucide-react';

interface GreeksControlsProps {
  strikePrice: number;
  setStrikePrice: (price: number) => void;
  volatility: number;
  setVolatility: (vol: number) => void;
  timeToExpiry: number;
  setTimeToExpiry: (time: number) => void;
  optionType: 'call' | 'put';
  setOptionType: (type: 'call' | 'put') => void;
  selectedGreek: string;
  setSelectedGreek: (greek: string) => void;
}

export const GreeksControls: React.FC<GreeksControlsProps> = ({
  strikePrice,
  setStrikePrice,
  volatility,
  setVolatility,
  timeToExpiry,
  setTimeToExpiry,
  optionType,
  setOptionType,
  selectedGreek,
  setSelectedGreek,
}) => {
  const greeks = ['delta', 'gamma', 'vega', 'theta', 'rho'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Strike Price
        </label>
        <input
          type="number"
          value={strikePrice}
          onChange={(e) => setStrikePrice(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="0"
          step="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Volatility (%)
        </label>
        <input
          type="number"
          value={volatility * 100}
          onChange={(e) => setVolatility(Number(e.target.value) / 100)}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="1"
          max="200"
          step="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Days to Expiry
        </label>
        <input
          type="number"
          value={timeToExpiry}
          onChange={(e) => setTimeToExpiry(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="1"
          max="365"
          step="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Option Type
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setOptionType('call')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              optionType === 'call'
                ? 'bg-call-color/20 text-call-color'
                : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80'
            }`}
          >
            Call
          </button>
          <button
            onClick={() => setOptionType('put')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              optionType === 'put'
                ? 'bg-put-color/20 text-put-color'
                : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80'
            }`}
          >
            Put
          </button>
        </div>
      </div>

      <div className="lg:col-span-4">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Greek to Display
        </label>
        <div className="flex flex-wrap gap-2">
          {greeks.map(greek => (
            <button
              key={greek}
              onClick={() => setSelectedGreek(greek)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGreek === greek
                  ? 'bg-accent-primary/20 text-accent-primary'
                  : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80'
              }`}
            >
              {greek.charAt(0).toUpperCase() + greek.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};