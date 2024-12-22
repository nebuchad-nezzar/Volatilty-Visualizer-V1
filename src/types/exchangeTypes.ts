export type AssetClass = 'crypto' | 'equity' | 'commodity' | 'forex';
export type Exchange = 'binance' | 'coinbase' | 'deribit' | 'nyse' | 'nasdaq';

export interface ExchangeConfig {
  id: Exchange;
  name: string;
  supportedAssets: AssetClass[];
  apiEndpoint: string;
}

export interface AssetInfo {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  exchange: Exchange;
  price: number;
  currency: string;
}

export interface CrossMarketCorrelation {
  asset1: string;
  asset2: string;
  correlation: number;
  timeframe: string;
}