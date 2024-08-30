import React from "react";
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer>
      <div class="container">
        <img src={logo} alt="Avatar" style={{ width: "20%", height: "100%" }}></img>
        <p>Custom meal kits designed by CampusEats and other users for delivery to your desired university!</p>
        <ul>
          <ul><Link to="/">
            <a href="/">Home</a>
          </Link></ul>

          <ul><Link to="/about">
            <a href="about">About</a>
          </Link></ul>

          <ul><Link to="/meals">
            <a href="/meals">Meals</a>
          </Link></ul>

          <ul><Link to="/recipes">
            <a href="/recipes">Recipes</a>
          </Link></ul>

          <ul><Link to="/contact">
            <a href="/contact">Contact</a>
          </Link></ul>
        </ul>
      </div>
      <div class="copyright">
      <p>&copy; <script>document.write(new Date().getFullYear())</script> Created by Alliance</p>
    </div>
    </footer>
  );
}