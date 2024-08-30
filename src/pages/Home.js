import React from "react";
import { Link } from "react-router-dom";
import burrito from '../images/Burrito.png'
import chickenrRice from '../images/Chicken rice.png'
import kebab from '../images/Kebab.png'
import homepage from '../images/homepage.png'
import Slideshow from "../components/Slideshow";

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
    const slides = [
        <div class="cards">
        <div class="card">
            <img src={burrito} alt="Avatar"></img>
                <Link to="/meals" className="register-button">Braised Brisket Burrito</Link>
        </div>
        <div class="card">
            <img src={chickenrRice} alt="Avatar"></img>
                <Link to="/meals" className="register-button">Hainanese Chicken Rice</Link>
        </div>
        <div class="card">
            <img src={kebab} alt="Avatar"></img>
                <Link to="/meals" className="register-button">Adana Kebab</Link>
        </div>
    </div>,
                    <div class="cards">
                    <div class="card">
                        <img src={burrito} alt="Avatar"></img>
                            <Link to="/meals" className="register-button">Braised Brisket Burrito</Link>
                    </div>
                    <div class="card">
                        <img src={chickenrRice} alt="Avatar"></img>
                            <Link to="/meals" className="register-button">Hainanese Chicken Rice</Link>
                    </div>
                    <div class="card">
                        <img src={kebab} alt="Avatar"></img>
                            <Link to="/meals" className="register-button">Adana Kebab</Link>
                    </div>
                </div>,
      ];
    return (
        <div>
            <div class="welcome">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                <div class="title">
                    <h1>CampusEats<br></br>
                        <b>The Solutions for Your Everyday Meals</b><br/>
                        Custom meal kits designed by CampusEats and<br/>
                        other users for delivery to your desired university.<br/>
                    </h1>
                    <div>
                        <Link to="/login" className="login-button">Login</Link>
                        <Link to="/" className="register-button">Register</Link>
                        <ScrollButton className="discover-button" id="projects">Discover More<span>&#8595;</span></ScrollButton>
                    </div>
                </div>
            </div>
            <div class="image-placeholder"></div>
            <section id="projects">
                <h3>Meal Plan</h3>
                <p>See below for our more popular dishes. Ready to be delivered to your desired university location.</p>

                    <div>
                    <Slideshow slides={slides} />
                </div>

                <div class="explore">
                    <Link to="/meals" className="explore-button">Explore more meal plans <span>&#8594;</span></Link>
                </div>
            </section>
        </div>
    );
}