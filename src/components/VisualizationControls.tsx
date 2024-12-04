import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type ColorScheme =  'viridis' |'plasma' | 'magma' | 'inferno';

interface VisualizationControlsProps {
  showCalls: boolean;
  setShowCalls: (show: boolean) => void;
  showPuts: boolean;
  setShowPuts: (show: boolean) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  dataPoints: number;
  setDataPoints: (points: number) => void;
  minDays: number;
  setMinDays: (days: number) => void;
  maxDays: number;
  setMaxDays: (days: number) => void;
}

export const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  showCalls,
  setShowCalls,
  showPuts,
  setShowPuts,
  colorScheme,
  setColorScheme,
  dataPoints,
  setDataPoints,
  minDays,
  setMinDays,
  maxDays,
  setMaxDays,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCalls(!showCalls)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            showCalls
              ? 'bg-green-500/20 text-green-400'
              : 'bg-surface-lighter text-gray-400 hover:bg-surface-lighter/80'
          }`}
        >
          {showCalls ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          Calls
        </button>
        <button
          onClick={() => setShowPuts(!showPuts)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            showPuts
              ? 'bg-red-500/20 text-red-400'
              : 'bg-surface-lighter text-gray-400 hover:bg-surface-lighter/80'
          }`}
        >
          {showPuts ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          Puts
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-300">Color Scheme:</label>
        <select
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
          className="text-sm bg-surface-lighter text-gray-200 border-gray-700 rounded-md focus:ring-accent-primary focus:border-accent-primary"
        >
          <option value="plasma">Plasma</option>
          <option value="viridis">Viridis</option>
          <option value="magma">Magma</option>
          <option value="inferno">Inferno</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-300">Data Points:</label>
        <input
          type="number"
          value={dataPoints}
          onChange={(e) => setDataPoints(Number(e.target.value))}
          min="10"
          max="100"
          className="w-20 text-sm bg-surface-lighter text-gray-200 border-gray-700 rounded-md focus:ring-accent-primary focus:border-accent-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-300">Days Range:</label>
        <input
          type="number"
          value={minDays}
          onChange={(e) => setMinDays(Number(e.target.value))}
          min="1"
          max={maxDays - 30}
          className="w-20 text-sm bg-surface-lighter text-gray-200 border-gray-700 rounded-md focus:ring-accent-primary focus:border-accent-primary"
        />
        <span className="text-gray-500">to</span>
        <input
          type="number"
          value={maxDays}
          onChange={(e) => setMaxDays(Number(e.target.value))}
          min={minDays + 30}
          max="365"
          className="w-20 text-sm bg-surface-lighter text-gray-200 border-gray-700 rounded-md focus:ring-accent-primary focus:border-accent-primary"
        />
      </div>
    </div>
  );
};