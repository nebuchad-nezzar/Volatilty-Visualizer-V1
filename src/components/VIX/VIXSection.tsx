import React from 'react';
import { Activity } from 'lucide-react';
import { useVIXData } from '../../hooks/useVIXData';
import { VIXDisplay } from './VIXDisplay';
import { VIXChart } from './VIXChart';
import { vixService } from '../../services/vixService';

export const VIXSection: React.FC = () => {
  const { currentVIX, vixImpact, isLoading, error } = useVIXData();
  const [historicalData, setHistoricalData] = React.useState([]);

  React.useEffect(() => {
    const fetchHistorical = async () => {
      const data = await vixService.getHistoricalVIX(180);
      setHistoricalData(data);
    };
    fetchHistorical();
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
        Error loading VIX data
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Activity className="w-5 h-5" />
          VIX Analysis
        </h2>
      </div>

      <VIXDisplay
        vixData={currentVIX}
        vixImpact={vixImpact}
        isLoading={isLoading}
      />

      {historicalData.length > 0 && (
        <div className="bg-surface-lighter rounded-lg p-4">
          <h3 className="text-lg font-medium text-text-primary mb-4">
            Historical VIX
          </h3>
          <VIXChart data={historicalData} />
        </div>
      )}
    </div>
  );
};