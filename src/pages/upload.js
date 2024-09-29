import React, {useState} from "react";
import homepage from '../images/homepage.png'
import {Helmet} from 'react-helmet-async'
import "../css/upload.css"
import "../css/App.css"
import UploadPopup from "../components/UploadPopUp";
import supabase from "../supabase";


const baseIngreident = {
    name: null,
    quantity: 1,
    measurement: 'grams'
}
export default function Upload() {

    const [display, setDisplay] = useState(0)
    const [ingredients, setIngredients] = useState([])
    const [errorIngredient, setErrorIngreident] = useState(null)
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [newIngredient, setNewIngredient] = useState(baseIngreident)

    const [upload, setUpload] = useState(
        {
            name: null,
            image: null,
            gf: false,
            vegetarian: false,
            vegan: false,
            ingredients: ingredients

        }
    )
   
    const handleSubmit = async () => {
        if (upload['name'] === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered valid name")
        }else if (upload['image'] === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered an image line")
        }else if (upload['ingredients'].length === 0) {
            setErrorSubmit("Error uploading mealkit, ensure you add ingredients")
        }

    }

    const handleNewIngredient = (e) => {
        const ingredientName = e.target.value
        setNewIngredient(ingredientName)
    }

    const addIngredient = (e) => {
        if (newIngredient['name'] != null) {
            setIngredients([...ingredients,newIngredient])
            setUpload({...upload,['ingredients']: ingredients})
            setNewIngredient(baseIngreident)
            setErrorIngreident(null)
        } else {
            setErrorIngreident("Error adding new ingredient")
        }
    }

    const removeIngredient = (e) => {
        const buttonName = e.target.name
        const index = parseInt(buttonName.slice(7))
        setIngredients(ing => ing.filter((val, i) => (i !== index)))
    }

    const basicDetails = (
        <div className="Basic_info">
            <h2>Basic Details</h2>
            <div className="basic_input">
                <input type="text" placeholder="Meal Kit Name" onChange={e => setUpload({...upload,['name']: e.target.value})}/>
                <input type="text" placeholder="Image Link" onChange={e => setUpload({...upload,['image']: e.target.value})}/>
            </div>
        </div>
        )
    
    const dietary = (
        <div className="Basic_info">
            <h2>Dietary</h2>
            <p>Check the boxes for relevant dietary info which applies to your meal</p>
            <div className="dietary">
                <div>
                    <input type="checkbox" onChange={e => setUpload({...upload,['vegetarian']: e.target.value === 'on' ? true : false})}/> 
                    <label>Vegetarian</label>
                </div>
                <div>
                    <input type="checkbox" onChange={e => setUpload({...upload,['gf']: e.target.value ==='on' ? true : false})}/> 
                    <label>Gluten-Free</label>
                </div>
                <div>
                    <input type="checkbox" onChange={e => setUpload({...upload,['vegan']: e.target.value === 'on' ? true : false})}/> 
                    <label>Vegan</label>
                </div>
            </div>
    
        </div>        
    )
    
    const ingredientDisplay = (
        <div className="Basic_info">
                            <h2>Ingredients</h2>
                            <div className="ingredient_list">
                                {ingredients.map((item, i) => {
                                    return (
                                        <div className="item">
                                            <ul>{item.name} x {item.quantity} {item.measurement}</ul><button name={`Button-${i}`} onClick={removeIngredient}>-</button>
                                        </div> 
                                    )
                                })}                                                              
                            </div>
                            <div className="add_ingredient">
                                <div className="info">
                                    <input type="text" value={newIngredient['name'] != null ? newIngredient['name'] : ''} placeholder="ingredient name" onChange={ e => setNewIngredient({...newIngredient, ['name']: e.target.value})}/>
                                    <label> x </label>
                                    <input type="number" min ="1" placeholder="1" onChange={ e => setNewIngredient({...newIngredient, ['quantity']: e.target.value})}/>
                                    <select onChange={ e => setNewIngredient({...newIngredient, ['measurement']: e.target.value})}>
                                        <option value="grams">grams</option>
                                        <option value="milli-grams">milli-grams</option>
                                        <option value = "litres">litres</option>
                                        <option value = "milli-litres">milli-litres</option>
                                        <option value="tablespoon">tablespoon</option>
                                        <option value="item">item</option>
                                    </select>
                                    <button className="add_ingredient_button" onClick={addIngredient}>+</button>
                                    <p style={{color:'red'}}>{errorIngredient ? errorIngredient : ''}</p>
                                </div>
                            </div>
                        </div>
    )
    
    const options = [basicDetails, dietary, ingredientDisplay]

    const arrow_up = () => {
        if (display == 0) {
            return
        } else {
            setDisplay(display-1)
        }
    }

    const arrow_down = () => {
        if (display == 2) {
            return
        } else {
            setDisplay(display+1)
        }
    }    

    const test = () => {
        console.log(upload)
    }

 
    return (
        <div>
            <Helmet>
                <title>Upload page</title>
                <script src="https://kit.fontawesome.com/772a7aab14.js" crossorigin="anonymous"></script>
            </Helmet>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>  
            <div className="upload">
                <div className="header">
                <h1>Upload</h1>
                <h3>Upload your own meal-kits for review from our CampusEats team. Accepted Meal-Kits will be displayed on our market place and avaliable for purchase.</h3>
                </div>
                <div className="create-upload">
                    <div className="detail-name">
                        <ul>
                            <li style={display==0 ? {'color': '#064d42', 'font-size': '2rem'} : {'color':'#D9E5E3', 'font-size': '1.5rem'}}>Basic Details</li>
                            <li style={display==1 ? {'color': '#064d42', 'font-size': '2rem'} : {'color':'#D9E5E3', 'font-size': '1.5rem'}}>Dietary Info</li>
                            <li style={display==2 ? {'color': '#064d42', 'font-size': '2rem'} : {'color':'#D9E5E3', 'font-size': '1.5rem'}}>Ingredients</li>
                        </ul>

                    </div>
                    <div className="details">
                        {options[display]}              
                    </div>
                    <div className="arrows">
                        <i class="fa-solid fa-arrow-up" onClick={arrow_up}></i>
                        <i class="fa-solid fa-arrow-down" onClick={arrow_down}></i>
                    </div>
                </div>
                <div className="submit_upload">
                    <button onClick={handleSubmit}>Submit Meal-kit</button>
                    <p style={{color: 'red'}}>{errorSubmit ? errorSubmit : ''}</p>
                    <p>*All Meal-kits will be subjected to a review process by our CampusEats team.
                         Ensure all information you provide is factual and accurate. Only select meal kits will be displayed within
                         the marketplace and avliable for order</p>
                </div>
            </div>  
        </div>
    )
}