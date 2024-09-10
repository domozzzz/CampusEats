import homepage from '../images/homepage.png'
import { Link } from 'react-router-dom';
import burrito from '../images/Burrito.png'
import chickenRice from '../images/Chicken rice.png'
import kebab from '../images/Kebab.png'
import React, { useState } from 'react';

function PopUpMenu() {
    return (
      <ul className="drop-down">
        <li>Menu-item-1</li>
        <li>Menu-item-2</li>
        <li>Menu-item-3</li>
      </ul>
    );
  }

const Dropdown = () => {
  // State to manage the dropdown visibility and selected value
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Popular');

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selecting a dropdown option
  const handleButtonClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="dropdown">
      <button 
        className="dropdown-button" 
        onMouseOver={toggleDropdown}
      >
        {selectedValue} <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {isOpen && (
        <div className="dropdown-content">

          <button 
            to="/order" 
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Popular')}
          >
            Popular
          </button>

          <button 
            to="/order" 
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Price')}
          >
            Price
          </button>

          <button
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Nutritional')}
          >
            Nutritional
          </button>
        </div>
      )}
    </div>
  );
};

export default function About() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                    <div class="title">
                        <h1>About Us</h1>
                    </div>
                </div>
            </div>
            <div class="order">
                <h1>Order One Meal</h1>
                <div class="strip">
                    <Link to="/cart" className="cart-button">Cart: 0</Link>
                    <Dropdown></Dropdown>
                </div>
                <div class="cards">
                    <Link to="/meals">
                        <div class="card">
                            <img src={burrito} alt="Avatar"></img>
                            <p>Braised Brisket Burrito</p>
                        </div>
                    </Link>
                    <Link to="/meals">
                        <div class="card">
                            <img src={chickenRice} alt="Avatar"></img>
                            <p>Hainanese Chicken Rice</p>
                        </div>
                    </Link>
                    <Link to="/meals">
                        <div class="card">
                            <img src={kebab} alt="Avatar"></img>
                            <p>Adana Kebab</p>
                        </div>
                    </Link>
                    <Link to="/meals">
                        <div class="card">
                            <img src={burrito} alt="Avatar"></img>
                            <p>Braised Brisket Burrito</p>
                        </div>
                    </Link>
                    <Link to="/meals">
                        <div class="card">
                            <img src={chickenRice} alt="Avatar"></img>
                            <p>Hainanese Chicken Rice</p>
                        </div>
                    </Link>
                    <Link to="/meals">
                        <div class="card">
                            <img src={kebab} alt="Avatar"></img>
                            <p>Adana Kebab</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}