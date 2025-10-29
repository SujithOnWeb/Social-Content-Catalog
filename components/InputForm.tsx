import React from 'react';
import { Tone } from '../types';

interface InputFormProps {
  idea: string;
  setIdea: (idea: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ idea, setIdea, tone, setTone, onSubmit, isLoading }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <div>
        <label htmlFor="idea" className="block text-lg font-medium text-gray-300 mb-2">
          Your Core Idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., Launching a new eco-friendly coffee subscription box..."
          className="w-full h-32 p-3 bg-secondary-bg border-2 border-card-bg rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200 resize-none"
          required
        />
      </div>
      <div>
        <label htmlFor="tone" className="block text-lg font-medium text-gray-300 mb-2">
          Select a Tone
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className="w-full p-3 bg-secondary-bg border-2 border-card-bg rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
        >
          {Object.values(Tone).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="px-8 py-3 text-lg font-semibold text-white bg-accent rounded-lg shadow-lg hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Catalyze Content'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
