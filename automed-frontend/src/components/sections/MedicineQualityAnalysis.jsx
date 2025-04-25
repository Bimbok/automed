import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import Input from '../ui/input';
import Button from '../ui/button';

// Define the API URL - make sure this matches your Flask app port
const API_URL = 'https://automed-ruby.vercel.app/api';

const MedicineQualityAnalysis = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    expiryDate: '',
    chemical_stability: '',
    contamination_level: '',
    ph_level: '',
    sterility_index: '',
    temperature_exposure: '',
    moisture_content: ''
  });

  // Analysis results 
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Previous results
  const [previousResults, setPreviousResults] = useState([]);
  
  // API status
  const [apiStatus, setApiStatus] = useState({
    isChecking: true,
    isOnline: false,
    message: 'Checking API connection...'
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiStatus.isOnline) {
      setError('API is offline. Please ensure the Flask server is running on port 8000.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending data to API:', formData);
      const response = await axios.post(`${API_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log('API response:', response.data);
      setAnalysisResult(response.data);
      fetchPreviousResults(); // Refresh the results list
    } catch (err) {
      console.error('Error analyzing medicine:', err);
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        setError(`Cannot connect to the server at ${API_URL}. Please ensure the Flask server is running.`);
        setApiStatus({
          isChecking: false,
          isOnline: false,
          message: 'API is offline. Please start the Flask server.'
        });
      } else if (err.response) {
        // The server responded with a status code outside the 2xx range
        setError(`Server error (${err.response.status}): ${err.response?.data?.error || 'Unknown error'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection and ensure the server is running.');
      } else {
        setError(`Error: ${err.message || 'An unknown error occurred'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch previous analysis results
  const fetchPreviousResults = async () => {
    if (!apiStatus.isOnline) return;
    
    try {
      const response = await axios.get(`${API_URL}/results`, {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 5000
      });
      console.log('Previous results:', response.data);
      setPreviousResults(response.data);
    } catch (err) {
      console.error('Error fetching previous results:', err);
      // We don't set the main error state here to avoid blocking the form
    }
  };

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setApiStatus({
          isChecking: true,
          isOnline: false,
          message: 'Checking API connection...'
        });
        
        const response = await axios.get(`${API_URL}/health`, {
          timeout: 5000, // Add timeout to prevent long wait if server is down
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('API health check response:', response.data);
        
        if (response.status === 200) {
          setApiStatus({
            isChecking: false,
            isOnline: true,
            message: 'API is online and ready'
          });
          fetchPreviousResults();
        } else {
          setApiStatus({
            isChecking: false,
            isOnline: false,
            message: `API returned unexpected status: ${response.status}`
          });
        }
      } catch (err) {
        console.error('API health check failed:', err);
        setApiStatus({
          isChecking: false,
          isOnline: false,
          message: 'API is offline. Please start the Flask server.'
        });
        setError(`Cannot connect to the analysis service at ${API_URL}. Please ensure the Flask server is running on port 8000.`);
      }
    };
    
    checkApiHealth();
    
    // Set up interval to check API health periodically
    const intervalId = setInterval(checkApiHealth, 30000); // Check every 30 seconds
    
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Get badge color based on result
  const getResultBadgeClass = (result) => {
    return result === 'Pass' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Medicine Quality Analysis
          </h2>
          <p className="text-lg text-slate-600">
            Submit medicine parameters for AI-powered quality analysis
          </p>
          
          {/* API Status Indicator */}
          <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            apiStatus.isChecking 
              ? 'bg-yellow-100 text-yellow-800' 
              : apiStatus.isOnline 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            <span className={`h-2 w-2 rounded-full mr-2 ${
              apiStatus.isChecking 
                ? 'bg-yellow-500 animate-pulse' 
                : apiStatus.isOnline 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
            }`}></span>
            {apiStatus.message}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader className="border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Submit for Analysis</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Enter medicine details and quality parameters
                </p>
              </CardHeader>
              
              <CardContent className="py-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Medicine Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label="Medicine Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Paracetamol"
                      required
                    />
                    <Input
                      label="Batch Number"
                      name="batchNumber"
                      value={formData.batchNumber}
                      onChange={handleChange}
                      placeholder="e.g. B12345"
                      required
                    />
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">Quality Parameters</span>
                    </div>
                  </div>
                  
                  {/* Quality Parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Chemical Stability (0.85-1.0)"
                      name="chemical_stability"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={formData.chemical_stability}
                      onChange={handleChange}
                      placeholder="e.g. 0.95"
                      required
                    />
                    <Input
                      label="Contamination Level (0.0-0.05)"
                      name="contamination_level"
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      value={formData.contamination_level}
                      onChange={handleChange}
                      placeholder="e.g. 0.02"
                      required
                    />
                    <Input
                      label="pH Level (5.0-8.0)"
                      name="ph_level"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={formData.ph_level}
                      onChange={handleChange}
                      placeholder="e.g. 7.2"
                      required
                    />
                    <Input
                      label="Sterility Index (0.95-1.0)"
                      name="sterility_index"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={formData.sterility_index}
                      onChange={handleChange}
                      placeholder="e.g. 0.98"
                      required
                    />
                    <Input
                      label="Temperature Exposure (0.0-0.2)"
                      name="temperature_exposure"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={formData.temperature_exposure}
                      onChange={handleChange}
                      placeholder="e.g. 0.05"
                      required
                    />
                    <Input
                      label="Moisture Content (0.0-0.1)"
                      name="moisture_content"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={formData.moisture_content}
                      onChange={handleChange}
                      placeholder="e.g. 0.03"
                      required
                    />
                  </div>
                  
                  {/* Error message */}
                  {error && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-100">
                      {error}
                    </div>
                  )}
                  
                  <CardFooter className="pt-4 px-0">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={isLoading || !apiStatus.isOnline}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </span>
                      ) : !apiStatus.isOnline ? (
                        "API Offline - Cannot Analyze"
                      ) : (
                        "Analyze Quality"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
            
            {/* API Connection Help */}
            {!apiStatus.isOnline && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                <h4 className="font-medium mb-2">API Connection Instructions:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Open terminal/command prompt</li>
                  <li>Navigate to the <code className="bg-blue-100 px-1 rounded">ai_microservice</code> directory</li>
                  <li>Run the command <code className="bg-blue-100 px-1 rounded">python app2.py</code></li>
                  <li>You should see a message like "Running on http://0.0.0.0:8000"</li>
                  <li>Refresh this page once the server is running</li>
                </ol>
              </div>
            )}
            
          </div>
          
          {/* Results Display */}
          <div className="space-y-6">
            {/* Current Analysis Result */}
            {analysisResult && (
              <Card className="shadow-lg border-2 border-indigo-100">
                <CardHeader className="border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Analysis Result</h3>
                    <span 
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getResultBadgeClass(analysisResult.result)}`}
                    >
                      {analysisResult.result}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="py-4">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm font-medium text-slate-700">
                        Confidence Score
                      </span>
                      <div className="mt-1 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-200">
                          <div
                            style={{ width: `${analysisResult.confidence * 100}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              analysisResult.result === 'Pass' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold inline-block mt-1">
                          {(analysisResult.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="block text-sm font-medium text-slate-700">
                        Explanation
                      </span>
                      <p className="mt-1 text-slate-600 text-sm">
                        {analysisResult.explanation}
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Submitted Parameters</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">Chemical Stability:</span> {formData.chemical_stability}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">Contamination:</span> {formData.contamination_level}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">pH Level:</span> {formData.ph_level}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">Sterility:</span> {formData.sterility_index}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">Temperature:</span> {formData.temperature_exposure}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-slate-500">Moisture:</span> {formData.moisture_content}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Previous Results */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Previous Analyses</h3>
                <p className="text-sm text-slate-500 mt-1">
                  History of medicine quality analyses
                </p>
              </CardHeader>
              
              <CardContent className="py-4">
                {!apiStatus.isOnline ? (
                  <p className="text-slate-500 text-center py-4">Connect to API to view previous analyses</p>
                ) : (
                  <div className="overflow-y-auto max-h-96">
                    {previousResults.length === 0 ? (
                      <p className="text-slate-500 text-center py-4">No previous analyses found</p>
                    ) : (
                      <div className="space-y-3">
                        {previousResults.map((result, index) => (
                          <div 
                            key={index}
                            className="border rounded-lg p-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-slate-900">{result.name}</h4>
                                <div className="text-xs text-slate-500">
                                  Batch: {result.batchNumber} | 
                                  {result.timestamp && ` Analyzed: ${new Date(result.timestamp).toLocaleString()}`}
                                </div>
                              </div>
                              <span 
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${getResultBadgeClass(result.result)}`}
                              >
                                {result.result}
                              </span>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                              <div>
                                <span className="font-medium text-slate-700">Chem:</span> <span className="text-slate-900">{parseFloat(result.chemical_stability).toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Cont:</span> <span className="text-slate-900">{parseFloat(result.contamination_level).toFixed(3)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">pH:</span> <span className="text-slate-900">{parseFloat(result.ph_level).toFixed(1)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Ster:</span> <span className="text-slate-900">{parseFloat(result.sterility_index).toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Temp:</span> <span className="text-slate-900">{parseFloat(result.temperature_exposure).toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-slate-700">Moist:</span> <span className="text-slate-900">{parseFloat(result.moisture_content).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MedicineQualityAnalysis;