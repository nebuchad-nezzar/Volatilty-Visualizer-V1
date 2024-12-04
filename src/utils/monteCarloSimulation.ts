interface SimulationParams {
  initialPrice: number;
  drift: number;
  volatility: number;
  timeToExpiry: number;
  numSimulations: number;
  timeSteps: number;
  breachPrice: number;
  riskFreeRate: number;
}

export const runMonteCarloSimulation = async ({
  initialPrice,
  drift,
  volatility,
  timeToExpiry,
  numSimulations,
  timeSteps,
  breachPrice,
  riskFreeRate,
}: SimulationParams) => {
  const dt = timeToExpiry / timeSteps;
  const paths: number[][] = Array(numSimulations).fill(0).map(() => Array(timeSteps).fill(0));
  const finalPrices: number[] = [];
  let breachCount = 0;

  // Generate paths
  for (let sim = 0; sim < numSimulations; sim++) {
    let price = initialPrice;
    paths[sim][0] = price;
    
    for (let step = 1; step < timeSteps; step++) {
      const randomNormal = boxMullerTransform();
      const dW = randomNormal * Math.sqrt(dt);
      price = price * Math.exp((drift - 0.5 * volatility * volatility) * dt + volatility * dW);
      paths[sim][step] = price;
      
      if (price >= breachPrice) {
        breachCount++;
      }
    }
    finalPrices.push(price);
  }

  // Calculate statistics
  const meanFinalPrice = mean(finalPrices);
  const standardDeviation = std(finalPrices);
  const breachProbability = breachCount / (numSimulations * timeSteps);
  const sortedFinalPrices = [...finalPrices].sort((a, b) => a - b);
  const valueAtRisk = sortedFinalPrices[Math.floor(numSimulations * 0.05)] - initialPrice;

  // Calculate confidence bounds
  const confidenceBounds = {
    upper: Array(timeSteps).fill(0),
    lower: Array(timeSteps).fill(0),
  };

  for (let step = 0; step < timeSteps; step++) {
    const prices = paths.map(path => path[step]).sort((a, b) => a - b);
    confidenceBounds.lower[step] = prices[Math.floor(numSimulations * 0.025)];
    confidenceBounds.upper[step] = prices[Math.floor(numSimulations * 0.975)];
  }

  return {
    paths,
    finalPrices,
    confidenceBounds,
    statistics: {
      meanFinalPrice,
      standardDeviation,
      breachProbability,
      valueAtRisk,
    },
  };
};

// Helper functions
const boxMullerTransform = () => {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z;
};

const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const std = (arr: number[]) => {
  const m = mean(arr);
  const variance = arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / arr.length;
  return Math.sqrt(variance);
};