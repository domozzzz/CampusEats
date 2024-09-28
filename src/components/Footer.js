import React from "react";
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer>
      <div class="container footer">
        <div className="footer_image">
          <img src={logo} alt="Avatar"></img>
          <p>&copy; <script>document.write(new Date().getFullYear())</script> Created by Alliance</p> 
        </div>
        <h3>Custom meal kits designed by CampusEats and <br/> other users for delivery to your desired university!</h3>
        <ul>
          <li><Link to="/orderMealKit">
            <a href="/">Meal Plan</a>
          </Link></li>

          <li><Link to="/about">
            <a href="about">About Us</a>
          </Link></li>

          <li><Link to="/order">
            <a href="/meals">Meals</a>
          </Link></li>

          <li><Link to="/community">
            <a href="/recipes">Recipes</a>
          </Link></li>
        </ul>
      </div> 
    </footer>
  );
}