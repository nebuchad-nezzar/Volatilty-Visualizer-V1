import React from 'react';
import { ArrowUp, ArrowDown, Target, DollarSign } from 'lucide-react';
import { calculateMaxDrawdown, calculateTailRiskProbability } from '../../utils/statisticsUtils';

interface RiskMetricsProps {
  finalPrices: number[];
  mean: number;
  standardDeviation: number;
  valueAtRisk: number;
  breachPrice: number;
  breachProbability: number;
}

export const RiskMetrics: React.FC<RiskMetricsProps> = ({
  finalPrices,
  mean,
  standardDeviation,
  valueAtRisk,
  breachPrice,
  breachProbability,
}) => {
  const maxDrawdown = calculateMaxDrawdown(finalPrices);
  const tailRisk = calculateTailRiskProbability(finalPrices, mean - 2 * standardDeviation);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Mean Final Price</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          ${mean.toFixed(2)}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Expected price at expiry
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUp className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Max Drawdown</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(maxDrawdown * 100).toFixed(2)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Largest price decline
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Tail Risk</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(tailRisk * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Probability of extreme loss
        </p>
      </div>

      <div className="bg-surface-lighter rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowDown className="w-5 h-5 text-accent-primary" />
          <h3 className="text-sm font-medium text-text-secondary">Breach Probability</h3>
        </div>
        <p className="text-2xl font-bold text-text-primary">
          {(breachProbability * 100).toFixed(1)}%
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Probability of reaching ${breachPrice}
        </p>
      </div>
    </div>
  );
};