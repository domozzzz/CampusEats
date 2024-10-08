import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


export default function Header() {

  return (
    <div>
      <nav>
        <ul>
          <li class="unpadded"><NavLink to = "/"><img src={logo}  class="logo" alt="Logo"/></NavLink></li>
          <li><NavLink to = "/">Home</NavLink></li>
          <li><NavLink to = "/orderSearchMap">Order</NavLink></li>
          <li><NavLink to = "/upload">Upload</NavLink></li>
          <li><NavLink to = "/marketplace">Marketplace</NavLink></li>
          <li><NavLink to = "/about">About Us</NavLink></li>
          <li><NavLink to = "/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink></li>
          <li><NavLink to = "/profile">Profile</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}