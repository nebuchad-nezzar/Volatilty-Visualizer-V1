import { format, subDays } from 'date-fns';

export const calculateHistoricalIVData = (
  spotPrice: number,
  riskFreeRate: number,
  timeFrame: number
) => {
  const dates = generateDates(timeFrame);
  const impliedVolatility = calculateImpliedVolTimeSeries(dates, spotPrice, riskFreeRate);
  const historicalVolatility = calculateHistoricalVolTimeSeries(dates, spotPrice);
  
  const metrics = calculateMetrics(impliedVolatility, historicalVolatility);

  return {
    impliedVolatility,
    historicalVolatility,
    metrics,
  };
};

const generateDates = (timeFrame: number) => {
  const dates = [];
  for (let i = timeFrame; i >= 0; i--) {
    dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
  }
  return dates;
};

const calculateImpliedVolTimeSeries = (dates: string[], spotPrice: number, riskFreeRate: number) => {
  return dates.map(date => {
    const daysPassed = dates.indexOf(date);
    const baseVol = 0.2;
    const timeEffect = Math.sin(daysPassed / 10) * 0.05;
    const rateEffect = riskFreeRate * 0.1;
    
    return {
      date,
      value: Math.max(0.05, Math.min(1, baseVol + timeEffect + rateEffect)) * 100
    };
  });
};

const calculateHistoricalVolTimeSeries = (dates: string[], spotPrice: number) => {
  return dates.map(date => {
    const daysPassed = dates.indexOf(date);
    const baseVol = 0.18;
    const timeEffect = Math.cos(daysPassed / 12) * 0.03;
    
    return {
      date,
      value: Math.max(0.05, Math.min(1, baseVol + timeEffect)) * 100
    };
  });
};

const calculateMetrics = (impliedVolatility: any[], historicalVolatility: any[]) => {
  const currentIV = impliedVolatility[impliedVolatility.length - 1].value / 100;
  const ivValues = impliedVolatility.map(point => point.value / 100);
  const hvValues = historicalVolatility.map(point => point.value / 100);
  
  const sortedIV = [...ivValues].sort((a, b) => a - b);
  const currentIVRank = sortedIV.indexOf(currentIV);
  const ivPercentile = (currentIVRank / sortedIV.length) * 100;
  
  const last30HV = hvValues.slice(-30).reduce((sum, val) => sum + val, 0) / 30;
  
  return {
    currentIV,
    ivPercentile,
    historicalVol30: last30HV,
    ivHvSpread: currentIV - last30HV,
  };
};