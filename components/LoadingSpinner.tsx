import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 my-8">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
    <p className="text-gray-300 font-medium">Generating content... this may take a moment.</p>
  </div>
);

export default LoadingSpinner;
