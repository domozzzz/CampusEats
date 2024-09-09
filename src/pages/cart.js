import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../images/homepage.png'
import '../css/checkout.css'

// function checkoutItem(image, name, cost) {
//     return (

//     )
// }
export default function cart() {

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
                    <img src="" alt="image"></img>
                    <p>Braised Beef Burrito <br/> $14.00</p>
                    <div className='increment'>
                        <button>-</button>
                        <p>1</p>
                        <button>+</button> 
                    </div>
                    <p>$14.00</p>
                    <button className='remove'>remove</button>
                </div>
                <button className='checkoutSubmit'>Checkout</button>
            </div>
        </div>
    )
}