export interface Surface4DData {
  strikes: number[];
  expiries: number[];
  impliedVol: number[][];
  historicalVol: number[][];
  metrics: Surface4DMetrics;
}

export interface Surface4DMetrics {
  maxIV: number;
  minIV: number;
  skewRatio: number;
  atmIV: number;
}