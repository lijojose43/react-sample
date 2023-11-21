// AppContext.js
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const handleCartShow = (status) => {
    setShowCart(status);
  };

  return (
    <AppContext.Provider
      value={{ cartCount, showCart, updateCartCount, handleCartShow }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
