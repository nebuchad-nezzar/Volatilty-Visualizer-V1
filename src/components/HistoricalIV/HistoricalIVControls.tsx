import React from 'react';
import { Settings } from 'lucide-react';

interface HistoricalIVControlsProps {
  timeFrame: number;
  setTimeFrame: (days: number) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  dataSource: string;
  setDataSource: (source: string) => void;
}

export const HistoricalIVControls: React.FC<HistoricalIVControlsProps> = ({
  timeFrame,
  setTimeFrame,
  showComparison,
  setShowComparison,
  dataSource,
  setDataSource,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Time Frame
        </label>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
        >
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
          <option value={180}>180 Days</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Data Source
        </label>
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
        >
          <option value="yahoo">Yahoo Finance</option>
          <option value="iex" disabled>IEX Cloud (Premium)</option>
          <option value="polygon" disabled>Polygon.io (Premium)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Show Comparison
        </label>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className={`w-full px-4 py-2 rounded-md transition-colors ${
            showComparison
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80'
          }`}
        >
          {showComparison ? 'Hide HV Comparison' : 'Show HV Comparison'}
        </button>
      </div>
    </div>
  );
};