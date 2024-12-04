import React, { useState, useMemo } from 'react';
import { Area, Column } from '@ant-design/plots';
import { calculateKDE, calculateExpectedShortfall } from '../../utils/statisticsUtils';
import { Eye, EyeOff } from 'lucide-react';

interface DistributionVisualizationProps {
  finalPrices: number[];
  mean: number;
  confidenceLevel: number;
  valueAtRisk: number;
}

export const DistributionVisualization: React.FC<DistributionVisualizationProps> = ({
  finalPrices,
  mean,
  confidenceLevel,
  valueAtRisk,
}) => {
  const [showKDE, setShowKDE] = useState(true);
  const [showHistogram, setShowHistogram] = useState(true);

  const { kdeData, histogramData, varThreshold, expectedShortfall } = useMemo(() => {
    const sortedPrices = [...finalPrices].sort((a, b) => a - b);
    const kde = calculateKDE(sortedPrices);
    const varIndex = Math.floor(sortedPrices.length * (1 - confidenceLevel));
    const es = calculateExpectedShortfall(sortedPrices, confidenceLevel);
    
    return {
      kdeData: kde.map(([x, y]) => ({ price: x, density: y, type: 'PDF' })),
      histogramData: getBinData(finalPrices).map(bin => ({ 
        ...bin, 
        density: bin.count / finalPrices.length,
        type: 'Histogram'
      })),
      varThreshold: sortedPrices[varIndex],
      expectedShortfall: es
    };
  }, [finalPrices, confidenceLevel]);

  const data = [
    ...(showHistogram ? histogramData : []),
    ...(showKDE ? kdeData : [])
  ];

  const config = {
    data,
    xField: 'price',
    yField: 'density',
    seriesField: 'type',
    color: ['rgba(129, 140, 248, 0.3)', '#22d3ee'],
    annotations: [
      {
        type: 'line',
        start: [mean, 0],
        end: [mean, 'max'],
        style: {
          stroke: '#22c55e',
          lineDash: [4, 4],
        },
      },
      {
        type: 'line',
        start: [varThreshold, 0],
        end: [varThreshold, 'max'],
        style: {
          stroke: '#ef4444',
          lineDash: [4, 4],
        },
      },
      {
        type: 'region',
        start: [Number.NEGATIVE_INFINITY, 0],
        end: [varThreshold, 'max'],
        style: {
          fill: '#ef4444',
          fillOpacity: 0.1,
        },
      },
    ],
    geometryOptions: [
      {
        geometry: 'column',
        columnWidthRatio: 0.8,
        color: 'rgba(129, 140, 248, 0.3)',
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#22d3ee',
      },
    ],
    xAxis: {
      title: { text: 'Price', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    yAxis: {
      title: { text: 'Density', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
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
      },
      formatter: (datum: any) => ({
        name: datum.type,
        value: datum.type === 'PDF' ? 
          `Probability: ${(datum.density * 100).toFixed(2)}%` :
          `Count: ${(datum.density * finalPrices.length).toFixed(0)}`
      })
    },
    theme: {
      backgroundColor: 'transparent',
    },
    animation: false,
  };

  return (
    <div className="bg-surface-darker rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">Price Distribution</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistogram(!showHistogram)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              showHistogram
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'bg-surface-lighter text-gray-400 hover:bg-surface-lighter/80'
            }`}
          >
            {showHistogram ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            Histogram
          </button>
          <button
            onClick={() => setShowKDE(!showKDE)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              showKDE
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-surface-lighter text-gray-400 hover:bg-surface-lighter/80'
            }`}
          >
            {showKDE ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            KDE
          </button>
        </div>
      </div>
      <div className="h-[400px]">
        <Area {...config} />
      </div>
      <div className="mt-4 space-y-2 text-sm text-text-secondary">
        <p>
          At {(confidenceLevel * 100).toFixed(0)}% confidence, the Value-at-Risk is ${valueAtRisk.toFixed(2)}
        </p>
        <p>
          Expected Shortfall in the worst {((1 - confidenceLevel) * 100).toFixed(0)}% of scenarios is ${expectedShortfall.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const getBinData = (prices: number[]) => {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const binCount = 30;
  const binSize = (max - min) / binCount;
  const bins = Array(binCount).fill(0);
  
  prices.forEach(price => {
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