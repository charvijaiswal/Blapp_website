import React, { createContext, useContext, useState } from 'react';

// Create context
const BookmarkContext = createContext<any>(null);

// Custom hook to use bookmark context
export const useBookmarkContext = () => useContext(BookmarkContext);

// Provider component to wrap your application with
export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const addBookmark = (pin: any) => {
    setBookmarks([...bookmarks, pin]);
  };

  const removeBookmark = (pinId: string) => {
    setBookmarks(bookmarks.filter((pin) => pin.id !== pinId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
