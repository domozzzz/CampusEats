import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import homepage from '../images/Homepage.png'
import Slideshow from "../components/Slideshow";
import '../css/Home.css'
import supabase from "../supabase";
import { CartContext } from "../components/CartContext.js";
import { useAuth } from '../components/AuthProvider.js';


function ScrollButton({ id, children, className }) {
    const scroll = () => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button onClick={scroll} className={className}>
            {children}
        </button>
    );
}

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mealData, setData] = useState(null)
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true)
        const fetchMeals = async () => {
            const {data: d, error: e} = await supabase
                .from('mealLocations')
                .select('*,meals(*, sellers(*)), Locations(*)')
                .neq('meal_id',0)
                .limit(9)
                .order('likes', {ascending: false, foreignTable: 'meals'})
                if (e) {
                    console.log(e)
                    setError(true)
                    setData(null)
                    setLoading(false)
                }
                if (d) {
                    console.log(d)
                    setError(false)
                    setData(d)
                    setLoading(false)
                }     

        }
        fetchMeals()
    }, [])

    const generate_slides = () => {
        var slides = []
        for (let i = 0; i < 3; i++) {
            slides.push(
                <div class="cards">
                    {mealData.slice(i * 3, (i * 3) + 3).map((meal) => {
                        return (
                            <Link to="/marketplace">
                                <div class="card">
                                <img class='card-img' src={meal.meals['photo']} alt="Avatar"></img>
                                <p><strong>{meal.meals['name']}</strong><br />
                              Creator: {meal.meals['sellers'] != null ? meal.meals['sellers']['username'] : "CampusEats"}<br />
                              ♡ {meal.meals['likes']}<br />
                              Location: {meal.Locations['name']}
                            </p>  
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        }
        return slides
    }   
 
    return (
        <div>
            <div class="aboveTheFold">
                <img src={homepage} alt="Homepage" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative", objectFit: "cover"}}></img>
                <div class="title-text">
                    <h1>CampusEats<br />
                        <b>The Solutions for Your Everyday Meals</b><br />
                        Custom meal kits designed by CampusEats and<br />
                        other users for delivery to your desired university.<br />
                    </h1>
                    {user ? '':
                    <div className="button-container">
                        <Link to="/login" className="login-button2">{user ? "": "Login"}</Link>
                        <Link to="/register" className="register-button">{user ? "": "Register"}</Link>
                    </div>}
                    <ScrollButton className="discover-button" id="projects">
                        Discover More<span>&#8595;</span>
                    </ScrollButton>
                </div>
            </div>
            <div class="image-placeholder"></div>
            <section id="projects">
                <h3>Marketplace</h3>
                <p>See below for our more popular dishes. Ready to be delivered to your desired university location.</p>

                <div>
                    {!loading && !error ? <Slideshow slides={generate_slides()} /> : <p>Not yet loaded</p>}
                </div>

                <div class="explore">
                    <Link to="/marketplace" className="explore-button">Explore marketplace <span>&#8594;</span></Link>
                </div>
            </section>
        </div>
    );
}