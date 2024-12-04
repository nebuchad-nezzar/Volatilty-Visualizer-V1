import useSWR from 'swr';
import { MarketDataService } from '../api/marketDataApi';
import { OptionsChain, MarketData } from '../types/marketData';

const marketDataService = MarketDataService.getInstance();

export function useOptionsChain(symbol: string) {
  const { data, error, mutate } = useSWR<OptionsChain>(
    `options-${symbol}`,
    () => marketDataService.getOptionsChain(symbol),
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: true
    }
  );

  return {
    optionsChain: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate
  };
}

export function useHistoricalVolatility(symbol: string, period: string) {
  const { data, error } = useSWR<MarketData[]>(
    `historical-${symbol}-${period}`,
    () => marketDataService.getHistoricalVolatility(symbol, period),
    {
      refreshInterval: 3600000, // 1 hour
    }
  );

  return {
    historicalData: data,
    isLoading: !error && !data,
    isError: error
  };
}