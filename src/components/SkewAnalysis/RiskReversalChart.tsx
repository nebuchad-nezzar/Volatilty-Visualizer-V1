import React from 'react';
import { Line } from '@ant-design/plots';
import { RiskReversalPoint } from '../../types/skewTypes';

interface RiskReversalChartProps {
  data: RiskReversalPoint[];
}

export const RiskReversalChart: React.FC<RiskReversalChartProps> = ({ data }) => {
  const config = {
    data: data.map(point => ({
      strike: point.strike,
      value: point.spread,
      category: 'Risk Reversal'
    })),
    xField: 'strike',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    color: '#818cf8',
    lineStyle: {
      lineWidth: 2,
    },
    xAxis: {
      title: { text: 'Strike Price', style: { fill: '#9ca3af' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    yAxis: {
      title: { text: 'Call-Put Spread', style: { fill: '#9ca3af' } },
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
    animation: false,
  };

  return <Line {...config} />;
};