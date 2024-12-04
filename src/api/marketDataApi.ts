import axios from 'axios';
import yahooFinance from 'yahoo-finance2';
import { MarketData, OptionsChain } from '../types/marketData';

const YAHOO_FINANCE_API_KEY = import.meta.env.VITE_YAHOO_FINANCE_API_KEY;

export class MarketDataService {
  private static instance: MarketDataService;
  private constructor() {}

  static getInstance(): MarketDataService {
    if (!this.instance) {
      this.instance = new MarketDataService();
    }
    return this.instance;
  }

  async getOptionsChain(symbol: string): Promise<OptionsChain> {
    try {
      const result = await yahooFinance.options(symbol);
      return this.transformYahooOptionsData(result);
    } catch (error) {
      console.error('Error fetching options chain:', error);
      throw error;
    }
  }

  async getHistoricalVolatility(symbol: string, period: string): Promise<MarketData[]> {
    try {
      const result = await yahooFinance.historical(symbol, {
        period1: period,
        interval: '1d'
      });
      return this.transformHistoricalData(result);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  private transformYahooOptionsData(data: any): OptionsChain {
    return {
      calls: data.calls.map(this.transformOptionContract),
      puts: data.puts.map(this.transformOptionContract),
      expirationDates: data.expirationDates,
      lastUpdate: new Date()
    };
  }

  private transformOptionContract(contract: any) {
    return {
      strike: contract.strike,
      expiry: new Date(contract.expiration),
      lastPrice: contract.lastPrice,
      bid: contract.bid,
      ask: contract.ask,
      volume: contract.volume,
      openInterest: contract.openInterest,
      impliedVolatility: contract.impliedVolatility
    };
  }

  private transformHistoricalData(data: any[]): MarketData[] {
    return data.map(item => ({
      date: new Date(item.date),
      close: item.close,
      volume: item.volume,
      volatility: this.calculateHistoricalVolatility(item)
    }));
  }

  private calculateHistoricalVolatility(data: any): number {
    // Implementation of historical volatility calculation
    // Using standard deviation of log returns
    return 0.2; // Placeholder
  }
}