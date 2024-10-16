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
        setCart((prevCart) => {
            const existing = prevCart.find((items) => items.meal_id === item.meal_id);
            if (existing) {
                return prevCart.map((items) => items.meal_id === item.meal_id ? {...items, quantity: items.quantity + 1} : items);
            } else {
                return [...prevCart, item];
            }
        });
    };

    const removeFromCart = (item) => {
        setCart((prevCart) => {
            const existing = prevCart.find((items) => items.meal_id === item.meal_id);
            if (existing) {
                const multiple = existing.quantity > 1;
                if (multiple) {
                    console.log("removing one");
                    return prevCart.map((items) => items.meal_id === item.meal_id ? {...items, quantity: items.quantity - 1} : items);
                } else {
                    return prevCart.filter((items) => items.meal_id !== item.meal_id);
                }
            }
        })
    }

    const clearCart = () => {
        console.log("clearingCart");
        setCart([]);
    }
  
    // Save cart to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  
    return (
      <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };