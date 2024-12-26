import { ExchangeService } from '../services/exchangeService';
import type { AssetSymbol } from '../components/common/AssetSelector';

export const calculateImpliedCorrelation = async (
  asset1: AssetSymbol,
  asset2: AssetSymbol,
  timeframe: number
): Promise<{ date: string; correlation: number }[]> => {
  const exchangeService = ExchangeService.getInstance();
  const correlationData = await exchangeService.getCrossMarketCorrelations(
    asset1,
    asset2,
    `${timeframe}d`
  );

  return correlationData.timeSeries.map(point => ({
    date: point.date,
    correlation: point.correlation
  }));
};

export const convertPriceToBaseCurrency = (
  price: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: Record<string, number>
): number => {
  if (fromCurrency === toCurrency) return price;
  
  const rate = exchangeRates[`${fromCurrency}/${toCurrency}`];
  if (!rate) throw new Error(`Exchange rate not found for ${fromCurrency}/${toCurrency}`);
  
  return price * rate;
};