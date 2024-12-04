import React from 'react';
import { ArrowUp, ArrowDown, Target, Activity } from 'lucide-react';
import { Surface4DMetrics } from '../../types/surface4DTypes';

interface Surface4DStatsProps {
  metrics: Surface4DMetrics;
}

export const Surface4DStats: React.FC<Surface4DStatsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Max IV</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.maxIV * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Highest volatility point
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Min IV</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.minIV * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Lowest volatility point
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Skew Ratio</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {metrics.skewRatio.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          ITM/OTM volatility ratio
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">ATM IV</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.atmIV * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          At-the-money volatility
        </p>
      </div>
    </div>
  );
};