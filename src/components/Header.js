import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";


export default function Header() {

  return (
    <div>
      <nav>
        <ul>
          <li class="unpadded"><NavLink to = "/"><img src={logo}  class="logo" alt="Logo"/></NavLink></li>
          <li><NavLink to = "/">Home</NavLink></li>
          <li><NavLink to = "/order">Order</NavLink></li>
          <li><NavLink to = "/meals">Upload</NavLink></li>
          <li><NavLink to = "/community">Community</NavLink></li>
          <li><NavLink to = "/about">About Us</NavLink></li>
          <li><NavLink to = "/profile">Profile</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}