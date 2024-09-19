import React, {useState} from "react";
import homepage from '../images/homepage.png'
import "../css/upload.css"
import "../css/App.css"
import supabase from "../supabase";


export default function Upload() {

    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const dishname = e.target.dishname.value
        const gf = e.target.gf.checked
        const vegetarian = e.target.vegetarian.checked
        const vegan = e.target.vegan.checked

        const dataInput = [username, dishname, gf, vegetarian, vegan, ingredients]

        if (dataInput.some((x) => {return x == null || x.length == 0})) {
            console.log("Not completely filled")
            return
        } else {
            const {data, error} = await supabase
            .from('meals')
            .insert([{name: dishname, ingredients: {required: ingredients, optional: []},
            gf: gf, vegan: vegan, vegetarian: vegetarian, type: 1, able_to_order: true}])

            if (error) {
                console.log(error)
            }

            if (data) {
                console.log(data)
            }
        }
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
        setIngredients(ing => ing.filter((val, i) => (i !== index)))
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
                    <input name="image" id="file-upload" type="file"/>
                    <h2>2. Fill the details.</h2>
                    <h3>Your name</h3>
                    <input name="username" type="text" placeholder="Example: Spiderman Dude" />
                    <h3>Dish Name</h3>
                    <input name="dishname" type="text" placeholder="Example: Jacket Potato with Chilli and Cheese"/>
                    <h3>Dietary Options</h3>
                    <div className="dietary">
                        <div className="option">
                            <input name="gf" type="checkbox"/>
                            <label>Gluten-free</label>
                        </div>
                        <div className="option">
                            <input name="vegetarian" type="checkbox"/>
                            <label>Vegetarian</label>                           
                        </div>
                        <div className="option">
                            <input name="vegan" type = "checkbox"/>
                            <label>Vegan</label>
                        </div>
                    </div>
                    <h3>Add ingredients</h3>
                    <div className="ingredients">
                        <div className="ingredient_list">
                            {ingredients.map((elem, i) => {
                                        return (
                                            <div className="ingredient" key={i}>
                                                <label >{elem}</label>
                                                <button type="button" name={"button-" + i.toString()} onClick={removeIngredient}>-</button>
                                            </div>
                                        )
                                })
                            }
                        </div>
                        <div className="add-ingredient">
                            <input name="newIngredient" value={newIngredient == null ? '' : newIngredient} type="text" placeholder="e.g. Egg" onChange={handleNewIngredient}/>
                            {/* <label>type: </label>
                            <select>
                                <option value="protein">protein</option>
                                <option value ="carb">carb</option>
                                <option value="vegetable">vegetable</option>
                                <option value="fruit">fruit</option>
                                <otion value="else">else</otion>
                            </select>
                            <label>Cost of item: </label>
                            <input type="number"/> */}
                            <button type="button" onClick={addIngredient}>+</button>
                        </div>
                    </div>
                    {/* <div className="cost">
                        <h3>How much does it cost?</h3>
                    </div> */}
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