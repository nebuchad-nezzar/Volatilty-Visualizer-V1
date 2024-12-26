import React from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { VIXData, VIXImpactMetrics } from '../../types/vixTypes';

interface VIXDisplayProps {
  vixData: VIXData | null;
  vixImpact: VIXImpactMetrics | null;
  isLoading: boolean;
}

export const VIXDisplay: React.FC<VIXDisplayProps> = ({
  vixData,
  vixImpact,
  isLoading
}) => {
  if (isLoading || !vixData || !vixImpact) {
    return (
      <div className="animate-pulse bg-surface-lighter rounded-lg p-4">
        <div className="h-24 bg-surface-dark rounded" />
      </div>
    );
  }

  const getMarketRegimeColor = (regime: string) => {
    switch (regime) {
      case 'low': return 'text-green-400';
      case 'normal': return 'text-blue-400';
      case 'high': return 'text-yellow-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-text-primary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Current VIX</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-text-primary">
            {vixData.value.toFixed(2)}
          </p>
          <span className={`text-sm ${vixData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {vixData.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {vixData.percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Market Regime</h3>
        </div>
        <p className={`text-2xl font-bold ${getMarketRegimeColor(vixImpact.marketRegime)}`}>
          {vixImpact.marketRegime.charAt(0).toUpperCase() + vixImpact.marketRegime.slice(1)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Volatility regime
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Historical Percentile</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {vixImpact.historicalPercentile.toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          VIX percentile rank
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">IV Correlation</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(vixImpact.impliedVolCorrelation * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          VIX-IV correlation
        </p>
      </div>
    </div>
  );
};