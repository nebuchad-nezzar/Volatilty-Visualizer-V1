import React, { useState } from 'react';
import { Activity, Sliders } from 'lucide-react';
import { Surface4DPlot } from './Surface4DPlot';
import { Surface4DControls } from './Surface4DControls';
import { Surface4DStats } from './Surface4DStats';
import { calculate4DSurfaceData } from '../../utils/surface4DCalculations';

interface Surface4DSectionProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const Surface4DSection: React.FC<Surface4DSectionProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const [strikeRange, setStrikeRange] = useState({ min: 0.7, max: 1.3 });
  const [expiryRange, setExpiryRange] = useState({ min: 7, max: 180 });
  const [showHistoricalVol, setShowHistoricalVol] = useState(false);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');

  const surfaceData = calculate4DSurfaceData(spotPrice, riskFreeRate, strikeRange, expiryRange, optionType);

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Activity className="w-5 h-5" />
          4D Volatility Surface
        </h2>
      </div>

      <Surface4DControls
        strikeRange={strikeRange}
        setStrikeRange={setStrikeRange}
        expiryRange={expiryRange}
        setExpiryRange={setExpiryRange}
        showHistoricalVol={showHistoricalVol}
        setShowHistoricalVol={setShowHistoricalVol}
        optionType={optionType}
        setOptionType={setOptionType}
      />

      <Surface4DPlot data={surfaceData} showHistoricalVol={showHistoricalVol} />

      <Surface4DStats metrics={surfaceData.metrics} />
    </div>
  );
};