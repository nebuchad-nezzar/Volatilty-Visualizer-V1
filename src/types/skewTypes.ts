export interface SkewPoint {
  strike: number;
  impliedVolatility: number;
}

export interface RiskReversalPoint {
  strike: number;
  spread: number;
}

export interface ButterflyPoint {
  strike: number;
  spread: number;
}

export interface SkewMetrics {
  maxSkew: number;
  minSkew: number;
  skewRatio: number;
  riskReversalValue: number;
  atmIV: number;
}

export interface SkewData {
  skewPoints: SkewPoint[];
  riskReversalPoints: RiskReversalPoint[];
  butterflyPoints: ButterflyPoint[];
  metrics: SkewMetrics;
}