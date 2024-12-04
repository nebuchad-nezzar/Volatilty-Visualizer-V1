import { SkewData, SkewPoint, RiskReversalPoint, ButterflyPoint } from '../types/skewTypes';

export const calculateSkewMetrics = (
  spotPrice: number,
  riskFreeRate: number,
  daysToExpiry: number,
  strikeRange: { min: number; max: number }
): SkewData => {
  const timeToExpiry = daysToExpiry / 365;
  const strikes = generateStrikes(spotPrice, strikeRange);
  
  // Calculate implied volatilities for each strike
  const skewPoints = calculateSkewPoints(strikes, spotPrice, timeToExpiry);
  
  // Calculate risk reversal spreads
  const riskReversalPoints = calculateRiskReversalPoints(skewPoints);
  
  // Calculate butterfly spreads
  const butterflyPoints = calculateButterflyPoints(skewPoints);
  
  // Calculate key metrics
  const metrics = {
    maxSkew: Math.max(...skewPoints.map(p => p.impliedVolatility)),
    minSkew: Math.min(...skewPoints.map(p => p.impliedVolatility)),
    skewRatio: calculateSkewRatio(skewPoints, spotPrice),
    riskReversalValue: calculateRiskReversalValue(riskReversalPoints),
    atmIV: findAtmIV(skewPoints, spotPrice),
  };

  return {
    skewPoints,
    riskReversalPoints,
    butterflyPoints,
    metrics,
  };
};

const generateStrikes = (spotPrice: number, range: { min: number; max: number }): number[] => {
  const numStrikes = 50;
  const minStrike = spotPrice * range.min;
  const maxStrike = spotPrice * range.max;
  const step = (maxStrike - minStrike) / (numStrikes - 1);
  
  return Array.from({ length: numStrikes }, (_, i) => minStrike + i * step);
};

const calculateSkewPoints = (strikes: number[], spotPrice: number, timeToExpiry: number): SkewPoint[] => {
  return strikes.map(strike => {
    const moneyness = Math.log(strike / spotPrice);
    const baseVol = 0.2;
    const smile = 0.1 * Math.pow(moneyness, 2);
    const skew = -0.05 * moneyness;
    const termStructure = 0.02 * Math.log(timeToExpiry);
    
    let impliedVol = baseVol + smile + skew + termStructure;
    impliedVol = Math.max(0.05, Math.min(1, impliedVol));
    
    return {
      strike,
      impliedVolatility: impliedVol,
    };
  });
};

const calculateRiskReversalPoints = (skewPoints: SkewPoint[]): RiskReversalPoint[] => {
  return skewPoints.map((point, i) => ({
    strike: point.strike,
    spread: i > 0 ? point.impliedVolatility - skewPoints[i - 1].impliedVolatility : 0,
  }));
};

const calculateButterflyPoints = (skewPoints: SkewPoint[]): ButterflyPoint[] => {
  return skewPoints.map((point, i) => ({
    strike: point.strike,
    spread: i > 0 && i < skewPoints.length - 1
      ? (skewPoints[i + 1].impliedVolatility + skewPoints[i - 1].impliedVolatility) / 2 - point.impliedVolatility
      : 0,
  }));
};

const calculateSkewRatio = (skewPoints: SkewPoint[], spotPrice: number): number => {
  const atmPoint = findAtmPoint(skewPoints, spotPrice);
  const otmPoint = skewPoints[skewPoints.length - 1];
  return otmPoint.impliedVolatility / atmPoint.impliedVolatility;
};

const calculateRiskReversalValue = (riskReversalPoints: RiskReversalPoint[]): number => {
  return riskReversalPoints.reduce((sum, point) => sum + point.spread, 0) / riskReversalPoints.length;
};

const findAtmIV = (skewPoints: SkewPoint[], spotPrice: number): number => {
  return findAtmPoint(skewPoints, spotPrice).impliedVolatility;
};

const findAtmPoint = (skewPoints: SkewPoint[], spotPrice: number): SkewPoint => {
  return skewPoints.reduce((closest, point) => 
    Math.abs(point.strike - spotPrice) < Math.abs(closest.strike - spotPrice)
      ? point
      : closest
  );
};