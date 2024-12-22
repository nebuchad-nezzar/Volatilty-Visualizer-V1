import React, { useState } from 'react';
import { TrendingUp, Table2, Box, Activity } from 'lucide-react';
import { VolatilityChart } from './components/VolatilityChart';
import { Surface3D } from './components/Surface3D';
import { OptionsTable } from './components/OptionsTable';
import { InputPanel } from './components/InputPanel';
import { MonteCarloSection } from './components/MonteCarloSection';
import { Surface4DSection } from './components/Surface4D/Surface4DSection';
import { HistoricalIVSection } from './components/HistoricalIV/HistoricalIVSection';
import { SkewAnalysisSection } from './components/SkewAnalysis/SkewAnalysisSection';
import { GreeksAnalysis } from './components/GreeksAnalysis';

function App() {
  const [spotPrice, setSpotPrice] = useState(100);
  const [riskFreeRate, setRiskFreeRate] = useState(0.05);
  const [timeToExpiry, setTimeToExpiry] = useState(1);
  const [selectedExpiry, setSelectedExpiry] = useState(30);
  const [activeTab, setActiveTab] = useState<'surface' | 'smile' | 'table' | 'skew'>('surface');

  const handleReset = () => {
    setSpotPrice(100);
    setRiskFreeRate(0.05);
    setTimeToExpiry(1);
    setSelectedExpiry(30);
  };

  return (
    <div className="min-h-screen bg-surface-dark">
      <header className="bg-surface-darker border-b border-surface-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-accent-primary" />
            <h1 className="text-2xl font-bold text-text-primary">Options Volatility Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <InputPanel
            spotPrice={spotPrice}
            setSpotPrice={setSpotPrice}
            riskFreeRate={riskFreeRate}
            setRiskFreeRate={setRiskFreeRate}
            timeToExpiry={timeToExpiry}
            setTimeToExpiry={setTimeToExpiry}
            onReset={handleReset}
          />

          <div className="bg-surface-darker rounded-lg shadow-lg p-4">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('surface')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'surface'
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-surface-lighter'
                }`}
              >
                <Box className="w-4 h-4" />
                3D Surface
              </button>
              <button
                onClick={() => setActiveTab('smile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'smile'
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-surface-lighter'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Volatility Smile
              </button>
              <button
                onClick={() => setActiveTab('skew')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'skew'
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-surface-lighter'
                }`}
              >
                <Activity className="w-4 h-4" />
                Skew Analysis
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'table'
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-surface-lighter'
                }`}
              >
                <Table2 className="w-4 h-4" />
                Options Chain
              </button>
            </div>

            {activeTab === 'surface' && (
              <>
                <Surface3D
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                />
                <MonteCarloSection
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                  timeToExpiry={timeToExpiry}
                />
                <GreeksAnalysis
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                />
                <Surface4DSection
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                />
                <HistoricalIVSection
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                />
              </>
            )}

            {activeTab === 'smile' && (
              <VolatilityChart
                spotPrice={spotPrice}
                riskFreeRate={riskFreeRate}
                timeToExpiry={timeToExpiry}
              />
            )}

            {activeTab === 'skew' && (
              <SkewAnalysisSection
                spotPrice={spotPrice}
                riskFreeRate={riskFreeRate}
              />
            )}

            {activeTab === 'table' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-text-primary">
                    Days to Expiry:
                  </label>
                  <select
                    value={selectedExpiry}
                    onChange={(e) => setSelectedExpiry(Number(e.target.value))}
                    className="rounded-md bg-surface-lighter text-text-primary border-surface-lighter focus:border-accent-primary focus:ring focus:ring-accent-primary/20"
                  >
                    {[30, 60, 90, 120, 150, 180].map((days) => (
                      <option key={days} value={days}>
                        {days} days
                      </option>
                    ))}
                  </select>
                </div>
                <OptionsTable
                  spotPrice={spotPrice}
                  riskFreeRate={riskFreeRate}
                  selectedExpiry={selectedExpiry}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-surface-darker border-t border-surface-lighter mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-text-secondary text-sm">
            © {new Date().getFullYear()} Options Volatility Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;