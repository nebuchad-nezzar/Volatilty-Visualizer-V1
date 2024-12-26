import React from 'react';
import { Line } from '@ant-design/plots';
import { VIXHistoricalData } from '../../types/vixTypes';

interface VIXChartProps {
  data: VIXHistoricalData[];
}

export const VIXChart: React.FC<VIXChartProps> = ({ data }) => {
  const config = {
    data: data.map(point => ({
      date: point.date,
      value: point.close,
      type: 'VIX'
    })),
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: false,
    color: '#f472b6',
    xAxis: {
      title: { text: 'Date', style: { fill: '#ffffff' } },
      grid: { line: { style: { stroke: '#374151' } } },
      label: { style: { fill: '#ffffff' } },
    },
    yAxis: {
      title: { text: 'VIX', style: { fill: '#ffffff' } },
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
    <div className="h-[400px]">
      <Line {...config} />
    </div>
  );
};