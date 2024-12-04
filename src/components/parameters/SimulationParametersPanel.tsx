import React from 'react';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import { SimulationParameters } from '../../types/parameters';

interface SimulationParametersPanelProps {
  parameters: SimulationParameters;
  onParametersChange: (params: Partial<SimulationParameters>) => void;
}

export const SimulationParametersPanel: React.FC<SimulationParametersPanelProps> = ({
  parameters,
  onParametersChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Monte Carlo Simulations
        </label>
        <Slider.Root
          value={[parameters.monteCarloSimulations]}
          onValueChange={([value]) => onParametersChange({ monteCarloSimulations: value })}
          max={10000}
          min={100}
          step={100}
          className="relative flex items-center select-none touch-none w-full h-5"
        >
          <Slider.Track className="bg-surface-lighter relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-accent-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-primary"
            aria-label="Monte Carlo Simulations"
          />
        </Slider.Root>
        <div className="mt-2 text-sm text-text-secondary">
          {parameters.monteCarloSimulations.toLocaleString()} simulations
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Pricing Model
        </label>
        <Select.Root
          value={parameters.pricingModel}
          onValueChange={(value) => onParametersChange({ pricingModel: value as SimulationParameters['pricingModel'] })}
        >
          <Select.Trigger className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary">
            <Select.Value />
          </Select.Trigger>
          <Select.Content className="bg-surface-lighter border border-surface-lighter rounded-md shadow-lg">
            <Select.Item value="BlackScholes" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              Black-Scholes
            </Select.Item>
            <Select.Item value="BinomialTree" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              Binomial Tree
            </Select.Item>
            <Select.Item value="LocalVolatility" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              Local Volatility
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
};