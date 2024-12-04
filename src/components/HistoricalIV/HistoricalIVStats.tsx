import React from 'react';
import { ArrowUp, ArrowDown, Target, Activity } from 'lucide-react';
import { HistoricalIVMetrics } from '../../types/historicalIVTypes';

interface HistoricalIVStatsProps {
  metrics: HistoricalIVMetrics;
}

export const HistoricalIVStats: React.FC<HistoricalIVStatsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Current IV</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.currentIV * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Latest implied volatility
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">IV Percentile</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {metrics.ivPercentile.toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Historical IV rank
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">HV (30 Days)</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.historicalVol30 * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          30-day historical vol
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">IV-HV Spread</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.ivHvSpread * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Volatility premium
        </p>
      </div>
    </div>
  );
};