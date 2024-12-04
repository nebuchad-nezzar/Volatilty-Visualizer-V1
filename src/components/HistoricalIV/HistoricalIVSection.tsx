import React, { useState } from 'react';
import { Activity, Calendar } from 'lucide-react';
import { HistoricalIVPlot } from './HistoricalIVPlot';
import { HistoricalIVControls } from './HistoricalIVControls';
import { HistoricalIVStats } from './HistoricalIVStats';
import { calculateHistoricalIVData } from '../../utils/historicalIVCalculations';

interface HistoricalIVSectionProps {
  spotPrice: number;
  riskFreeRate: number;
}

export const HistoricalIVSection: React.FC<HistoricalIVSectionProps> = ({
  spotPrice,
  riskFreeRate,
}) => {
  const [timeFrame, setTimeFrame] = useState(30);
  const [showComparison, setShowComparison] = useState(false);
  const [dataSource, setDataSource] = useState('yahoo');

  const historicalData = calculateHistoricalIVData(spotPrice, riskFreeRate, timeFrame);

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Calendar className="w-5 h-5" />
          Historical IV Analysis
        </h2>
      </div>

      <HistoricalIVControls
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        showComparison={showComparison}
        setShowComparison={setShowComparison}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />

      <HistoricalIVPlot data={historicalData} showComparison={showComparison} />

      <HistoricalIVStats metrics={historicalData.metrics} />
    </div>
  );
};