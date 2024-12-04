import React from 'react';
import { Database } from 'lucide-react';

interface DataSourceSelectorProps {
  selectedSource: string;
  onSourceChange: (source: string) => void;
  isLoading: boolean;
}

export const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  selectedSource,
  onSourceChange,
  isLoading
}) => {
  const dataSources = [
    { id: 'yahoo', name: 'Yahoo Finance', free: true },
    { id: 'iex', name: 'IEX Cloud', free: false },
    { id: 'polygon', name: 'Polygon.io', free: false }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Data Source</h3>
      </div>
      <div className="space-y-2">
        {dataSources.map(source => (
          <button
            key={source.id}
            onClick={() => onSourceChange(source.id)}
            disabled={!source.free || isLoading}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
              selectedSource === source.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-50'
            } ${(!source.free || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{source.name}</span>
            {!source.free && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Premium
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};