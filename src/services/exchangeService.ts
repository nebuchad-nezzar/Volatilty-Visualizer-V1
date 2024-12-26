import axios from 'axios';
import { Exchange, AssetClass, AssetInfo, CrossMarketCorrelation } from '../types/exchangeTypes';

class ExchangeService {
  private static instance: ExchangeService;
  private readonly apiEndpoints = {
    binance: 'https://api.binance.com/api/v3',
    coinbase: 'https://api.pro.coinbase.com',
    deribit: 'https://www.deribit.com/api/v2',
    nyse: 'https://api.nyse.com/v1',
    nasdaq: 'https://api.nasdaq.com/v1'
  };

  private constructor() {}

  static getInstance(): ExchangeService {
    if (!this.instance) {
      this.instance = new ExchangeService();
    }
    return this.instance;
  }

  async getAssetPrice(symbol: string, exchange: Exchange): Promise<number> {
    try {
      switch (exchange) {
        case 'binance':
          const binanceResponse = await axios.get(`${this.apiEndpoints.binance}/ticker/price`, {
            params: { symbol }
          });
          return parseFloat(binanceResponse.data.price);

        case 'coinbase':
          const coinbaseResponse = await axios.get(`${this.apiEndpoints.coinbase}/products/${symbol}/ticker`);
          return parseFloat(coinbaseResponse.data.price);

        // Add other exchange implementations as needed
        default:
          throw new Error(`Exchange ${exchange} not supported`);
      }
    } catch (error) {
      console.error(`Error fetching price for ${symbol} from ${exchange}:`, error);
      throw error;
    }
  }

  async getVolatilitySurface(
    symbol: string,
    exchange: Exchange,
    assetClass: AssetClass
  ): Promise<any> {
    try {
      switch (exchange) {
        case 'deribit':
          const response = await axios.get(`${this.apiEndpoints.deribit}/public/get_volatility_index`, {
            params: { symbol }
          });
          return response.data;

        // Add other exchange implementations
        default:
          throw new Error(`Volatility surface not available for ${exchange}`);
      }
    } catch (error) {
      console.error(`Error fetching volatility surface for ${symbol}:`, error);
      throw error;
    }
  }

  async getCrossMarketCorrelations(
    asset1: string,
    asset2: string,
    timeframe: string
  ): Promise<CrossMarketCorrelation> {
    try {
      // Fetch historical data for both assets
      const [data1, data2] = await Promise.all([
        this.getHistoricalData(asset1, timeframe),
        this.getHistoricalData(asset2, timeframe)
      ]);

      const correlation = this.calculateCorrelation(data1, data2);

      return {
        asset1,
        asset2,
        correlation,
        timeframe
      };
    } catch (error) {
      console.error('Error calculating correlation:', error);
      throw error;
    }
  }

  private async getHistoricalData(asset: string, timeframe: string): Promise<number[]> {
    // Implementation would fetch historical price data
    // This is a placeholder that should be replaced with actual API calls
    return [];
  }

  private calculateCorrelation(data1: number[], data2: number[]): number {
    if (data1.length !== data2.length || data1.length === 0) {
      throw new Error('Invalid data for correlation calculation');
    }

    const mean1 = data1.reduce((a, b) => a + b) / data1.length;
    const mean2 = data2.reduce((a, b) => a + b) / data2.length;

    const variance1 = data1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0);
    const variance2 = data2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0);

    const covariance = data1.reduce((a, b, i) => 
      a + (b - mean1) * (data2[i] - mean2), 0
    );

    return covariance / Math.sqrt(variance1 * variance2);
  }
}

export const exchangeService = ExchangeService.getInstance();