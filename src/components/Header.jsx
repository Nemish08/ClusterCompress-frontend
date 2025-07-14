import React from 'react';
import { VscSymbolColor } from "react-icons/vsc";

const Header = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <VscSymbolColor className="text-cyan-400 text-3xl" />
          <h1 className="text-xl font-bold text-white">ClusterCompress</h1>
        </div>
        <a 
          href="https://github.com/Nemish08" // CHANGE THIS
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;