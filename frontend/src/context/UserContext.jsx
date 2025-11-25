import React, { createContext, useState } from 'react';

// 1. Create the context object
export const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  // This state will hold the user's data
  const [user, setUser] = useState(null);

  // The provider makes the user data and the function to update it
  // available to all child components.
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};