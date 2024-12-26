import React from 'react';
import { Line } from '@ant-design/plots';

interface SimulationPathsProps {
  paths: number[][];
  confidenceBounds: {
    upper: number[];
    lower: number[];
  };
  timeSteps: number;
}

export const SimulationPaths: React.FC<SimulationPathsProps> = ({
  paths,
  confidenceBounds,
  timeSteps,
}) => {
  const displayedPaths = paths.slice(0, 50); // Show only first 50 paths
  
  const data = [
    ...displayedPaths.flatMap((path, pathIndex) =>
      path.map((value, step) => ({
        timeStep: step,
        price: value,
        type: `Path ${pathIndex + 1}`,
        category: 'path',
        pathIndex
      }))
    ),
    ...confidenceBounds.upper.map((value, step) => ({
      timeStep: step,
      price: value,
      type: 'Confidence Bound (95%)',
      category: 'bound'
    })),
    ...confidenceBounds.lower.map((value, step) => ({
      timeStep: step,
      price: value,
      type: 'Confidence Bound (95%)',
      category: 'bound'
    }))
  ];

  const config = {
    data,
    xField: 'timeStep',
    yField: 'price',
    seriesField: 'type',
    color: (datum: any) => {
      if (datum.category === 'bound') {
        return 'rgba(253, 253, 253, 0.7)';
      }
      return `rgba(34, 211, 238, ${datum.pathIndex === 0 ? 0.8 : 0.1})`;
    },
    lineStyle: (datum: any) => ({
      lineWidth: datum.category === 'bound' ? 2 : 1,
      opacity: datum.category === 'bound' ? 1 : 0.4,
    }),
    smooth: true,
    animation: false,
    xAxis: {
      title: { text: 'Time Steps', style: { fill: '#f3f4f6' } },
      grid: { line: { style: { stroke: '##f3f4f6' } } },
      label: { style: { fill: '#9ca3af' } },
    },
    yAxis: {
      title: { text: 'Price', style: { fill: '#f3f4f6' } },
      grid: { line: { style: { stroke: '#eeeeee' } } },
      label: { style: { fill: '##f3f4f6' } },
    },
    tooltip: {
      showMarkers: true,
      domStyles: {
        'g2-tooltip': {
          backgroundColor: '#f3f4f6',
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
          fill: '#f3f4f6'
        }
      }
    },
  };

  return (
    <div className="bg-surface-darker rounded-lg p-4">
      <h3 className="text-lg font-medium text-text-primary mb-4">Price Path Simulations</h3>
      <div className="h-[400px]">
        <Line {...config} />
      </div>
    </div>
  );
};