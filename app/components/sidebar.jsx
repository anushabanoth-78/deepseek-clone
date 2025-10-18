'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from './context/AppContext'; // ✅ FIXED IMPORT
import ChatLabel from './ChatLabel'; // ✅ Make sure this file exists: ./ChatLabel.jsx
import { idText } from 'typescript';

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  
  const showLogo = expand ? assets.logo_text : assets.log_icon;
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div className={`flex flex-col justify-between bg-[#212327] transition-all z-50 h-screen ${expand ? 'p-4 w-64' : 'w-16'} duration-300`}>
      <div>
        {/* Logo and Toggle Button */}
        <div className={`flex items-center ${expand ? 'justify-between' : 'justify-center'} mb-6`}>
          {showLogo && (
            <Image
              className={expand ? 'w-36' : 'w-10'}
              src={showLogo}
              alt="Logo"
              width={expand ? 144 : 40}
              height={40}
            />
          )}

          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 rounded-lg cursor-pointer"
          >
            {/* Mobile Menu Icon */}
            {assets.menu_icon && (
              <Image
                src={assets.menu_icon}
                alt="Menu Icon"
                className="md:hidden"
                width={24}
                height={24}
              />
            )}

            {/* Desktop Toggle */}
            {(expand ? assets.sidebar_clse_icon : assets.sidebar_icon) && (
              <Image
                src={expand ? assets.sidebar_clse_icon : assets.sidebar_icon}
                alt="Sidebar Toggle"
                className="hidden md:block w-7"
                width={28}
                height={28}
              />
            )}

            {/* Tooltip */}
            <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
              {expand ? "Close sidebar" : "Open sidebar"}
              <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "left-1/2 top-1.5 -translate-x-1/2" : "left-4 -bottom-1.5"}`} />
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button className={`relative flex items-center cursor-pointer group ${expand ? "bg-primary hover:opacity-90 rounded-xl gap-2 px-4 py-2 w-full" : "justify-center mb-4"}`}>
          {(expand ? assets.chart_icon : assets.chat_icon_dull) && (
            <Image
              src={expand ? assets.chart_icon : assets.chat_icon_dull}
              alt="New Chat"
              width={28}
              height={28}
            />
          )}
          {expand && <span className="text-white font-medium">New Chat</span>}

          {/* Tooltip */}
          {!expand && (
            <div className="absolute w-max -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
              New chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-1/2 -bottom-1.5 -translate-x-1/2"></div>
            </div>
          )}
        </button>

        {/* Recents Section */}
        {expand && (
          <div className="mt-6 text-white/40 text-sm">
            <p className='mb-2'>Recents</p>
            <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
            {/* Add recents items here if needed */}
          </div>
        )}
      </div>

      {/* Bottom Section (Phone and QR) */}
      <div>
        <div className="relative group mb-4">
          {/* Phone Icon */}
          <div className={`flex items-center justify-center mx-auto cursor-pointer ${expand ? "gap-2 text-white/80 text-sm p-2.5 border-primary rounded-lg hover:bg-white/10 w-full justify-start" : "h-10 w-10 hover:bg-gray-500/30 rounded-lg"}`}>
            {(expand ? assets.phone_icon : assets.phone_icone_dull) && (
              <Image
                src={expand ? assets.phone_icon : assets.phone_icone_dull}
                alt="Phone Icon"
                width={24}
                height={24}
              />
            )}
            {expand && <span>Mobile App</span>}
          </div>

          {/* QR Code Popup */}
          <div className={`absolute ${expand ? "left-1/2 -translate-x-1/2 bottom-16" : "left-14 bottom-16"} z-50 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-all duration-300`}>
            <div className='relative bg-black text-white text-sm p-3 rounded-lg shadow-lg w-max'>
              {assets.qrcode && (
                <Image src={assets.qrcode} alt="QR Code" className='w-44 mx-auto' width={176} height={176} />
              )}
              <p className="mt-2 text-center">Scan to get Deepseek App</p>
              <div className="w-3 h-3 absolute bg-black rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
            </div>
          </div>

          {/* Get App Text */}
          {expand && (
            <div className="flex items-center gap-2 mt-3 text-white/80 text-sm">
              <span>Get App</span>
              {assets.new_icon && <Image alt='New Icon' src={assets.new_icon} width={20} height={20} />}
            </div>
          )}
        </div>

        {/* ✅ Profile Section */}
        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg justify-start' : 'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mb-2 cursor-pointer`}
        >
          {user ? (
            <UserButton />
          ) : (
            assets.profile_icon && (
              <Image
                src={assets.profile_icon}
                alt="Profile Icon"
                className="w-7"
                width={28}
                height={28}
              />
            )
          )}
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
