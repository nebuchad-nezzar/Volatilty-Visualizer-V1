import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { GreeksDisplay } from './GreeksDisplay';
import { GreeksSensitivityPlot } from './GreeksSensitivityPlot';
import { GreeksControls } from './GreeksControls';
import { calculateGreeks } from '../../utils/greeksCalculations';

interface GreeksAnalysisProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const GreeksAnalysis: React.FC<GreeksAnalysisProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const [strikePrice, setStrikePrice] = useState(spotPrice);
  const [volatility, setVolatility] = useState(0.2);
  const [timeToExpiry, setTimeToExpiry] = useState(30);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [selectedGreek, setSelectedGreek] = useState('delta');

  const greeks = calculateGreeks(
    spotPrice,
    strikePrice,
    timeToExpiry / 365,
    riskFreeRate,
    volatility,
    optionType
  );

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Activity className="w-5 h-5" />
          Greeks Analysis
        </h2>
      </div>

      <GreeksControls
        strikePrice={strikePrice}
        setStrikePrice={setStrikePrice}
        volatility={volatility}
        setVolatility={setVolatility}
        timeToExpiry={timeToExpiry}
        setTimeToExpiry={setTimeToExpiry}
        optionType={optionType}
        setOptionType={setOptionType}
        selectedGreek={selectedGreek}
        setSelectedGreek={setSelectedGreek}
      />

      <GreeksDisplay greeks={greeks} />

      <div className="bg-surface-lighter rounded-lg p-4">
        <h3 className="text-lg font-medium text-text-primary mb-4">
          {selectedGreek.charAt(0).toUpperCase() + selectedGreek.slice(1)} Sensitivity
        </h3>
        <GreeksSensitivityPlot
          spotPrice={spotPrice}
          strikePrice={strikePrice}
          timeToExpiry={timeToExpiry / 365}
          riskFreeRate={riskFreeRate}
          volatility={volatility}
          optionType={optionType}
          greek={selectedGreek as any}
        />
      </div>
    </div>
  );
};