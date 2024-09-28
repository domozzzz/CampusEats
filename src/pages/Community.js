import homepage from '../images/homepage.png'
import burrito from '../images/burrito.png'
import chickenRice from '../images/chickenRice.png'
import kebab from '../images/kebab.png'
import React, { useState } from 'react';
import "../css/Community.css"

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Likes');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleButtonClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      {!isOpen && (<button 
        className="dropdown-button" 
        onClick={toggleDropdown}
      >
        {selectedValue}
      </button>)}

      {isOpen && (
        <div className="dropdown-content">
          <button
            className="dropdown-button-open" 
          >{selectedValue}</button>
          <button 
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Likes')}
          >
            Likes
          </button>

          <button 
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Most ordered')}
          >
            Most ordered
          </button>

          <button
            className="dropdown-option-button" 
            onClick={() => handleButtonClick('Cost')}
          >
            Cost
          </button>
        </div>
      )}
    </div>
  );
};

export default function About() {

  const [counter, setCounter] = useState(0);

  const inc = () => {
    setCounter(counter + 1 );
  }

  const [seen, setSeen] = useState(false)

  function openPop () {
    setSeen(true);
  };

  function closePop () {
    setSeen(false);
  };


    const Pop = () => {
      return (
        <div className='pop'>
          <button className="exit-button" onClick={closePop}>x</button>
          <h2>Braised Brisket Burrito</h2>
          <img src={burrito} alt="Avatar"></img>

          <table>
            <tr>
              <th>Nutritient</th>
              <th>Amount per Serving</th>
            </tr>
            <tr>
              <td>Calories</td>
              <td>600 grams</td>
            </tr>
            <tr>
              <td>Fats</td>
              <td>400 grams</td>
            </tr>
          </table>

          <div className='pop-info'>
            <h4>Ingredients</h4>
            <p>

              Braised Beef:<br/>
              Lean beef chuck (6 oz)<br/>
              Beef broth (low-sodium)<br/>
              Onions, garlic, and spices (cumin, paprika, etc.)<br/>
              Burrito Components:<br/>
              Whole-grain tortilla (large)<br/>
              Black beans (1/2 cup)<br/>
              Brown rice (1/2 cup)<br/>
              Fresh vegetables (lettuce, tomatoes, bell peppers)<br/>
              Cheese (optional, 1/4 cup)<br/>
              Salsa or pico de gallo (2 tbsp)<br/>
              Avocado or guacamole (optional, 1/4 avocado)</p>
          </div>

          <h4>$14 - 1 serving</h4>
        </div>
      )
    }

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
              <h1>Marketplace</h1>
            <div>
                <p>Welcome to the CampusEats community!<br />
                  Explore meal ideas shared by fellow students, share your own <br />
                  creations and get inspired to eat healthy!<br />
                  Click one of the meals to show more information.<br />
                </p>
                <div className='search-box'>
                  <input type="search" placeholder="Search for ingredient" />
                </div>
                <div className='community-box'>
                  <div className='sub-box'>
                    <h1>Dietry</h1>
                    <ul>
                      <li><input type="checkbox"></input>Gluten-Free</li>
                      <li><input type="checkbox"></input>Vegan</li>
                      <li><input type="checkbox"></input>Vegetarian</li>
                    </ul>

                  </div>
                  <div className='sub-box'>
                    <h1>Nutritients</h1>
                    <ul>
                      <li className='spaced'><input type="text2" /><span>≤ Carbs ≤</span><input type="text2" /></li>
                      <li className='spaced'><input type="text2" /><span>≤ Protein ≤</span><input type="text2" /></li>
                      <li className='spaced'><input type="text2" /><span>≤ Sugars ≤</span><input type="text2" /></li>
                    </ul>
                  </div>
                  <div className='sub-box'>
                    <h1>Location</h1>
                    <ul>
                    <li><input type="checkbox"></input>Any</li>
                    <li><input type="checkbox"></input>Custom<input type="text3" /></li>
                    </ul>
                  </div>
                  <div className='s ub-box'>
                    <Dropdown></Dropdown>
                  </div>

                </div>
              </div>
              <div>
            {seen ? <Pop/> : null}
        </div>
          <div className={`cards ${seen ? 'transparent' : ''}`}>
                  <div class="card" onClick={openPop}>
                            <img src={burrito} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                        <div class="card" onclick="openForm()">
                            <img src={chickenRice} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                        <div class="card">
                            <img src={kebab} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                        <div class="card">
                            <img src={burrito} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                        <div class="card" onclick="openForm()">
                            <img src={chickenRice} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                        <div class="card">
                            <img src={kebab} alt="Avatar"></img>
                            <p>Braised Brisket Burrito<br />
                              Creator: Joseph<br />
                              ♡ 156<br />
                              Location: QUT
                            </p>  
                        </div>
                </div>
            </div>
        </div>
    );
}