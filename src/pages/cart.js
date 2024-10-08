import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import homepage from '../images/Homepage.png'
import '../css/Checkout.css'
import { CartContext } from '../components/CartContext.js';
import supabase from "../supabase.js";
import { useAuth } from '../components/AuthProvider.js';
import {v4 as uuidv4} from 'uuid';


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
    const { user } = useAuth();
    console.log(cart);

    const handleSubmit = async() => {
        const orderId = uuidv4();
        const items = cart.map(item => ({
            order_id: orderId,
            meal_id: item.meal_id,
            location: parseInt(item.lid),
            stage: "none",
            complete: false,
            custom_ingredients: item.ingredients,
            quantity: item.quantity,
            buyer_id: user.id,
        }))

        console.log(items);
        const { data: sessionData, error:sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
            console.error("somthing went wrong with session")
        }else {
            console.log(sessionData);
        }
        const {data, error } = await supabase
            .from('orders')
            .insert(items)
            .select()

        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }

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
                <button className='checkoutSubmit' onClick={() => handleSubmit()}>Checkout</button>
                <button className='checkoutSubmit' onClick={() => clearCart()}>clear</button>
            </div>
        </div>
    )
}