import React from 'react';
import { Line } from '@ant-design/plots';
import { calculateGreeks } from '../../utils/greeksCalculations';

interface GreeksSensitivityPlotProps {
  spotPrice: number;
  strikePrice: number;
  timeToExpiry: number;
  riskFreeRate: number;
  volatility: number;
  optionType: 'call' | 'put';
  greek: 'delta' | 'gamma' | 'vega' | 'theta' | 'rho';
}

export const GreeksSensitivityPlot: React.FC<GreeksSensitivityPlotProps> = ({
  spotPrice,
  strikePrice,
  timeToExpiry,
  riskFreeRate,
  volatility,
  optionType,
  greek
}) => {
  const generateData = () => {
    const priceRange = Array.from(
      { length: 50 },
      (_, i) => spotPrice * (0.5 + i * 0.02)
    );

    return priceRange.map(price => {
      const greeks = calculateGreeks(
        price,
        strikePrice,
        timeToExpiry,
        riskFreeRate,
        volatility,
        optionType
      );

      return {
        price,
        value: greeks[greek],
        type: greek.charAt(0).toUpperCase() + greek.slice(1)
      };
    });
  };

  const data = generateData();

  const config = {
    data,
    xField: 'price',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: false,
    color: '#22d3ee',
    xAxis: {
      title: { text: 'Underlying Price', style: { fill: '#ffffff' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#ffffff' } },
    },
    yAxis: {
      title: { text: greek.charAt(0).toUpperCase() + greek.slice(1), style: { fill: '#ffffff' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#ffffff' } },
    },
    tooltip: {
      showMarkers: true,
      domStyles: {
        'g2-tooltip': {
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '0.375rem',
          padding: '8px 12px',
          color: '#f3f4f6'
        }
      }
    },
    theme: {
      backgroundColor: 'transparent',
    },
  };

  return (
    <div className="h-[300px]">
      <Line {...config} />
    </div>
  );
};