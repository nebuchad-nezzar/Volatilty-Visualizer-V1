import React, { createContext, useContext, useState } from 'react';
import { useOptionsChain, useHistoricalVolatility } from '../hooks/useMarketData';
import { OptionsChain, MarketData } from '../types/marketData';

interface MarketDataContextType {
  symbol: string;
  setSymbol: (symbol: string) => void;
  optionsChain?: OptionsChain;
  historicalData?: MarketData[];
  isLoading: boolean;
  isError: boolean;
  refresh: () => void;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symbol, setSymbol] = useState('SPY');
  
  const { 
    optionsChain,
    isLoading: optionsLoading,
    isError: optionsError,
    refresh
  } = useOptionsChain(symbol);
  
  const {
    historicalData,
    isLoading: historicalLoading,
    isError: historicalError
  } = useHistoricalVolatility(symbol, '1y');

  const value = {
    symbol,
    setSymbol,
    optionsChain,
    historicalData,
    isLoading: optionsLoading || historicalLoading,
    isError: optionsError || historicalError,
    refresh
  };

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketDataContext = () => {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketDataContext must be used within a MarketDataProvider');
  }
  return context;
};