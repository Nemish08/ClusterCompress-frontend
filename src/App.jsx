import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Upload from './components/Upload';
import SettingsPanel from './components/SettingsPanel';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import { compressImageAllAPI } from './api/compressorAPI';
// import dotenv from 'dotenv'
// dotenv.config()
function App() {
  const [originalFile, setOriginalFile] = useState(null); // The actual file object
  const [originalImageURL, setOriginalImageURL] = useState(null); // The URL for display
  const [kValue, setKValue] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null); // To scroll to results

  const handleUpload = (file) => {
    setResult(null);
    setError('');
    setOriginalFile(file);
    setOriginalImageURL(URL.createObjectURL(file));
  };

  const handleCompress = async () => {
    if (!originalFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', originalFile);
    formData.append('k', kValue);

    try {
      const response = await compressImageAllAPI(formData);
      setResult(response.data);
      // Scroll to the results section after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.response?.data?.detail || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 text-center">
              ClusterCompress
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Compress images by reducing their color palette with K-Means clustering.
            </p>

            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3">
                <Upload onUpload={handleUpload} originalImageURL={originalImageURL} />
              </div>
              <div className="md:col-span-2">
                <SettingsPanel 
                  kValue={kValue} 
                  setKValue={setKValue} 
                  onCompress={handleCompress}
                  isLoading={isLoading} 
                />
              </div>
            </div>
            
            {isLoading && <Spinner />}
            {error && (
              <div className="mt-6 text-red-400 text-center bg-red-900/30 p-3 rounded-lg border border-red-700">
                {error}
              </div>
            )}
          </div>
          
          <div ref={resultsRef}>
            {result && originalImageURL && (
              <ResultsDisplay result={result} originalImageURL={originalImageURL} />
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;