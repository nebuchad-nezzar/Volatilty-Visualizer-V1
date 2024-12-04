import React from 'react';
import { Column } from '@ant-design/plots';

interface PriceDistributionProps {
  finalPrices: number[];
  mean: number;
}

export const PriceDistribution: React.FC<PriceDistributionProps> = ({
  finalPrices,
  mean,
}) => {
  const getBinData = () => {
    const min = Math.min(...finalPrices);
    const max = Math.max(...finalPrices);
    const binCount = 30;
    const binSize = (max - min) / binCount;
    const bins = Array(binCount).fill(0);
    
    finalPrices.forEach(price => {
      const binIndex = Math.min(
        Math.floor((price - min) / binSize),
        binCount - 1
      );
      bins[binIndex]++;
    });

    return Array(binCount).fill(0).map((_, i) => ({
      price: Number((min + (i + 0.5) * binSize).toFixed(2)),
      count: bins[i],
    }));
  };

  const data = getBinData();

  const config = {
    data,
    xField: 'price',
    yField: 'count',
    color: '#22d3ee',
    columnStyle: {
      fillOpacity: 0.5,
      stroke: '#22d3ee',
      lineWidth: 1,
    },
    xAxis: {
      title: { text: 'Price', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    yAxis: {
      title: { text: 'Frequency', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    tooltip: {
      showMarkers: false,
    },
    theme: {
      backgroundColor: 'transparent',
    },
    animation: false,
  };

  return (
    <div className="bg-surface-darker rounded-lg p-4">
      <h3 className="text-lg font-medium text-text-primary mb-4">Final Price Distribution</h3>
      <Column {...config} />
    </div>
  );
};