export interface SimulationStatistics {
  meanFinalPrice: number;
  standardDeviation: number;
  breachProbability: number;
  valueAtRisk: number;
}

export interface SimulationResults {
  paths: number[][];
  finalPrices: number[];
  confidenceBounds: {
    upper: number[];
    lower: number[];
  };
  statistics: SimulationStatistics;
}