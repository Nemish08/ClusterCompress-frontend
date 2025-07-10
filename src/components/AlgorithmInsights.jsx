import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FiHelpCircle, FiUsers, FiFilter } from 'react-icons/fi';

const AlgorithmInsights = ({ analysis, palette }) => {
  const { dbscan } = analysis;

  if (!dbscan) {
    return <div>Analysis data is not available.</div>;
  }

  const dbscanData = palette.map((color, index) => ({
    name: `Color ${index}`,
    color: color,
    value: 1,
    label: dbscan.labels[index],
  }));
  
  // Assign a visual color to each DBSCAN cluster label for the border
  const clusterVisualColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#0088FE'];
  const outlierVisualColor = '#FF4136'; // Bright red for outliers

  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <FiFilter /> Post-Compression Palette Analysis
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        This section analyzes the small color palette created by K-Means, using other clustering algorithms to reveal its internal structure. This demonstrates a deeper understanding of when and why to use different algorithms.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* DBSCAN Visualization */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2"><FiUsers /> DBSCAN Palette Clustering</h4>
          <p className="text-sm text-gray-400 mb-3">
            DBSCAN was run on the palette to find density-based groups. It found{' '}
            <span className="font-bold text-white">{dbscan.num_clusters}</span> color family/families and identified{' '}
            <span className="font-bold text-red-400">{dbscan.num_outliers}</span> outlier colors.
          </p>
          <div className="p-2 bg-gray-700 rounded-lg h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dbscanData} layout="horizontal">
                <Bar dataKey="value" isAnimationActive={false}>
                  {dbscanData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} // The actual color from the palette
                      // Add a border to show the DBSCAN cluster
                      strokeWidth={entry.label === -1 ? 4 : 3}
                      stroke={entry.label === -1 ? outlierVisualColor : clusterVisualColors[entry.label % clusterVisualColors.length]}
                      style={{ outlineOffset: '-2px' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 text-center mt-2">Bars with a <span className="text-red-400 font-semibold">red</span> border are 'outlier' colors. Others are grouped by border color.</div>
          </div>
        </div>

        {/* Hierarchical Clustering Explanation */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2"><FiHelpCircle /> Why Use Hierarchical Clustering?</h4>
          <p className="text-sm text-gray-400">
            While too slow for the main compression, Hierarchical Clustering is perfect for analyzing the final palette.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-400 mt-3 space-y-1">
            <li>It creates a <span className="text-cyan-300">dendrogram</span> (a tree diagram).</li>
            <li>This tree visually shows how colors are related, merging the most similar colors at each step.</li>
            <li>It helps answer: "Which colors in my new palette are the most similar to each other?"</li>
          </ul>
           <div className="mt-3 p-3 bg-gray-900/50 rounded-lg text-center text-gray-400 text-sm">
            (A Dendrogram visualization here would show this tree structure)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInsights;