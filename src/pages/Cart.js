import React from 'react'
import { useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import homepage from '../images/Homepage.png'
import '../css/Checkout.css'
import { CartContext } from '../components/CartContext.js';
import supabase from "../supabase.js";
import { useAuth } from '../components/AuthProvider.js';
import {v4 as uuidv4} from 'uuid';

/**
 * removes all of 1 item from cart
 * @param {object} item  The item being removed
 * @param {function} remove the function to remove item from cart
 */
function removeall(item, remove) {
    for (let i = item.quantity; i > 0; i--) {
        remove(item);
    }
}

/**
 * Card for item in cart
 * @param {object} item Item
 * @param {function} add function to increase 
 * @param {function} remove function to decrease
 * @returns 
 */
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
    const nav = useNavigate();

    /**
     * Handle what happens when user clicks checkout 
     */
    const handleSubmit = async() => {
        const orderId = uuidv4();               // get new order ID
        const items = cart.map(item => ({       // formate each item to match supabase fields
            order_id: orderId,
            meal_id: item.meal_id,
            location: parseInt(item.lid),
            stage: "none",
            complete: false,
            custom_ingredients: item.ingredients,
            quantity: item.quantity,
            buyer_id: user.id,
        }))

        // const { data: sessionData, error:sessionError } = await supabase.auth.getSession();
        // if (sessionError || !sessionData.session) {
        //     console.error("somthing went wrong with session")
        // }else {
        //     console.log(sessionData);
        // }
        const {data, error } = await supabase //insert cart to order table
            .from('orders')
            .insert(items)
            .select()

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            for (const item of cart) {
                await updatemeal(item)         // call to update amount of times a meal has been ordered
            }
        }

        nav('/payment');
    }

    /**
     * Update the number of times a meal has been ordered in Meal table
     * @param {object} item meal being updated
     */
    const updatemeal = async(item) => {

        // Get how many times it has been ordered
        let {data: meals, error: er} = await supabase
        .from('meals')
        .select('number_of_orders')
        .eq('id',item.meal_id)

        let ordernum = (meals[0].number_of_orders);

        // Insert new value
        const {data: update, error} = await supabase
        .from('meals')
        .update({number_of_orders: ordernum + item.quantity})
        .eq('id',item.meal_id)
        .select()


    }

    return user ? (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div className='checkout'>
                <h1>Your Cart</h1>
                {cart.map((item) => checkoutItem(item, addToCart, removeFromCart))}
                <div className='buttons'>
                    <button className='checkoutSubmit' onClick={() => clearCart()}>clear</button>
                    <button className='checkoutSubmit' onClick={() => handleSubmit()}>Checkout</button>
                </div>
            </div>
        </div>
    ) : <Navigate to='/login'/>
}
