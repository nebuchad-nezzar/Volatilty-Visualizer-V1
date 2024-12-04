import React from 'react';
import { calculateOptionsData } from '../utils/optionsCalculations';

interface OptionsTableProps {
  spotPrice: number;
  riskFreeRate: number;
  selectedExpiry: number;
}

export const OptionsTable: React.FC<OptionsTableProps> = ({
  spotPrice,
  riskFreeRate,
  selectedExpiry,
}) => {
  const data = calculateOptionsData(spotPrice, riskFreeRate, [selectedExpiry])
    .sort((a, b) => a.strike - b.strike);

  return (
    <div className="bg-surface-darker rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-surface-lighter">
        <thead className="bg-surface-lighter">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Strike</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Moneyness</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">IV (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Call Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Put Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-lighter">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-surface-darker' : 'bg-surface-lighter'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">${row.strike.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{row.moneyness.toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{(row.impliedVolatility * 100).toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-call-color">${row.callPrice.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-put-color">${row.putPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};