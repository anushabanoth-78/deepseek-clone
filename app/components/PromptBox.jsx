'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    console.log('Prompt submitted:', prompt);
    setPrompt('');
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#404045] p-4 rounded-3xl mt-4 transition-all"
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white"
        rows={2}
        placeholder="Message DeepSeek"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className="flex items-center justify-between text-sm mt-2">
        {/* Left buttons */}
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition text-white/70">
            {assets.deepthink_icon && (
              <Image src={assets.deepthink_icon} alt="DeepThink" width={16} height={16} />
            )}
            DeepThink(R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition text-white/70">
            {assets.search_icon && (
              <Image src={assets.search_icon} alt="Search" width={16} height={16} />
            )}
            Search
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          {assets.pin_icon && (
            <Image src={assets.pin_icon} alt="Pin" width={16} height={16} />
          )}

          <button
            type="submit"
            className={`${
              prompt.trim()
                ? 'bg-primary hover:bg-blue-600'
                : 'bg-gray-500 cursor-not-allowed'
            } w-10 h-10 rounded-full transition duration-200 flex items-center justify-center`}
            disabled={!prompt.trim()}
          >
            {assets.send_icon ? (
              <Image
                src={assets.send_icon}
                alt="Send"
                width={16}
                height={16}
                className="object-contain"
              />
            ) : (
              <span className="text-white text-lg font-bold">↑</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
