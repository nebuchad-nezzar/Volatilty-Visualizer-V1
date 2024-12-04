export interface MarketParameters {
  spotPrice: number;
  riskFreeRate: number;
  timeToExpiry: number;
  dividendYield: number;
  marketCorrelation: number;
  skewModel: 'SABR' | 'Heston' | 'None';
  volatilityType: 'Implied' | 'Custom';
  customVolatility: number;
}

export interface SimulationParameters {
  monteCarloSimulations: number;
  pricingModel: 'BlackScholes' | 'BinomialTree' | 'LocalVolatility';
}

export interface GreeksParameters {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}