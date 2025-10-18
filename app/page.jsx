'use client';
import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import Sidebar from './components/sidebar';
import PromptBox from './components/PromptBox';
import { Message } from './components/Message'; // Assuming you have a Message component

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          {/* Mobile Top Bar */}
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            {assets.menu_icon && (
              <Image
                onClick={() => setExpand(!expand)}
                className={`transition-transform duration-300 ${expand ? 'rotate-180' : ''}`}
                src={assets.menu_icon}
                alt="Menu Icon"
                width={32}
                height={32}
              />
            )}
            {assets.chart_icon && (
              <Image
                className="opacity-70"
                src={assets.chart_icon}
                alt="Chart Icon"
                width={32}
                height={32}
              />
            )}
          </div>

          {/* Welcome Screen */}
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={assets.logo_icon}
                  alt="Logo Icon"
                  className="h-16"
                  width={64}
                  height={64}
                />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div>
              {/* Render a message */}
              <Message role="user" content="What is next.js" />
            </div>
          )}

          {/* Prompt Input Box */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          {/* Footer Note */}
          <p className="text-xs absolute bottom-1 text-gray-500">
            AI-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
