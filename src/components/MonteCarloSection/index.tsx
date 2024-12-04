import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { MonteCarloInputs } from '../MonteCarloInputs';
import { PathVisualization } from './PathVisualization';
import { DistributionVisualization } from './DistributionVisualization';
import { RiskMetrics } from './RiskMetrics';
import { runMonteCarloSimulation } from '../../utils/monteCarloSimulation';

interface MonteCarloSectionProps {
  spotPrice: number;
  riskFreeRate: number;
  timeToExpiry: number;
}

export const MonteCarloSection: React.FC<MonteCarloSectionProps> = ({
  spotPrice,
  riskFreeRate,
  timeToExpiry,
}) => {
  const [numSimulations, setNumSimulations] = useState(1000);
  const [timeSteps, setTimeSteps] = useState(252);
  const [drift, setDrift] = useState(0.05);
  const [volatility, setVolatility] = useState(0.2);
  const [breachPrice, setBreachPrice] = useState(spotPrice * 1.1);
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(0.95);

  useEffect(() => {
    handleSimulate();
  }, [spotPrice, riskFreeRate, timeToExpiry]);

  const handleSimulate = async () => {
    setIsCalculating(true);
    const simulationResults = await runMonteCarloSimulation({
      initialPrice: spotPrice,
      drift,
      volatility,
      timeToExpiry,
      numSimulations,
      timeSteps,
      breachPrice,
      riskFreeRate,
    });
    setResults(simulationResults);
    setIsCalculating(false);
  };

  return (
    <div className="space-y-6 bg-surface-darker rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-text-primary">
          <Activity className="w-5 h-5" />
          Monte Carlo Simulation
        </h2>
      </div>

      <MonteCarloInputs
        numSimulations={numSimulations}
        setNumSimulations={setNumSimulations}
        timeSteps={timeSteps}
        setTimeSteps={setTimeSteps}
        drift={drift}
        setDrift={setDrift}
        volatility={volatility}
        setVolatility={setVolatility}
        breachPrice={breachPrice}
        setBreachPrice={setBreachPrice}
        onSimulate={handleSimulate}
        isCalculating={isCalculating}
      />

      {results && (
        <>
          <PathVisualization 
            paths={results.paths}
            confidenceBounds={results.confidenceBounds}
            timeSteps={timeSteps}
          />
          <DistributionVisualization 
            finalPrices={results.finalPrices}
            mean={results.statistics.meanFinalPrice}
            confidenceLevel={confidenceLevel}
            valueAtRisk={results.statistics.valueAtRisk}
          />
          <RiskMetrics 
            finalPrices={results.finalPrices}
            mean={results.statistics.meanFinalPrice}
            standardDeviation={results.statistics.standardDeviation}
            valueAtRisk={results.statistics.valueAtRisk}
            breachPrice={breachPrice}
            breachProbability={results.statistics.breachProbability}
          />
        </>
      )}
    </div>
  );
};