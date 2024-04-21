import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the type for context value
interface PinContextType {
  bookmarks: any[];
  addBookmark: (pin: any) => void;
  removeBookmark: (pinId: string) => void;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [bookmarks, setBookmarks] = useState<any[]>([]);

useEffect(() => {
    // Load bookmarks from AsyncStorage or any persistent storage
    // For demonstration, let's assume an initial set of bookmarks
    const initialBookmarks: any[] = []; // Load from storage
    setBookmarks(initialBookmarks);
}, []);

const addBookmark = (pin: any) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, pin]);
};

  const removeBookmark = (pinId: string) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((b) => b.id !== pinId));
  };

  const contextValue: PinContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
  };

  return <PinContext.Provider value={contextValue}>{children}</PinContext.Provider>;
};

export const usePinContext = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error('usePinContext must be used within a PinProvider');
  }
  return context;
};
