import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../images/homepage.png'
import '../css/order.css'

export default function OrderSelect() {
    return (
         <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div class="order" alt="Avatar">
                <h1>Choose your type of meal</h1>
                <div className='orderButtons'>
                    <button>
                        <h3>Meal Kit</h3>
                        <p>Meal kit will be delivered to you in form of 
                            raw ingredients that you can cook yourself!</p>
                    </button>
                    <button>
                        <h3>Prepped <br/>& Ready</h3>
                        <p>Pre-made and ready to eat in just 2 minutes!</p>
                    </button>
                    <button>
                        <h3>Order <br/>One Meal</h3>
                        <p>Order just one pre-made meal from this week's selection</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

