import React from 'react';
import { Play, Loader2 } from 'lucide-react';

interface MonteCarloInputsProps {
  numSimulations: number;
  setNumSimulations: (value: number) => void;
  timeSteps: number;
  setTimeSteps: (value: number) => void;
  drift: number;
  setDrift: (value: number) => void;
  volatility: number;
  setVolatility: (value: number) => void;
  breachPrice: number;
  setBreachPrice: (value: number) => void;
  onSimulate: () => void;
  isCalculating: boolean;
}

export const MonteCarloInputs: React.FC<MonteCarloInputsProps> = ({
  numSimulations,
  setNumSimulations,
  timeSteps,
  setTimeSteps,
  drift,
  setDrift,
  volatility,
  setVolatility,
  breachPrice,
  setBreachPrice,
  onSimulate,
  isCalculating,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Simulations
        </label>
        <input
          type="number"
          value={numSimulations}
          onChange={(e) => setNumSimulations(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="100"
          max="10000"
          step="100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Time Steps
        </label>
        <input
          type="number"
          value={timeSteps}
          onChange={(e) => setTimeSteps(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="50"
          max="1000"
          step="1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Drift (%)
        </label>
        <input
          type="number"
          value={drift * 100}
          onChange={(e) => setDrift(Number(e.target.value) / 100)}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="-100"
          max="100"
          step="0.1"
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
          step="0.1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Breach Price ($)
        </label>
        <input
          type="number"
          value={breachPrice}
          onChange={(e) => setBreachPrice(Number(e.target.value))}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
          min="0"
          step="0.01"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={onSimulate}
          disabled={isCalculating}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-primary/90 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-darker disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Simulate
            </>
          )}
        </button>
      </div>
    </div>
  );
};