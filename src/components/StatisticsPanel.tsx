import React from 'react';
import { ArrowUp, ArrowDown, Target, DollarSign } from 'lucide-react';
import { SimulationStatistics } from '../types/monteCarloTypes';

interface StatisticsPanelProps {
  statistics: SimulationStatistics;
  breachPrice: number;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  statistics,
  breachPrice,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Mean Final Price</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          ${statistics.meanFinalPrice.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Expected price at expiry
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Standard Deviation</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          ${statistics.standardDeviation.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Price volatility measure
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Breach Probability</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(statistics.breachProbability * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Probability of reaching ${breachPrice}
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Value at Risk (95%)</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          ${statistics.valueAtRisk.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Potential downside risk
        </p>
      </div>
    </div>
  );
};