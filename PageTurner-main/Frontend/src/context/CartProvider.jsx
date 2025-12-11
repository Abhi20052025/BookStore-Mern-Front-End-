import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("Cart");
    return stored ? JSON.parse(stored) : [];
  });

  const saveCart = (items) => {
    setCart(items);
    localStorage.setItem("Cart", JSON.stringify(items));
  };

  const addToCart = (item) => {
    // Prevent duplicates by isbn13
    if (!cart.find((i) => i.isbn13 === item.isbn13)) {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (isbn13) => {
    saveCart(cart.filter((item) => item.isbn13 !== isbn13));
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); 