import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import homepage from '../images/homepage.png'
import '../css/checkout.css'

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
    const location = useLocation()
    {console.log(location)}
    return (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div className='checkout'>
                <h1>Your Cart</h1>

                <div className='checkoutItem'>
                    <img src='' alt="image"></img>
                    <p>Test item<br/>$0.00</p>
                    <div className='increment'>
                        <button>-</button>
                        <p>1</p>
                        <button>+</button> 
                    </div>
                    <p>$0.00</p>
                    <button className='remove'>remove</button>
                </div>
                <button className='checkoutSubmit'>Checkout</button>
            </div>
        </div>
    )
}