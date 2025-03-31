import React, { useState } from 'react';
import Canvas from './components/Canvas';

const App = () => {
  const [logicExpression, setLogicExpression] = useState('');

  const handleGenerate = () => {
    console.log('Generating circuit for:', logicExpression);
  };

  const handleClear = () => {
    setLogicExpression('');
  };

  return (
    <div className="flex w-full h-screen border-5 justify-end">
      {/* Left Panel - Input */}
      <div className="w-1/3 bg-gray-100 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Logic to Circuit Generator
        </h1>
        
        <div className="flex-grow flex flex-col">
          <label htmlFor="logic-input" className="block mb-2 text-gray-700 text-lg">
            Enter Logic Expression
          </label>
          <textarea 
            id="logic-input"
            className="w-full h-48 p-4 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={logicExpression}
            onChange={(e) => setLogicExpression(e.target.value)}
            placeholder="Enter your logic expression here. 
For example:
(A AND B) OR (NOT C)"
          />
          
          <div className="flex space-x-4 mt-4">
            <button 
              className="flex-1 py-3 text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              onClick={handleGenerate}
              disabled={!logicExpression.trim()}
            >
              Generate Circuit
            </button>
            <button 
              className="flex-1 py-3 text-base bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              onClick={handleClear}
              disabled={!logicExpression.trim()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Canvas */}
      <div className="w-2/3 h-screen aspect-square bg-white p-8 border-10">
        <div className="aspect-square h-full border-5 border-gray-300 rounded-2xl overflow-hidden">
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default App;