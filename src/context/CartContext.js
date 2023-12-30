// CartContext.js
import React, { createContext, useContext, useState } from "react";
import { makeApiCall } from "../utils/utils";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children, isDarkMode, toggleDarkMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [showOffProductDetails, setShowOffProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDetailsLoading, setDetailsLoader] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const fetchProductData = async (productId) => {
    setDetailsLoader(true);
    const response = await makeApiCall(`/products/${productId}`);
    setProductDetails(response);
    setDetailsLoader(false);
  };

  const handleProductDetailsShow = (productId) => {
    fetchProductData(productId);
    setShowOffProductDetails(true);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isDarkMode,
        toggleDarkMode,
        showOffProductDetails,
        setShowOffProductDetails,
        productDetails,
        isDetailsLoading,
        setProductDetails,
        setDetailsLoader,
        handleProductDetailsShow,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
