import React from 'react'
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
            <div class="order-meal-kit">
                <h1>Meal kit</h1>
                <p style={{ color: 'black' }}>Raw ingredients and easy to follow recipes for home cooked meals. <br />
                 Want to see the menu for this week’s meal kit? Click Here.</p>

                 <div class="meal-kit-container">

                    <div className="meal-kit-info-left">
                        <h2>1. Choose your preferences</h2>
                        <p>Choose any preferences that you want.</p>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Quick and Easy</h3>
                            <p>Meals designed for minimal preparation and cooking time.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Vegetarian</h3>
                            <p>Meals that exclude meat but may include dairy and eggs.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Vegan</h3>
                            <p>Meals that exclude meat but may include dairy and eggs.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Healthy and Balanced</h3>
                            <p>Meals focusing on balanced nutrition with a mix of protein, carbs, and healthy fats.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Gluten-Free</h3>
                            <p>Meals that do not contain gluten, suitable for those with gluten sensitivity or celiac disease.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>Low-Carb</h3>
                            <p>Meals that are lower in carbohydrates, ideal for those following a low-carb diet.</p>
                        </label>

                        <label class="order-container">
                            <input type="checkbox"></input>
                            <span class="checkmark"></span>
                            <h3>High-Protein</h3>
                            <p>Meals rich in protein, suitable for muscle building or satisfying hunger.</p>
                        </label>
                    </div>

                    <div className="split-right">
                        <div className="meal-kit-info-right">
                        <h2>2. Select your plan</h2>
                        <div className="servings-container">
                        <p>Servings per meal </p>
                        <ul className="serving-select">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            </ul>
                            </div>

                    </div>

                    <div className="meal-kit-info-right">
                        <h2>Order summary</h2>
                        <p style={{textAlign: "left"}}>Price per meal
                            <span style={{float:"right", paddingRight:"30px"}}>
                                $5
                            </span>
                        </p>
                        <p style={{textAlign: "left"}}>1 Serving
                            <span style={{float:"right", paddingRight:"30px"}}>
                                $50
                            </span>
                        </p>
                        <p style={{textAlign: "left", fontWeight: "bold"}}> Subtotal (incl. GST)
                            <span style={{float:"right", paddingRight:"30px"}}>
                                $60
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}