import React, { useState, useEffect, useCallback } from 'react';
import Plot from 'react-plotly.js';
import { Download, RefreshCw } from 'lucide-react';
import { calculateOptionsData } from '../utils/optionsCalculations';
import { exportToCsv, exportToHtml } from '../utils/exportUtils';
import { ColorScheme, VisualizationControls } from './VisualizationControls';

interface Surface3DProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const Surface3D: React.FC<Surface3DProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const [showCalls, setShowCalls] = useState(true);
  const [showPuts, setShowPuts] = useState(true);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('plasma');
  const [dataPoints, setDataPoints] = useState(50);
  const [minDays, setMinDays] = useState(30);
  const [maxDays, setMaxDays] = useState(180);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const daysToExpiryArray = Array.from(
    { length: Math.ceil((maxDays - minDays) / 30) + 1 },
    (_, i) => minDays + i * 30
  );

  const updateData = useCallback(() => {
    setIsLoading(true);
    const data = calculateOptionsData(spotPrice, riskFreeRate, daysToExpiryArray);
    setIsLoading(false);
    setLastUpdate(new Date());
    return data;
  }, [spotPrice, riskFreeRate, daysToExpiryArray]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [updateData]);

  const data = calculateOptionsData(spotPrice, riskFreeRate, daysToExpiryArray);

  // Prepare data for 3D surface
  const x = Array.from(new Set(data.map(d => d.moneyness))).sort((a, b) => a - b);
  const y = Array.from(new Set(data.map(d => d.daysToExpiry))).sort((a, b) => a - b);
  const z = Array(y.length).fill(0).map(() => Array(x.length).fill(0));

  // Fill z matrix with implied volatilities
  data.forEach(d => {
    const xIndex = x.indexOf(d.moneyness);
    const yIndex = y.indexOf(d.daysToExpiry);
    if (xIndex !== -1 && yIndex !== -1) {
      z[yIndex][xIndex] = d.impliedVolatility * 100;
    }
  });

  const plotData: any[] = [
    {
      type: 'surface',
      x: x,
      y: y,
      z: z,
      colorscale: colorScheme,
      showscale: true,
      colorbar: {
        title: {
          text: 'IV (%)',
          font: { color: '#f3f4f6' }
        },
        thickness: 20,
        len: 0.5,
        tickfont: { color: '#f3f4f6' }
      },
      opacity: 0.85,
    },
  ];

  if (showCalls) {
    plotData.push({
      type: 'scatter3d',
      x: data.map(d => d.moneyness),
      y: data.map(d => d.daysToExpiry),
      z: data.map(d => d.impliedVolatility * 100),
      mode: 'markers',
      marker: {
        size: 4,
        color: '#22c55e',
        opacity: 0.7,
      },
      name: 'Calls',
    });
  }

  if (showPuts) {
    plotData.push({
      type: 'scatter3d',
      x: data.map(d => d.moneyness),
      y: data.map(d => d.daysToExpiry),
      z: data.map(d => d.impliedVolatility * 100),
      mode: 'markers',
      marker: {
        size: 4,
        color: '#ef4444',
        opacity: 0.7,
      },
      name: 'Puts',
    });
  }

  const handleExportCsv = () => {
    exportToCsv(data, 'volatility_surface_data.csv');
  };

  const handleExportHtml = () => {
    exportToHtml(plotData, 'volatility_surface.html');
  };

  return (
    <div className="space-y-4 bg-surface-darker rounded-lg p-6">
      <div className="flex justify-between items-center">
        <VisualizationControls
          showCalls={showCalls}
          setShowCalls={setShowCalls}
          showPuts={showPuts}
          setShowPuts={setShowPuts}
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          dataPoints={dataPoints}
          setDataPoints={setDataPoints}
          minDays={minDays}
          setMinDays={setMinDays}
          maxDays={maxDays}
          setMaxDays={setMaxDays}
        />
        <div className="flex items-center gap-4">
          <button
            onClick={updateData}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-primary border border-accent-primary/20 rounded-md hover:bg-accent-primary/10 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-secondary border border-accent-secondary/20 rounded-md hover:bg-accent-secondary/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleExportHtml}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-secondary border border-accent-secondary/20 rounded-md hover:bg-accent-secondary/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[600px] bg-surface-dark rounded-lg">
        <Plot
          data={plotData}
          layout={{
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            title: {
              text: '3D Volatility Surface',
              font: { color: '#f3f4f6' }
            },
            autosize: true,
            scene: {
              xaxis: {
                title: 'Log Moneyness (%)',
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
                title: 'Implied Volatility (%)',
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
            showlegend: true,
            legend: {
              font: { color: '#f3f4f6' },
              bgcolor: 'transparent'
            }
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          className="plotly-dark"
        />
      </div>

      <div className="text-sm text-gray-400 text-right">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
};