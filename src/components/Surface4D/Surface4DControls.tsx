import React from 'react';
import { Settings } from 'lucide-react';

interface Surface4DControlsProps {
  strikeRange: { min: number; max: number };
  setStrikeRange: (range: { min: number; max: number }) => void;
  expiryRange: { min: number; max: number };
  setExpiryRange: (range: { min: number; max: number }) => void;
  showHistoricalVol: boolean;
  setShowHistoricalVol: (show: boolean) => void;
  optionType: 'call' | 'put';
  setOptionType: (type: 'call' | 'put') => void;
}

export const Surface4DControls: React.FC<Surface4DControlsProps> = ({
  strikeRange,
  setStrikeRange,
  expiryRange,
  setExpiryRange,
  showHistoricalVol,
  setShowHistoricalVol,
  optionType,
  setOptionType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Strike Range (% of Spot)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={strikeRange.min * 100}
            onChange={(e) => setStrikeRange({ ...strikeRange, min: Number(e.target.value) / 100 })}
            className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            min="50"
            max="100"
            step="5"
          />
          <span className="text-text-secondary self-center">to</span>
          <input
            type="number"
            value={strikeRange.max * 100}
            onChange={(e) => setStrikeRange({ ...strikeRange, max: Number(e.target.value) / 100 })}
            className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            min="100"
            max="150"
            step="5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Expiry Range (Days)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={expiryRange.min}
            onChange={(e) => setExpiryRange({ ...expiryRange, min: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            min="1"
            max="30"
            step="1"
          />
          <span className="text-text-secondary self-center">to</span>
          <input
            type="number"
            value={expiryRange.max}
            onChange={(e) => setExpiryRange({ ...expiryRange, max: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
            min="30"
            max="365"
            step="30"
          />
        </div>
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

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Volatility Type
        </label>
        <button
          onClick={() => setShowHistoricalVol(!showHistoricalVol)}
          className={`w-full px-4 py-2 rounded-md transition-colors ${
            showHistoricalVol
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80'
          }`}
        >
          {showHistoricalVol ? 'Show Historical Vol' : 'Show Implied Vol'}
        </button>
      </div>
    </div>
  );
};