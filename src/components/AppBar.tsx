import React from 'react';

const AppBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-500 shadow-lg py-4">
      <div className="container  flex justify-between items-center px-4">
        {/* App logo as an image */}
        <img src="/higgs1.png" alt="App Logo" className="w-56 h-auto" /> 
        
      </div>
    </div>
  );
}

export default AppBar;
