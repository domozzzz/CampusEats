import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../images/Homepage.png';
import clock from '../images/Clock.png';
import search from '../images/Search.png';
import '../css/Order.css'
import { Navigate} from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { useParams } from 'react-router-dom';

/**
 * React component to render page for chosing between custom mealkit or searching pre-made
 * @returns 
 */
export default function OrderSelect() {

    const { user } = useAuth()
    const {LID} = useParams()
    return user ? (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div class="bg">
                <h1>Step 2: Choose you order type</h1>
                <div className='orderChoiceButtons'>
                <span className="grey-button">
                    <Link to={`/customMealKit/${LID}`}><button>
                        <img src={clock} class='clock-img'></img>
                        <h3>Custom Meal Kit</h3>
                        <p>Create a quick, custom meal-kit. Set your own base,
                            protein and vegetables ready to order at any location.</p>
                    </button></Link>
                    </span>
                    <span className="green-button">
                    <Link to={`/orderSearchMealKit/${LID}`}><button>
                        <img src={search} class='search-img'></img>
                        <h3 style={{color: "white"}}>Search Meal-kits near me</h3>
                        <p style={{color: "white"}}>Search through custom Meal-kits made by the
                            CampusEats team or other users!</p>
                    </button></Link>
                    </span>
                </div>
            </div>
        </div>
    ) : <Navigate to='/login'/>
}