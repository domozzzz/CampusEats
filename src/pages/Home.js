import React from "react";
import { Link } from "react-router-dom";
import burrito from '../images/Burrito.png'
import chickenRice from '../images/Chicken rice.png'
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
          <Link to="/meals"><div class="card">
              <img src={burrito} alt="Avatar"></img>
                  <p>Braised Brisket Burrito</p>
          </div></Link>
          <Link to="/meals"><div class="card">
              <img src={chickenRice} alt="Avatar"></img>
                  <p>Hainanese Chicken Rice</p>
          </div></Link>
          <Link to="/meals"><div class="card">
              <img src={kebab} alt="Avatar"></img>
                  <p>Adana Kebab</p>
          </div></Link>
      </div>,
        <div class="cards">
        <Link to="/meals"><div class="card">
            <img src={burrito} alt="Avatar"></img>
                <p>Braised Brisket Burrito</p>
        </div></Link>
        <Link to="/meals"><div class="card">
            <img src={chickenRice} alt="Avatar"></img>
                <p>Hainanese Chicken Rice</p>
        </div></Link>
        <Link to="/meals"><div class="card">
            <img src={kebab} alt="Avatar"></img>
                <p>Adana Kebab</p>
        </div></Link>
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
                        <Link to="/login" className="home-login-button">Login</Link>
                        <Link to="/register" className="register-button">Register</Link>
                        <ScrollButton className="discover-button" id="projects">Discover More<span>&#8595;</span></ScrollButton>
                    </div>
                </div>
            </div>
            <div class="image-placeholder"></div>
            <div class="projects">
                <h3>Meal Plan</h3>
                <p>See below for our more popular dishes. Ready to be delivered to your desired university location.</p>

                    <div>
                    <Slideshow slides={slides} />
                </div>

                <div class="explore">
                    <Link to="/meals" className="explore-button">Explore more meal plans <span>&#8594;</span></Link>
                </div>
            </div>
        </div>
    );
}