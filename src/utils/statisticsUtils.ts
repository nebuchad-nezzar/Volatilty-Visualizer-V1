import { kde } from '@ant-design/plots';

export const calculateKDE = (data: number[], bandwidth?: number): [number, number][] => {
  const n = data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const h = bandwidth || 0.9 * Math.min(
    Math.sqrt(variance(data)),
    (max - min) / 1.34
  ) * Math.pow(n, -0.2);
  
  const points = 200;
  const step = (max - min) / (points - 1);
  const result: [number, number][] = [];
  
  for (let i = 0; i < points; i++) {
    const x = min + i * step;
    let density = 0;
    
    for (let j = 0; j < n; j++) {
      density += gaussianKernel((x - data[j]) / h);
    }
    
    density /= n * h;
    result.push([x, density]);
  }
  
  return result;
};

const gaussianKernel = (x: number): number => {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
};

const variance = (data: number[]): number => {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  return data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
};

export const calculateExpectedShortfall = (
  data: number[],
  confidenceLevel: number
): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const varIndex = Math.floor(sortedData.length * (1 - confidenceLevel));
  const tailData = sortedData.slice(0, varIndex);
  return tailData.reduce((a, b) => a + b, 0) / tailData.length;
};

export const calculateMaxDrawdown = (prices: number[]): number => {
  let maxDrawdown = 0;
  let peak = prices[0];
  
  for (const price of prices) {
    if (price > peak) {
      peak = price;
    }
    const drawdown = (peak - price) / peak;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  }
  
  return maxDrawdown;
};

export const calculateTailRiskProbability = (
  data: number[],
  threshold: number
): number => {
  const exceedances = data.filter(x => x < threshold).length;
  return exceedances / data.length;
};