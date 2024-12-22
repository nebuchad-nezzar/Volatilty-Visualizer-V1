export interface VIXData {
  timestamp: string;
  value: number;
  change: number;
  percentChange: number;
}

export interface VIXHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface VIXImpactMetrics {
  currentVIX: number;
  historicalPercentile: number;
  impliedVolCorrelation: number;
  marketRegime: 'low' | 'normal' | 'high' | 'extreme';
}