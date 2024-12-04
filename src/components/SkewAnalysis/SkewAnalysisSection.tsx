import React, { useState } from 'react';
import { Activity, ArrowUpDown, Triangle } from 'lucide-react';
import { SkewChart } from './SkewChart';
import { RiskReversalChart } from './RiskReversalChart';
import { ButterflyChart } from './ButterflyChart';
import { SkewStatistics } from './SkewStatistics';
import { SkewControls } from './SkewControls';
import { calculateSkewMetrics } from '../../utils/skewCalculations';
import { SkewData } from '../../types/skewTypes';

interface SkewAnalysisSectionProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const SkewAnalysisSection: React.FC<SkewAnalysisSectionProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const [selectedExpiry, setSelectedExpiry] = useState(30);
  const [strikeRange, setStrikeRange] = useState({ min: 0.7, max: 1.3 });
  const [activeChart, setActiveChart] = useState<'skew' | 'risk-reversal' | 'butterfly'>('skew');

  const skewData: SkewData = calculateSkewMetrics(spotPrice, riskFreeRate, selectedExpiry, strikeRange);

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Activity className="w-5 h-5" />
          Volatility Skew Analysis
        </h2>
      </div>

      <SkewControls
        selectedExpiry={selectedExpiry}
        setSelectedExpiry={setSelectedExpiry}
        strikeRange={strikeRange}
        setStrikeRange={setStrikeRange}
      />

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveChart('skew')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeChart === 'skew'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:bg-surface-lighter'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          IV Skew
        </button>
        <button
          onClick={() => setActiveChart('risk-reversal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeChart === 'risk-reversal'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:bg-surface-lighter'
          }`}
        >
          <Triangle className="w-4 h-4" />
          Risk Reversal
        </button>
        <button
          onClick={() => setActiveChart('butterfly')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeChart === 'butterfly'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'text-text-secondary hover:bg-surface-lighter'
          }`}
        >
          <Triangle className="w-4 h-4 rotate-180" />
          Butterfly
        </button>
      </div>

      <div className="h-[400px]">
        {activeChart === 'skew' && <SkewChart data={skewData.skewPoints} />}
        {activeChart === 'risk-reversal' && <RiskReversalChart data={skewData.riskReversalPoints} />}
        {activeChart === 'butterfly' && <ButterflyChart data={skewData.butterflyPoints} />}
      </div>

      <SkewStatistics metrics={skewData.metrics} />
    </div>
  );
};