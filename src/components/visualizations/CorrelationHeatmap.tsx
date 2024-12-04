import React from 'react';
import Plot from 'react-plotly.js';

interface CorrelationHeatmapProps {
  data: number[][];
  labels: string[];
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({
  data,
  labels,
}) => {
  return (
    <div className="w-full h-[600px] bg-surface-darker rounded-lg p-4">
      <Plot
        data={[
          {
            type: 'heatmap',
            z: data,
            x: labels,
            y: labels,
            colorscale: 'Viridis',
            showscale: true,
            hoverongaps: false,
          },
        ]}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          title: {
            text: 'Correlation Heatmap',
            font: { color: '#f3f4f6' }
          },
          xaxis: {
            tickfont: { color: '#9ca3af' },
            gridcolor: '#374151'
          },
          yaxis: {
            tickfont: { color: '#9ca3af' },
            gridcolor: '#374151'
          },
          margin: { t: 50, r: 50, b: 50, l: 50 },
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        className="plotly-dark"
      />
    </div>
  );
};