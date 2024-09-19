import React, {useState} from "react";
import homepage from '../images/homepage.png'
import "../css/upload.css"
import "../css/App.css"
import UploadPopup from "../components/UploadPopUp";
import supabase from "../supabase";


export default function Upload() {

    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState(null)
    const [popup, setPopup] = useState(false)

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

    const removePopup = () => {
        setPopup(false)
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
                            <button type="button" onClick={setPopup}>+</button>
                        </div>
                    </div>
                    
                    {/* <div className="cost">
                        <h3>How much does it cost?</h3>
                    </div> */}
                    < UploadPopup trigger={popup}>
                        <button className="close-popup" onClick={removePopup}>x</button>
                        <div className="ingredient-name">
                            <h3>Name of ingredient</h3>
                            <input placeholder="" type="text"/>
                        </div>
                        <br/>
                        <div className="ingredient-quantity">
                            <h3>Quantity of ingredient</h3>
                            <div>
                                <input type="number"/>
                                <select>
                                    <option value="item">item</option>
                                    <option value="grams">grams</option>
                                    <option value="millilitres">millilitres</option>
                                    <option value="teaspoon">teaspoon</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <h3>Cost of ingredient</h3>
                        <div className="ingredient-cost">
                            <label>$</label><input type="number"/>
                        </div>
                        <br/>
                        <h3>nutritional value for your ingredient</h3>
                        <br/>
                        <div className="ingredient-nutrition">
                            <table>
                                <tr>
                                    <th>Nutritient</th>
                                    <th>Amount per Serving</th>
                                </tr>
                                <tr>
                                    <td>Calories</td>
                                    <td><input type="number"/>grams</td>
                                </tr>
                                <tr>
                                    <td>Fats</td>
                                    <td><input type="number"/> grams</td>
                                </tr>
                                <tr>
                                    <td> - saturated fats</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td> - Trans Fat</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td>Cholestrol</td>
                                    <td><input type="number"/>mg</td>
                                </tr>
                                <tr>
                                    <td>Sodium</td>
                                    <td><input type="number"/>mg</td>
                                </tr>
                                <tr>
                                    <td>Total Carbohydrates</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td> - Dietary Fiber</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td>Sugars</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td><input type="number"/>g</td>
                                </tr>
                                <tr>
                                    <td>Vitamins and Minerals</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td> - Vitamin A</td>
                                    <td><input type="number"/>% DV</td>
                                </tr>
                                <tr>
                                    <td> - Vitamin C</td>
                                    <td><input type="number"/>% DV</td>
                                </tr>
                                <tr>
                                    <td>Calcium</td>
                                    <td><input type="number"/>% DV</td>
                                </tr>
                                <tr>
                                    <td>Iron</td>
                                    <td><input type="number"/>% DV</td>
                                </tr>
                            </table>
                        </div>
                        <button className="popup-submit" type="button"> submit</button>
                    </UploadPopup>
                    <div className="nutrition-warning">
                        <br/>
                        <label>
                            *You should ensure that all nutritional information you provide is
                            accurate. Incorrect meal kit nutritional info may be flagged and removed 
                            from community page.
                        </label>
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