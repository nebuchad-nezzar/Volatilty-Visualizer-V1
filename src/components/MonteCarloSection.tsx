import React, { useState, useEffect } from 'react';
import { Settings, TrendingUp, BarChart2, Activity } from 'lucide-react';
import { MonteCarloInputs } from './MonteCarloInputs';
import { SimulationPaths } from './SimulationPaths';
import { PriceDistribution } from './PriceDistribution';
import { StatisticsPanel } from './StatisticsPanel';
import { runMonteCarloSimulation } from '../utils/monteCarloSimulation';
import { SimulationResults } from '../types/monteCarloTypes';

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
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimulationPaths 
            paths={results.paths}
            confidenceBounds={results.confidenceBounds}
            timeSteps={timeSteps}
          />
          <PriceDistribution 
            finalPrices={results.finalPrices}
            mean={results.statistics.meanFinalPrice}
          />
        </div>
      )}

      {results && (
        <StatisticsPanel 
          statistics={results.statistics}
          breachPrice={breachPrice}
        />
      )}
    </div>
  );
};