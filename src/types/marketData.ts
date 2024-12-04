export interface OptionContract {
  strike: number;
  expiry: Date;
  lastPrice: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
}

export interface OptionsChain {
  calls: OptionContract[];
  puts: OptionContract[];
  expirationDates: Date[];
  lastUpdate: Date;
}

export interface MarketData {
  date: Date;
  close: number;
  volume: number;
  volatility: number;
}