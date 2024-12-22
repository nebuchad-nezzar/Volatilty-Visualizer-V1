import React from 'react';
import { Activity, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

interface GreeksDisplayProps {
  greeks: {
    delta: number;
    gamma: number;
    vega: number;
    theta: number;
    rho: number;
    charm: number;
    vanna: number;
    volga: number;
  };
}

export const GreeksDisplay: React.FC<GreeksDisplayProps> = ({ greeks }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Delta</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.delta.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Price sensitivity
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Gamma</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.gamma.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Delta sensitivity
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Vega</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.vega.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Volatility sensitivity
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Theta</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.theta.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Time decay (daily)
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Rho</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.rho.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Rate sensitivity
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Charm</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.charm.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Delta decay
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Vanna</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.vanna.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Delta-Vol sensitivity
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Volga</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {greeks.volga.toFixed(4)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Vega convexity
        </p>
      </div>
    </div>
  );
};