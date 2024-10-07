import React from "react";
import { Link } from "react-router-dom";

import homepage from '../images/Homepage.png'
import Slideshow from "../components/Slideshow";
import '../css/Home.css'
import { useState, useEffect, useContext } from "react";
import supabase from "../supabase";
import { CartContext } from "../components/CartContext.js";


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
    const [error,setError] = useState(false)
    const [mealData, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchMeals = async () => {
            const {data: d, error: e} = await supabase
                .from('meals')
                .select('*,sellers(*)')
                .neq('id',0)
                .limit(9)
                .order('likes', {ascending: false})
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
    },[])

    const generate_slides = () => {
        var slides = []
        for (let i = 0; i < 3; i++) {
            slides.push(
                <div class="cards">
                    {mealData.slice(i*3,(i*3)+3).map((meal) => {
                        return (
                            <Link to="/meals">
                                <div class="card">
                                <img src={meal.photo} alt="Avatar"></img>
                                <p>{meal.name}<br />
                              Creator: {meal['sellers'] != null ? meal['sellers']['username'] : "CampusEats"}<br />
                              ♡ {meal.likes}<br />
                              Location: QUT
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
    // const slides = [
    //     <div class="cards">
    //       <Link to="/meals">
    //         <div class="card">
    //           <img src={burrito} alt="Avatar"></img>
    //               <p>Braised Brisket Burrito</p>
    //         </div>
    //       </Link>
    //       <Link to="/meals"><div class="card">
    //           <img src={chickenRice} alt="Avatar"></img>
    //               <p>Hainanese Chicken Rice</p>
    //       </div></Link>
    //       <Link to="/meals"><div class="card">
    //           <img src={kebab} alt="Avatar"></img>
    //               <p>Adana Kebab</p>
    //       </div></Link>
    //   </div>,
    //     <div class="cards">
    //     <Link to="/meals"><div class="card">
    //         <img src={burrito} alt="Avatar"></img>
    //             <p>Braised Brisket Burrito</p>
    //     </div></Link>
    //     <Link to="/meals"><div class="card">
    //         <img src={chickenRice} alt="Avatar"></img>
    //             <p>Hainanese Chicken Rice</p>
    //     </div></Link>
    //     <Link to="/meals"><div class="card">
    //         <img src={kebab} alt="Avatar"></img>
    //             <p>Adana Kebab</p>
    //     </div></Link>
    // </div>,
    //   ];
    //console.log(slides)
    return (
        <div>
            <div class="aboveTheFold">
                <img src={homepage} alt="Homepage" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                <div class="title-text">
                    <h1>CampusEats<br />
                        <b>The Solutions for Your Everyday Meals</b><br />
                        Custom meal kits designed by CampusEats and<br />
                        other users for delivery to your desired university.<br />
                    </h1>
                    <div>
                        <Link to="/login" className="login-button2">Login</Link>
                        <Link to="/register" className="register-button">Register</Link>
                        <ScrollButton className="discover-button" id="projects">
                            Discover More<span>&#8595;</span>
                        </ScrollButton>
                    </div>
                </div>
            </div>
            <div class="image-placeholder"></div>
            <section id="projects">
                <h3>Meal Plan</h3>
                <p>See below for our more popular dishes. Ready to be delivered to your desired university location.</p>

                    <div>
                        {!loading && !error ? <Slideshow slides={generate_slides()}/> : <p>Not yet loaded</p>}
                </div>

                <div class="explore">
                    <Link to="/meals" className="explore-button">Explore more meal plans <span>&#8594;</span></Link>
                </div>
            </section>
        </div>
    );
}