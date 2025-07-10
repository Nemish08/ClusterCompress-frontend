import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiImage } from 'react-icons/fi';

const Upload = ({ onUpload, originalImageURL }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setIsDragging(false);
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-200">1. Upload Image</h3>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300
        ${isDragActive || isDragging ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-600 hover:border-gray-500'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center h-48">
          <FiUploadCloud className="text-4xl text-gray-400 mb-3" />
          <p className="text-gray-400">
            {isDragActive ? 'Drop the image here ...' : 'Drag & drop an image, or click to select'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP supported</p>
        </div>
      </div>
      
      {originalImageURL && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-300 mb-2">Image Preview</h4>
          <div className="p-2 bg-gray-700 rounded-lg overflow-hidden">
            <img 
              src={originalImageURL} 
              alt="Original preview" 
              className="w-full h-auto max-h-64 object-contain rounded" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;