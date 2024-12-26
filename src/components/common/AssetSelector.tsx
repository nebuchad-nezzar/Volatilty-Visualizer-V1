import React from 'react';
import { CandlestickChart } from 'lucide-react';

export type AssetSymbol = 'BTC' | 'ETH' | 'SPY' | 'QQQ' | 'GLD' | 'SLV' | 'EUR' | 'JPY';

interface AssetSelectorProps {
  selectedAsset: AssetSymbol;
  onAssetChange: (asset: AssetSymbol) => void;
  assetType: 'crypto' | 'commodity' | 'equity' | 'forex';
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedAsset,
  onAssetChange,
  assetType,
}) => {
  const getAssetOptions = () => {
    switch (assetType) {
      case 'crypto':
        return [
          { value: 'BTC', label: 'Bitcoin (BTC)' },
          { value: 'ETH', label: 'Ethereum (ETH)' },
        ];
      case 'commodity':
        return [
          { value: 'GLD', label: 'Gold ETF (GLD)' },
          { value: 'SLV', label: 'Silver ETF (SLV)' },
        ];
      case 'equity':
        return [
          { value: 'SPY', label: 'S&P 500 ETF (SPY)' },
          { value: 'QQQ', label: 'Nasdaq ETF (QQQ)' },
        ];
      case 'forex':
        return [
          { value: 'EUR', label: 'EUR/USD' },
          { value: 'JPY', label: 'USD/JPY' },
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        Select Asset
      </label>
      <div className="relative">
        <CandlestickChart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <select
          value={selectedAsset}
          onChange={(e) => onAssetChange(e.target.value as AssetSymbol)}
          className="w-full pl-10 pr-3 py-2 bg-surface-lighter text-text-primary border border-surface-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary appearance-none"
        >
          {getAssetOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};