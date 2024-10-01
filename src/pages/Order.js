import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../images/homepage.png';
import clock from '../images/clock.png';
import search from '../images/search.png';
import '../css/Order.css'

export default function OrderSelect() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div class="order-choice">
                <h1>Order</h1>
                <div className='orderChoiceButtons'>
                <span className="grey-button">
                    <Link to="/orderMealKit"><button>
                        <img src={clock} style={{height: "150px"}}></img>
                        <h3>Custom Meal Kit</h3>
                        <p>Create a quick, custom meal-kit. Set your own base,
                            protein and vegetables ready to order at any location.</p>
                    </button></Link>
                    </span>
                    <span className="green-button">
                    <Link to="/orderPreMade"><button>
                        <img src={search} style={{height: "140px"}}></img>
                        <h3 style={{color: "white"}}>Search Meal-kits</h3>
                        <p style={{color: "white"}}>Search through custom Meal-kits made by the
                            CampusEats team or other users!</p>
                    </button></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

