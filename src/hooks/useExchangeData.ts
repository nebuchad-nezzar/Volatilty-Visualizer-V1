import { useState, useEffect } from 'react';
import { Exchange, AssetClass, AssetInfo } from '../types/exchangeTypes';
import { exchangeService } from '../services/exchangeService';

export function useExchangeData(
  symbol: string,
  exchange: Exchange,
  assetClass: AssetClass
) {
  const [data, setData] = useState<AssetInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const price = await exchangeService.getAssetPrice(symbol, exchange);
        setData({
          symbol,
          name: symbol,
          assetClass,
          exchange,
          price,
          currency: 'USD'
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, exchange, assetClass]);

  return { data, isLoading, error };
}