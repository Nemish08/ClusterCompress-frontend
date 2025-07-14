import React from 'react';
import ResultCard from './ResultCard';

const ResultsDisplay = ({ result, originalImageURL }) => {
    // Descriptions for each algorithm
    const descriptions = {
        kmeans: "Best for general-purpose compression. Balances quality and file size.",
        hierarchical: "Builds a color hierarchy. Run on a downscaled image due to high computational cost.",
        dbscan: "Groups dense color regions. Outlier colors are mapped to black. Also run on a downscaled image."
    };

    return (
        <div className="mt-10 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
                Algorithm Comparison
            </h2>

            {/* Grid of results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResultCard 
                    title="K-Means"
                    color = {result.kmeans.num_colors}
                    data={result.kmeans}
                    originalSize={result.original_size}
                    description={descriptions.kmeans}
                />
                <ResultCard 
                    title="Hierarchical"
                    color = {result.hierarchical.num_colors}
                    data={result.hierarchical}
                    originalSize={result.original_size}
                    description={descriptions.hierarchical}
                />
                 <ResultCard 
                    title="DBSCAN"
                    color = {result.kmeans.num_colors}
                    
                    data={result.dbscan}
                    originalSize={result.original_size}
                    description={descriptions.dbscan}
                />
            </div>

             <div className="mt-8 text-center text-gray-400 text-sm">
                <p><strong>Original Image Size:</strong> {new Intl.NumberFormat().format(result.original_size)} Bytes</p>
                <p>Hover over the results to see stats and download individual images.</p>
             </div>
        </div>
    );
};

export default ResultsDisplay;