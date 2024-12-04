import React from 'react';
import { Settings } from 'lucide-react';

interface SkewControlsProps {
  selectedExpiry: number;
  setSelectedExpiry: (expiry: number) => void;
  strikeRange: { min: number; max: number };
  setStrikeRange: (range: { min: number; max: number }) => void;
}

export const SkewControls: React.FC<SkewControlsProps> = ({
  selectedExpiry,
  setSelectedExpiry,
  strikeRange,
  setStrikeRange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Days to Expiry
        </label>
        <select
          value={selectedExpiry}
          onChange={(e) => setSelectedExpiry(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
        >
          {[30, 60, 90, 120, 150, 180].map((days) => (
            <option key={days} value={days}>
              {days} days
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Min Strike (% of Spot)
        </label>
        <input
          type="number"
          value={strikeRange.min * 100}
          onChange={(e) => setStrikeRange({ ...strikeRange, min: Number(e.target.value) / 100 })}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="50"
          max="100"
          step="5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Max Strike (% of Spot)
        </label>
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
  );
};