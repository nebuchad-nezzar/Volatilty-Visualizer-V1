import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateVolatilitySmile } from '../utils/volatilityCalculations';

interface VolatilityChartProps {
  spotPrice: number;
  riskFreeRate: number;
  timeToExpiry: number;
}

export const VolatilityChart: React.FC<VolatilityChartProps> = ({
  spotPrice,
  riskFreeRate,
  timeToExpiry,
}) => {
  const data = calculateVolatilitySmile(spotPrice, riskFreeRate, timeToExpiry);

  return (
    <div className="w-full h-[400px] bg-surface-darker rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="strike" 
            label={{ value: 'Strike Price', position: 'bottom', fill: '#9ca3af' }}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            label={{ value: 'Implied Volatility', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.375rem',
            }}
            labelStyle={{ color: '#f3f4f6' }}
            itemStyle={{ color: '#22d3ee' }}
          />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Line
            type="monotone"
            dataKey="impliedVolatility"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={false}
            name="Implied Volatility"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};