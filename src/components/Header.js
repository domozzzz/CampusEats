import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "./AuthProvider";

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={isMenuOpen ? "nav-links open" : "nav-links"}>
          <li className="unpadded">
            <NavLink to="/" onClick={handleLinkClick}>
              <img src={logo} className="logo" alt="Logo" />
            </NavLink>
          </li>
          <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/orderSearchMap" onClick={handleLinkClick}>Order</NavLink></li>
          <li><NavLink to="/upload" onClick={handleLinkClick}>Upload</NavLink></li>
          <li><NavLink to="/marketplace" onClick={handleLinkClick}>Marketplace</NavLink></li>
          <li><NavLink to="/about" onClick={handleLinkClick}>About Us</NavLink></li>
          <li><NavLink to="/cart" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink></li>
          <li><NavLink to="/profile" onClick={handleLinkClick}>
            {user ? "Profile" : "Login"}
          </NavLink></li>
        </ul>
      </nav>
    </div>
  );
}
