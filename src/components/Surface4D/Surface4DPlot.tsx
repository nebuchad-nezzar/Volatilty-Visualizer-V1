import React from 'react';
import Plot from 'react-plotly.js';
import { Surface4DData } from '../../types/surface4DTypes';

interface Surface4DPlotProps {
  data: Surface4DData;
  showHistoricalVol: boolean;
}

export const Surface4DPlot: React.FC<Surface4DPlotProps> = ({
  data,
  showHistoricalVol,
}) => {
  const plotData: any[] = [
    {
      type: 'surface',
      x: data.strikes,
      y: data.expiries,
      z: showHistoricalVol ? data.historicalVol : data.impliedVol,
      colorscale: 'Viridis',
      showscale: true,
      colorbar: {
        title: {
          text: showHistoricalVol ? 'Historical Vol (%)' : 'Implied Vol (%)',
          font: { color: '#f3f4f6' }
        },
        thickness: 20,
        len: 0.5,
        tickfont: { color: '#f3f4f6' }
      },
      opacity: 0.85,
    }
  ];

  return (
    <div className="w-full h-[600px] bg-surface-dark rounded-lg">
      <Plot
        data={plotData}
        layout={{
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          autosize: true,
          scene: {
            xaxis: {
              title: 'Strike Price',
              gridcolor: '#374151',
              tickfont: { color: '#f3f4f6' },
              titlefont: { color: '#f3f4f6' }
            },
            yaxis: {
              title: 'Days to Expiry',
              gridcolor: '#374151',
              tickfont: { color: '#f3f4f6' },
              titlefont: { color: '#f3f4f6' }
            },
            zaxis: {
              title: showHistoricalVol ? 'Historical Vol (%)' : 'Implied Vol (%)',
              gridcolor: '#374151',
              tickfont: { color: '#f3f4f6' },
              titlefont: { color: '#f3f4f6' }
            },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.5 },
            },
            bgcolor: 'transparent'
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 30,
          },
          showlegend: false,
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        className="plotly-dark"
      />
    </div>
  );
};