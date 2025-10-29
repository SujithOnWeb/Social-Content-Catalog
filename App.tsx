import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import SocialPostCard from './components/SocialPostCard';
import LoadingSpinner from './components/LoadingSpinner';
import { generateSocialPosts } from './services/geminiService';
import { SocialPost, Tone } from './types';

function App() {
  const [idea, setIdea] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPosts, setGeneratedPosts] = useState<SocialPost[]>([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPosts([]);

    try {
      const posts = await generateSocialPosts(idea, tone);
      setGeneratedPosts(posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <section className="mt-8">
          <InputForm
            idea={idea}
            setIdea={setIdea}
            tone={tone}
            setTone={setTone}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </section>

        <section id="results" className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="text-center bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg max-w-2xl mx-auto">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!isLoading && generatedPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-8">
              {generatedPosts.map((post, index) => (
                <SocialPostCard key={index} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
