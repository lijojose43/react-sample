// CartContext.js
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { makeApiCall } from "../utils/utils";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children, isDarkMode, toggleDarkMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showOffProductDetails, setShowOffProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDetailsLoading, setDetailsLoader] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const handleCartShow = (status) => {
    setShowCart(status);
  };

  const fetchProductData = async (productId) => {
    setDetailsLoader(true);
    const response = await makeApiCall(`/products/${productId}`);
    setProductDetails(response);
    setDetailsLoader(false);
  };

  const updateCartItems = (cartItems) => {
    setCartItems(cartItems);
    updateCartCount(cartItems.length);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleProductDetailsShow = (productId) => {
    fetchProductData(productId);
    setShowOffProductDetails(true);
  };

  const addToCart = (productDetails) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.id === productDetails.id
    );
    if (itemIndex === -1) {
      productDetails.quantity = 1;
      const cartData = [...cartItems, productDetails];
      updateCartItems(cartData);
      toast.success("Cart updated!");
    } else {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + 1, // Or update other properties
      };
      updateCartItems(updatedCart);
      toast.success("Cart updated!");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        showCart,
        isDarkMode,
        updateCartCount,
        handleCartShow,
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
        addToCart,
        updateCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
