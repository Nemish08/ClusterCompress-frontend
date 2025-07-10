import React from 'react';
import { FiZap } from 'react-icons/fi';

const SettingsPanel = ({ kValue, setKValue, onCompress, isLoading }) => {
  return (
    <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-700 h-full">
      <h3 className="text-xl font-semibold text-gray-200">2. Configure & Run</h3>
      
      <div className="space-y-2">
        <label htmlFor="k-slider" className="block text-sm font-medium text-gray-300">
          Number of Colors (K): <span className="font-bold text-cyan-400">{kValue}</span>
        </label>
        <input
          id="k-slider"
          type="range"
          min="2"
          max="64"
          value={kValue}
          onChange={(e) => setKValue(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
          disabled={isLoading}
        />
      </div>

      <p className="text-xs text-gray-500 pt-2">
        A lower 'K' means fewer colors and higher compression, but may reduce image quality.
      </p>

      <div className="pt-4">
        <button
          onClick={onCompress}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg
                     hover:bg-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          {isLoading ? (
            'Compressing...'
          ) : (
            <>
              <FiZap />
              Compress Image
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;