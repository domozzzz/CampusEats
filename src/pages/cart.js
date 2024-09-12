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
export default function Cart(props) {
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

                {checkoutItem(location.state.image, location.state.name, location.state.cost)}
                <button className='checkoutSubmit'>Checkout</button>
            </div>
        </div>
    )
}