import { useState, useEffect } from 'react';
import { VIXData, VIXImpactMetrics } from '../types/vixTypes';
import { vixService } from '../services/vixService';

export function useVIXData() {
  const [currentVIX, setCurrentVIX] = useState<VIXData | null>(null);
  const [vixImpact, setVIXImpact] = useState<VIXImpactMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vixData = await vixService.getCurrentVIX();
        const impactData = await vixService.getVIXImpact(vixData.value);
        setCurrentVIX(vixData);
        setVIXImpact(impactData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { currentVIX, vixImpact, isLoading, error };
}