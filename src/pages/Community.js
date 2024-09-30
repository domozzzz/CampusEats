import homepage from '../images/homepage.png'
import burrito from '../images/burrito.png'
import chickenRice from '../images/chickenRice.png'
import kebab from '../images/kebab.png'
import React, { useState, useEffect } from 'react';
import "../css/Community.css"
import supabase from '../supabase';

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

export default function Community() {

  const [counter, setCounter] = useState(0);

  const [dietary, setDietary] = useState({
    gf: false,
    vegetarian: false,
    vegan: false,
  })
  const [calories, setCalories] = useState({
    low: -1,
    high: 9999
  })
  const [sugars, setSugars] = useState({
    low: -1,
    high: 9999
  })
  const [protein, setProtein] = useState({
    low: -1,
    high: 9999
  })

  const [orderBy, setOrderBy] = useState('likes')

  const [results, setResults] = useState([])
  const [Ingredients, setIngredients] = useState({
    name: null,
    image: null,
    ingredients: null,
    nutrition: null
  })
  const [error, setError] = useState(null)

  const inc = () => {
    setCounter(counter + 1 );
  }

  const [seen, setSeen] = useState(false)

  async function openPop(event) {
    const meal = results.find(meal => meal.id == event.target.name)
    const {data, error} = await supabase
    .from('nutrition')
    .select('*')
    .eq('meal_id',meal.id)

    if (data) {
      setIngredients({
        name: meal.name,
        image: meal.photo,
        ingredients: meal.ingredients,
        nutrition: data[0],
        cost: meal.price
      })
      setError(null)
      setSeen(true);
    }

    if (error) {
      setError("There was an error retrieving nutrtional info for this meal.")
      console.log(error)
    }
  };

  function closePop () {
    setSeen(false);
  };

  const set_dietary_option = (e) => {
    if (e.target.checked) {
      setDietary({...dietary,[e.target.name]: true})
      console.log(dietary.vegan)
    } else {
      setDietary({...dietary,[e.target.name]: false})
    }
  }

  const set_min_calorie = (e) => {
    setCalories({...calories, ['low']: parseFloat(e.target.value)})
  }

  const set_max_calorie = (e) => {
    setCalories({...calories, ['high']: parseFloat(e.target.value)})
  }

  const set_min_protein = (e) => {
    setProtein({...protein, ['low']: parseFloat(e.target.value)})
  }

  const set_max_protein = (e) => {
    setProtein({...protein, ['high']: parseFloat(e.target.value)})
  }  

  const set_min_sugars = (e) => {
    setSugars({...sugars, ['low']: parseFloat(e.target.value)})
  }

  const set_max_sugars = (e) => {
    setSugars({...sugars, ['high']: parseFloat(e.target.value)})
  }
  
  useEffect(() => {
    const getResults = async () => {
      const {data, error} = await supabase
      .from('meals')
      .select('*,nutrition(*)')
      .neq('id',0)
      .lte('nutrition.Sugars',sugars.high)
      .lte('nutrition.Calories',calories.high)  
      .lte('nutrition.Protein',protein.high)
      .gte('nutrition.Sugars',sugars.low)
      .gte('nutrition.Calories',calories.low)  
      .gte('nutrition.Protein',protein.low)          
      if (data) {
        const result = data.filter((mealkit) => {
          const vegan = () => {
            if (dietary.vegan == true) {
              return mealkit.vegan == true
            }
            return true
          }

          const gf = () => {
            if (dietary.gf == true) {
              return mealkit.gf == true
            }
            return true
          }

          const vegetarian = () => {
            if (dietary.vegetarian == true) {
              return mealkit.vegetarian == true
            }
            return true
          }
          return mealkit.nutrition !=null && vegan() && gf() && vegetarian()
        })
         setResults(result)
      }
  
      if (error) {
        console.log(error)
      }
    }

    getResults()
  },[dietary, calories, sugars, protein, orderBy])
    const Pop = () => {
      return (
        <div className='pop'>
          <button className="exit-button" onClick={closePop}>x</button>
          <h2>{Ingredients.name}</h2>
          <img src={Ingredients.image} alt="Avatar"></img>

          <table>
            <tr>
              <th>Nutritient</th>
              <th>Amount per Serving</th>
            </tr>
            <tr>
              <td>Calories</td>
              <td>{Ingredients.nutrition.Calories} grams</td>
            </tr>
            <tr>
              <td>Total Fats</td>
              <td>{Ingredients.nutrition.total_fats} grams</td>
            </tr>
            <tr>
              <td>Saturated Fats</td>
              <td>{Ingredients.nutrition.saturated_fats} grams</td>
            </tr>
            <tr>
              <td>Trans fats</td>
              <td>{Ingredients.nutrition.trans_fats} grams</td>
            </tr>
            <tr>
              <td>Cholestrol</td>
              <td>{Ingredients.nutrition.Cholestrol} mg</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>{Ingredients.nutrition.Sodium} mg</td>
            </tr>
            <tr>
              <td>Carbs</td>
              <td>{Ingredients.nutrition.Total_Carbohydrates} grams</td>
            </tr>
            <tr>
              <td>Sugars</td>
              <td>{Ingredients.nutrition.Sugars} grams</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{Ingredients.nutrition.Protein} grams</td>
            </tr>
            <tr>
              <td>Vitamin A</td>
              <td>{Ingredients.nutrition.Vitamin_A} %DV</td>
            </tr>
            <tr>
              <td>Vitamin C</td>
              <td>{Ingredients.nutrition.Vitamin_C} %DV</td>
            </tr>
            <tr>
              <td>Calcium</td>
              <td>{Ingredients.nutrition.Calcium} %DV</td>
            </tr>
            <tr>
              <td>Iron</td>
              <td>{Ingredients.nutrition.Iron} %DV</td>
            </tr>
          </table>


          <div className='pop-info'>
            <h4>Ingredients</h4>
              {Ingredients.ingredients.map((ing) => {
                return ( <p>{ing.name} x {ing.quantity} {ing.measurement}</p>)
              })}
          </div>

          <h4>${Ingredients.cost} - 1 serving</h4>
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
                  <input type="search" placeholder="Search for key word" />
                </div>
                <div className='community-box'>
                  <div className='sub-box'>
                    <h1>Dietry</h1>
                    <ul>
                      <li><input type="checkbox" name='gf' onChange={set_dietary_option}></input>Gluten-Free</li>
                      <li><input type="checkbox" name='vegan' onChange={set_dietary_option}></input>Vegan</li>
                      <li><input type="checkbox" name='vegetarian' onChange={set_dietary_option}></input>Vegetarian</li>
                    </ul>

                  </div>
                  <div className='sub-box'>
                    <h1>Nutritients</h1>
                    <ul>
                      <li className='spaced'><input type="text2" onChange={set_min_calorie} /><span>≤ Calories ≤</span><input type="text2" onChange={set_max_calorie} /></li>
                      <li className='spaced'><input type="text2" onChange={set_min_protein}/><span>≤ Protein ≤</span><input type="text2" onChange={set_max_protein} /></li>
                      <li className='spaced'><input type="text2" onChange={set_min_sugars}/><span>≤ Sugars ≤</span><input type="text2" onChange={set_max_sugars}/></li>
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
          {results.map((meal) => {
            return (
                <div class="card" name="hello">
                  <img src={meal.photo} alt="Avatar"></img>
                  <p>{meal.name}<br />
                    Creator: Joseph<br />
                    ♡ {meal.likes}<br />
                    Location: QUT
                  </p>  
                  <button name = {meal.id} onClick={openPop}>View Ingredients</button>
                  <p style={{color: 'red'}}>{error ? error : ''}</p>
                  </div>
            )
          })}              
          </div>
            </div>
        </div>
    );
}