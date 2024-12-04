import React from 'react';
import { ArrowUp, ArrowDown, Target, Activity } from 'lucide-react';
import { SkewMetrics } from '../../types/skewTypes';

interface SkewStatisticsProps {
  metrics: SkewMetrics;
}

export const SkewStatistics: React.FC<SkewStatisticsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Max Skew</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.maxSkew * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Highest IV point
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Min Skew</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.minSkew * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Lowest IV point
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
          OTM/ATM ratio
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Risk Reversal</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {metrics.riskReversalValue.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Market sentiment
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">ATM IV</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(metrics.atmIV * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          At-the-money IV
        </p>
      </div>
    </div>
  );
};