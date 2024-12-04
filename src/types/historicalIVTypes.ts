export interface HistoricalIVPoint {
  date: string;
  value: number;
}

export interface HistoricalIVData {
  impliedVolatility: HistoricalIVPoint[];
  historicalVolatility: HistoricalIVPoint[];
  metrics: HistoricalIVMetrics;
}

export interface HistoricalIVMetrics {
  currentIV: number;
  ivPercentile: number;
  historicalVol30: number;
  ivHvSpread: number;
}