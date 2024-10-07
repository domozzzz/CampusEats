import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load initial cart from localStorage or use an empty array if no cart is stored
    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });
  
    // Add an item to the cart
    const addToCart = (item) => {
        console.log("adding", item);
      setCart((prevCart) => [...prevCart, item]); // Simply add the item to the cart
      console.log(cart);
    };

    const clearCart = () => {
        console.log("clearingCart");
        setCart([]);
    }
  
    // Save cart to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  
    return (
      <CartContext.Provider value={{ cart, addToCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };