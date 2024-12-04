import React from 'react';
import DatePicker from 'react-datepicker';
import * as Select from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import { Settings, Calendar } from 'lucide-react';
import { MarketParameters } from '../../types/parameters';
import "react-datepicker/dist/react-datepicker.css";

interface MarketParametersPanelProps {
  parameters: MarketParameters;
  onParametersChange: (params: Partial<MarketParameters>) => void;
}

export const MarketParametersPanel: React.FC<MarketParametersPanelProps> = ({
  parameters,
  onParametersChange,
}) => {
  const handleExpiryDateChange = (date: Date | null) => {
    if (date) {
      const now = new Date();
      const diffTime = Math.abs(date.getTime() - now.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
      onParametersChange({ timeToExpiry: diffYears });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Spot Price ($)
        </label>
        <input
          type="number"
          value={parameters.spotPrice}
          onChange={(e) => onParametersChange({ spotPrice: Number(e.target.value) })}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Risk-Free Rate (%)
        </label>
        <input
          type="number"
          value={parameters.riskFreeRate * 100}
          onChange={(e) => onParametersChange({ riskFreeRate: Number(e.target.value) / 100 })}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
          min="0"
          max="100"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Expiry Date
        </label>
        <DatePicker
          selected={new Date(Date.now() + parameters.timeToExpiry * 365 * 24 * 60 * 60 * 1000)}
          onChange={handleExpiryDateChange}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Dividend Yield (%)
        </label>
        <input
          type="number"
          value={parameters.dividendYield * 100}
          onChange={(e) => onParametersChange({ dividendYield: Number(e.target.value) / 100 })}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
          min="0"
          max="100"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Market Correlation (%)
        </label>
        <input
          type="number"
          value={parameters.marketCorrelation * 100}
          onChange={(e) => onParametersChange({ marketCorrelation: Number(e.target.value) / 100 })}
          className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
          min="-100"
          max="100"
          step="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Skew Model
        </label>
        <Select.Root
          value={parameters.skewModel}
          onValueChange={(value) => onParametersChange({ skewModel: value as MarketParameters['skewModel'] })}
        >
          <Select.Trigger className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary">
            <Select.Value />
          </Select.Trigger>
          <Select.Content className="bg-surface-lighter border border-surface-lighter rounded-md shadow-lg">
            <Select.Item value="None" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              None
            </Select.Item>
            <Select.Item value="SABR" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              SABR
            </Select.Item>
            <Select.Item value="Heston" className="px-3 py-2 text-text-primary hover:bg-surface-dark cursor-pointer">
              Heston
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="col-span-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-text-primary">
            Volatility Type
          </label>
          <Switch.Root
            checked={parameters.volatilityType === 'Custom'}
            onCheckedChange={(checked) => 
              onParametersChange({ volatilityType: checked ? 'Custom' : 'Implied' })
            }
            className="w-11 h-6 bg-surface-lighter rounded-full relative data-[state=checked]:bg-accent-primary outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
        {parameters.volatilityType === 'Custom' && (
          <input
            type="number"
            value={parameters.customVolatility * 100}
            onChange={(e) => onParametersChange({ customVolatility: Number(e.target.value) / 100 })}
            className="w-full px-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
            min="0"
            max="200"
            step="0.1"
          />
        )}
      </div>
    </div>
  );
};