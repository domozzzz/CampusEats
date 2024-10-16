import React from "react";
import logo from '../images/Logo.png'
import { Link } from "react-router-dom";
import '../css/Footer.css'

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
          <li><Link to="/orderSearchMap">
            <a href="/orderSearchMap">Order</a>
          </Link></li>

          <li><Link to="/about">
            <a href="about">About Us</a>
          </Link></li>

          <li><Link to="/marketplace">
            <a href="/Community">Marketplace</a>
          </Link></li>
          
          <li><Link to="/TermsAndConditions">
            <a href="/TermsAndConditions">Terms and Conditions</a>
          </Link></li>
        </ul>
      </div>
    </footer>
  );
}