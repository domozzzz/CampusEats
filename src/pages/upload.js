import React, {useState} from "react";
import homepage from '../images/homepage.png'
import "../css/upload.css"
import "../css/App.css"
import supabase from "../supabase";


export default function Upload() {

    const [inputs, setInputs] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState(null)

    const handleInput = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        setInputs(values => ({...values, [inputName]:inputValue}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
    }

    const handleNewIngredient = (e) => {
        const ingredientName = e.target.value
        setNewIngredient(ingredientName)
    }

    const addIngredient = (e) => {
        if (newIngredient != null) {
            setIngredients([...ingredients,newIngredient])
        }
        setNewIngredient(null)
    }

    const removeIngredient = (e) => {
        const buttonName = e.target.name
        const index = parseInt(buttonName.slice(7))
        setIngredients(ing => ing.filter((val, i) => (i != index)))
    }
    return (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>  
            <div className="upload">
                <form onSubmit={handleSubmit}>
                    <h2>1. Upload your picture.</h2>
                    <div className="file_upload_container">
                        <p>
                            Drag or drop your picture here <br/>
                            or <br/>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Click here to browse your files
                            </label>
                        </p>
                    </div>
                    <input id="file-upload" type="file" name="image" onChange={handleInput}/>
                    <h2>2. Fill the details.</h2>
                    <h3>Your name</h3>
                    <input type="text" value="Example: Spiderman Dude" />
                    <h3>Dish Name</h3>
                    <input type="text" value="Example: Jacket Potato with Chilli and Cheese"/>
                    <h3>Dietary Options</h3>
                    <div className="dietary">
                        <div className="option">
                            <input type="checkbox"/>
                            <label>Gluten-free</label>
                        </div>
                        <div className="option">
                            <input type="checkbox"/>
                            <label>Vegetarian</label>                           
                        </div>
                        <div className="option">
                            <input type = "checkbox"/>
                            <label>Vegan</label>
                        </div>
                    </div>
                    <h3>Add ingredients</h3>
                    <div className="ingredients">
                        <div className="ingredient_list">
                            {ingredients.map((elem, i) => {
                                        return (
                                            <div className="ingredient">
                                                <label >{elem}</label>
                                                <button type="button" name={"button-" + i.toString()} onClick={removeIngredient}>-</button>
                                            </div>
                                        )
                                })
                            }
                        </div>
                        <div className="add-ingredient">
                            <input name="newIngredient" type="text" placeholder="e.g. Egg" onChange={handleNewIngredient}/>
                            <button type="button" onClick={addIngredient}>+</button>
                        </div>
                    </div>
                    <h2>3. Upload.</h2>
                    <label>
                        Make sure all the details are correct. 
                        Then just simply click the 'Upload' button below.
                    </label>
                    <button>Upload</button>
                </form>
            </div>  
        </div>
    )
}