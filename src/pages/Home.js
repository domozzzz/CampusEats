import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import burrito from '../images/Burrito.png'
import chickenRice from '../images/Chicken rice.png'
import kebab from '../images/Kebab.png'
import homepage from '../images/homepage.png'
import Slideshow from "../components/Slideshow";

const API_ID = "b5ec2d19"
const API_KEY = "7149eb247720d6f965c3355b860e5d42"

async function getRecipes(name) {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${name}&app_id=${API_ID}&app_key=${API_KEY}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json()
    } catch (error) {
        return {}
    }
}
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

    const [recipes, setRecpipes] = useState([])
    useEffect(() => {
        const result = getRecipes("chicken")
        result.then((data) => {
            setRecpipes(data.hits)
        })
    }, [])

    let slidesV2 = [] 
    
    recipes.forEach((recipe) => {
        slidesV2.push(
        <div class="cards">
            <Link to="/meals" onClick={console.log(recipe.recipe.ingredients)}><div class="card">
                <img src={recipe.recipe.image} alt="Avatar"></img>
                    <p>{recipe.recipe.label}</p>
            </div></Link>
            <Link to="/meals" onClick={console.log(recipe.recipe.ingredients)}><div class="card">
                <img src={recipe.recipe.image} alt="Avatar"></img>
                    <p>{recipe.recipe.label}</p>
            </div></Link>
            <Link to="/meals" onClick={console.log(recipe.recipe.ingredients)}><div class="card">
                <img src={recipe.recipe.image} alt="Avatar"></img>
                    <p>{recipe.recipe.label}</p>
            </div></Link>
        </div>)
    })
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
            <section id="projects">
                <h3>Meal Plan</h3>
                <p>See below for our more popular dishes. Ready to be delivered to your desired university location.</p>

                    <div>
                    <Slideshow slides={slidesV2} />
                </div>

                <div class="explore">
                    <Link to="/meals" className="explore-button">Explore more meal plans <span>&#8594;</span></Link>
                </div>
            </section>
        </div>
    );
}