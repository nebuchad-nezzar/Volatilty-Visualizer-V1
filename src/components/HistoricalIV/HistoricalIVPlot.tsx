import React from 'react';
import { Line } from '@ant-design/plots';
import { HistoricalIVData } from '../../types/historicalIVTypes';

interface HistoricalIVPlotProps {
  data: HistoricalIVData;
  showComparison: boolean;
}

export const HistoricalIVPlot: React.FC<HistoricalIVPlotProps> = ({
  data,
  showComparison,
}) => {
  const plotData = showComparison
    ? [
        ...data.impliedVolatility.map(point => ({
          ...point,
          type: 'Implied Volatility'
        })),
        ...data.historicalVolatility.map(point => ({
          ...point,
          type: 'Historical Volatility'
        }))
      ]
    : data.impliedVolatility.map(point => ({
        ...point,
        type: 'Implied Volatility'
      }));

  const config = {
    data: plotData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: false,
    color: ['#22d3ee', '#818cf8'],
    xAxis: {
      title: { text: 'Date', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    yAxis: {
      title: { text: 'Volatility (%)', style: { fill: '#9ca3af' } },
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
      }
    },
    theme: {
      backgroundColor: 'transparent',
    },
    legend: {
      position: 'top-right',
      itemName: {
        style: {
          fill: '#9ca3af'
        }
      }
    },
  };

  return (
    <div className="h-[400px]">
      <Line {...config} />
    </div>
  );
};