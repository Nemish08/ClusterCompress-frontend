import React from 'react';
import { FiDownload, FiInfo } from 'react-icons/fi';

// Helper to format bytes
const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper for download
const downloadImage = (base64Image, fileName) => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


const ResultCard = ({ title, data, originalSize, description, color }) => {
    if (!data) return null;

    const reduction = 100 - (data.size / originalSize) * 100;
    const fileName = `${title.toLowerCase().replace(' ', '_')}_compressed.png`;

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
                <p className="text-xs text-gray-400 mt-1 flex items-start gap-1.5">
                    <FiInfo className="mt-0.5 shrink-0" />
                    <span>{description}</span>
                </p>
            </div>
            
            <div className="p-4">
                <img src={data.image_b64} alt={`${title} compressed image`} className="w-full h-48 object-contain rounded-md bg-gray-900/50 mb-4"/>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-700 p-2 rounded-md">
                        <p className="text-gray-400">Size</p>
                        <p className="font-semibold text-white">{formatBytes(data.size)}</p>
                    </div>
                     <div className="bg-gray-700 p-2 rounded-md">
                        <p className="text-gray-400">Reduction</p>
                        <p className="font-semibold text-green-400">{reduction.toFixed(1)}%</p>
                    </div>
                     <div className="bg-gray-700 p-2 rounded-md">
                        <p className="text-gray-400">Colors</p>
                        <p className="font-semibold text-white">{color}</p>
                    </div>
                     <div className="bg-gray-700 p-2 rounded-md">
                        <p className="text-gray-400">Palette</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {data.palette.slice(0, 8).map((color, i) => (
                                <div key={i} className="h-4 w-4 rounded" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-4 pt-0">
                <button 
                    onClick={() => downloadImage(data.image_b64, fileName)}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg
                               hover:bg-cyan-500 transition-colors duration-300"
                >
                    <FiDownload />
                    Download
                </button>
            </div>
        </div>
    );
};

export default ResultCard;