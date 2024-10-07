import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import homepage from '../images/Homepage.png'
import '../css/Checkout.css'
import { CartContext } from '../components/CartContext';


function removeall(item, remove) {
    for (let i = item.quantity; i > 0; i--) {
        remove(item);
    }
}

function checkoutItem(item, add, remove) {
    return (
        <div className='checkoutItem'>
        <img src={item.image} alt="image"></img>
        <p>{item.name}<br/>${item.cost}</p>
        <div className='increment'>
            <button onClick={() => remove(item)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => add(item)}>+</button> 
        </div>
        <p>${item.cost * item.quantity}</p>
        <button className='remove' onClick={() => removeall(item,remove)}>remove</button>
    </div>
    )
}
export default function Cart() {
    const { cart } = useContext(CartContext);
    const { clearCart } = useContext(CartContext);
    const { addToCart } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);
    console.log(cart);

    return (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div className='checkout'>
                <h1>Your Cart</h1>
                {cart.map((item) => checkoutItem(item, addToCart, removeFromCart))}
                <button className='checkoutSubmit'>Checkout</button>
                <button className='checkoutSubmit' onClick={() => clearCart()}>clear</button>
            </div>
        </div>
    )
}