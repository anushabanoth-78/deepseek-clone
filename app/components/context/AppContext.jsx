'use client';
import { createContext, useContext } from 'react';
import { useUser } from '@clerk/nextjs'; // ✅ Using Clerk instead of Auth0

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser(); // ✅ Clerk hook to get user info

  const value = {
    user,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
