export const calculate4DSurfaceData = (
  spotPrice: number,
  riskFreeRate: number,
  strikeRange: { min: number; max: number },
  expiryRange: { min: number; max: number },
  optionType: 'call' | 'put'
) => {
  const strikes = generateStrikes(spotPrice, strikeRange);
  const expiries = generateExpiries(expiryRange);
  
  const impliedVol = calculateImpliedVolMatrix(strikes, expiries, spotPrice, riskFreeRate, optionType);
  const historicalVol = calculateHistoricalVolMatrix(strikes, expiries, spotPrice);
  
  const metrics = calculateMetrics(impliedVol, strikes, spotPrice);

  return {
    strikes,
    expiries,
    impliedVol,
    historicalVol,
    metrics,
  };
};

const generateStrikes = (spotPrice: number, range: { min: number; max: number }) => {
  const numStrikes = 50;
  const minStrike = spotPrice * range.min;
  const maxStrike = spotPrice * range.max;
  const step = (maxStrike - minStrike) / (numStrikes - 1);
  
  return Array.from({ length: numStrikes }, (_, i) => minStrike + i * step);
};

const generateExpiries = (range: { min: number; max: number }) => {
  const numExpiries = 20;
  const step = (range.max - range.min) / (numExpiries - 1);
  
  return Array.from({ length: numExpiries }, (_, i) => range.min + i * step);
};

const calculateImpliedVolMatrix = (
  strikes: number[],
  expiries: number[],
  spotPrice: number,
  riskFreeRate: number,
  optionType: 'call' | 'put'
) => {
  return expiries.map(expiry => 
    strikes.map(strike => {
      const moneyness = Math.log(strike / spotPrice);
      const timeEffect = Math.log(expiry / 30) * 0.02;
      const skewEffect = -0.05 * moneyness;
      const smileEffect = 0.1 * Math.pow(moneyness, 2);
      
      let vol = 0.2 + timeEffect + skewEffect + smileEffect;
      return Math.max(0.05, Math.min(1, vol));
    })
  );
};

const calculateHistoricalVolMatrix = (
  strikes: number[],
  expiries: number[],
  spotPrice: number
) => {
  return expiries.map(expiry => 
    strikes.map(strike => {
      const moneyness = Math.log(strike / spotPrice);
      const baseVol = 0.18;
      const adjustment = 0.02 * Math.abs(moneyness);
      
      return baseVol + adjustment;
    })
  );
};

const calculateMetrics = (
  impliedVol: number[][],
  strikes: number[],
  spotPrice: number
) => {
  const allVols = impliedVol.flat();
  const atmIndex = strikes.findIndex(strike => 
    Math.abs(strike - spotPrice) === Math.min(...strikes.map(s => Math.abs(s - spotPrice)))
  );
  
  return {
    maxIV: Math.max(...allVols),
    minIV: Math.min(...allVols),
    skewRatio: impliedVol[0][strikes.length - 1] / impliedVol[0][atmIndex],
    atmIV: impliedVol[0][atmIndex],
  };
};