import React, { useState } from 'react';
import { SocialPost } from '../types';
import { PLATFORMS } from '../constants';

interface SocialPostCardProps {
  post: SocialPost;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const platformInfo = PLATFORMS.find(p => p.name === post.platform);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAspectRatioClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-[16/9]';
      case '3:4':
        return 'aspect-[3/4]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <header className={`flex items-center p-4 ${platformInfo?.color}`}>
        <div className="w-8 h-8">{platformInfo?.icon}</div>
        <h2 className="ml-3 text-2xl font-bold text-white">{post.platform}</h2>
      </header>

      <div className="flex flex-col lg:flex-row p-4 gap-4">
        <div className="lg:w-1/2">
            <div className={`w-full ${getAspectRatioClass(post.aspectRatio)} rounded-lg overflow-hidden bg-secondary-bg`}>
                 <img src={post.imageUrl} alt={`${post.platform} post image`} className="w-full h-full object-cover"/>
            </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-grow bg-secondary-bg p-4 rounded-lg h-64 overflow-y-auto">
            <p className="text-gray-300 whitespace-pre-wrap">{post.text}</p>
          </div>
          <button
            onClick={handleCopy}
            className="mt-4 w-full bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Copied!
              </>
            ) : (
                <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy Text
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;