import { useState } from 'react'
import '../css/meals.css'
import homepage from '../images/homepage.png'
import mealtypeActive from '../images/meal_type_green.png'
import mealtypeNonActive from '../images/meal_type_white.png'
import order from "../images/order_white.png"
import preferenceActive from "../images/preferences_green.png"
import preferenceNonActive from '../images/preferences_white.png'

export default function Meals() {
    const [option, setOption] = useState([true, false, false])
    const [mealKit, setMealKit] = useState(true)

    function info() {
        if (mealKit) {
            return <p> Meal kits provide you with all the ingredients needed to cook a meal from scratch.
                    They come with pre-measured ingredients and step-by-step instructions </p>
        } else {
            return <p> Prepared and ready meals are fully cooked and just need reheating. Perfect for
                    busy days when you need a quick, nutritious meal without any prep work</p>
        }

    }
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
                </div>
            <div class="meal">
            <div className="meals-title">
                    <h2>Personalise your Meal Plan</h2>
                    <p>Craft your meals to fit your lifestyle and preferences</p>
            </div>
            </div>
            <div className="meals-logo">
                <button className={option[0] === true ? "active" : "nonActive"}
                onClick={() => setOption([true, false, false])}>
                    <img src ={option[0] ? mealtypeActive : mealtypeNonActive}/>
                    <h3>Meal Type</h3>
                </button>
                <button className={option[1] === true ? "active" : "nonActive"}
                onClick={() => setOption([false, true, false])}>
                    <img src = {option[1] ? preferenceActive : preferenceNonActive}/>
                    <h3>Preferences</h3>
                </button>
                <button className={option[2] === true ? "active" : "nonActive"}
                onClick={() => setOption([false, false, true])}>
                    <img src = {order}/>
                    <h3>Order</h3>
                </button>
            </div>
            <div className="meal-info">
                <div className="meal-info-header">
                    <button className={mealKit === true ? "active" : ''}
                     onClick={() => setMealKit(true)}> Meal Kit </button>
                    <button className={mealKit === false ? "active" : ''}
                    onClick={() => setMealKit(false)}> Prepped & <br/> Ready </button>
                </div>
                {info()}
                <div className="meal-kit-ingredients">
                    <h4>Breakfast</h4>
                    <p>Stuff for breakfast</p>
                </div>
                <div className="meal-kit-ingredients">
                    <h4>Lunch</h4>
                    <p>Stuff for Lunch</p>
                </div>
                <div className="meal-kit-ingredients">
                    <h4>Dinner</h4>
                    <p>Stuff for dinner</p>
                </div>
                <div className="meal-kit-ingredients">
                    <h4>Snack</h4>
                    <p>Stuff for snack</p>
                </div>
            </div>
        </div>
    );
}