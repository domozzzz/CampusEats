import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import homepage from '../images/Homepage.png'
import '../css/Checkout.css'
import { CartContext } from '../components/CartContext';

function checkoutItem(image, name, cost) {
    return (
        <div className='checkoutItem'>
        <img src={image} alt="image"></img>
        <p>{name}<br/>${cost}</p>
        <div className='increment'>
            <button>-</button>
            <p>1</p>
            <button>+</button> 
        </div>
        <p>${cost}</p>
        <button className='remove'>remove</button>
    </div>
    )
}
export default function Cart() {
    const { cart } = useContext(CartContext);
    const { clearCart } = useContext(CartContext);
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
                {cart.map((item) => checkoutItem(1, item.name, item.cost))}
                <button className='checkoutSubmit'>Checkout</button>
                <button className='checkoutSubmit' onClick={() => clearCart()}>clear</button>
            </div>
        </div>
    )
}