import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Social Content Catalyst
      </h1>
      <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
        Your AI-powered partner for creating engaging cross-platform social media campaigns from a single idea.
      </p>
    </header>
  );
};

export default Header;
