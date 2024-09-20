import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../images/homepage.png'
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
                <h1>Choose your type of meal</h1>
                <div className='orderChoiceButtons'>
                    <Link to="/orderMealKit"><button>
                        <h3>Meal Kit</h3>
                        <p>Meal kit will be delivered to you in form of 
                            raw ingredients that you can cook yourself!</p>
                    </button></Link>
                    <Link to="/orderPreMade"><button>
                        <h3>Pre-Made</h3>
                        <p>Order just one pre-made meal from this week’s selection</p>
                    </button></Link>
                    <button>
                        <h3>Custom Meal</h3>
                        <p>Customise a meal based on your preferences.</p>
                    </button>
                    <button>
                        <h3>Community <br/>Meals</h3>
                        <p>Meals uploaded by the CampusEats community</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

