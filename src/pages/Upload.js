import React, {useState} from "react";
import homepage from '../images/Homepage.png'
import styles from "../css/Upload.module.css"
import { useAuth } from '../components/AuthProvider';
import supabase from "../supabase";
import { Navigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

//Empty ingredients object for user when inputting ingredients
const baseIngreident = {
    name: null,
    quantity: 1,
    measurement: 'grams'
}
export default function Upload() {

    const { user } = useAuth()


    //State foringredients in upload
    const [ingredients, setIngredients] = useState([])
    //Most recently added ingredient
    const [newIngredient, setNewIngredient] = useState(baseIngreident)
    //Error within ingredient (no-name provided)
    const [errorIngredient, setErrorIngreident] = useState(null)
    //Error submitting mealkit to supabase
    const [errorSubmit, setErrorSubmit] = useState(null)
    //Successfully submitted ingredient
    const [successful, setSuccessful] = useState(null)
    //Image upload
    const [image, setImage] = useState(null);

    //Final upload state object
    const [upload, setUpload] = useState(
        {
            name: null,
            username: null,
            image: null,
            gf: false,
            vegetarian: false,
            vegan: false,

        }
    )
   /**
    * Handling submission of meal-kit. Async function for connecting with supabase
    */
    const handleSubmit = async () => {
        //Set errors upon submit
        if (upload['name'] === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered valid name")
        }else if (image === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered an image line")
        }else if (ingredients.length == 0) {
            setErrorSubmit("Error uploading mealkit, ensure you add ingredients")
        } else {

            const url = await uploadImage()
            
            //Insert into meals-unavlidated table
            const {data, error} = await supabase
            .from('meals_unvalidated')
            .insert(
                {
                   name: upload['name'],
                   photo: url,
                   ingredients: ingredients,
                   gf: upload['gf'],
                   vegan: upload['vegan'],
                   vegetarian: upload['vegetarian'] 
                }
            )
            .select()
            if (error) {
                console.log(error)
                setErrorSubmit(error)
            }

            if (data) {
                //If meal uploaded, insert into post-table
                const {d, e} = await supabase
                .from('post')
                .insert([
                    {
                       poster_id: user['id'], 
                       meal_id: data[0].id,
                       title: upload['name'],
                       username:`${user['user_metadata']['first_name']} ${user['user_metadata']['last_name']}`
                    }
                ]).select()

                if (d) {
                }
                if (e) {
                    setErrorSubmit(e)
                }
            }

            setErrorSubmit(null)
            setErrorIngreident(null)
            setSuccessful("Successfully submitted meal-kit, you should see it on the homepage soon!")
        }

    }

    
    const addIngredient = (e) => {
        if (newIngredient['name'] != null) {
            setIngredients([...ingredients,newIngredient])
            setUpload({...upload,['ingredients']: ingredients})
            setNewIngredient({...newIngredient, ['name']: null})
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

    async function uploadImage(e) {
        let file = image;
        let imageid = uuidv4();

        console.log(imageid);
        const {data, error} = await supabase
        .storage
        .from('images')
        .upload(user.id + "/" + imageid, file);

        if (error) {
            return -1;
        } else {
            return (geturl(imageid));
        }

    }

    const geturl = (id) => {
        const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(user.id + "/" + id);

        return (data.publicUrl);

    }

    const addImage = (image) => {
        setImage(image.target.files[0]);
    }



 
    return user ? (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>  
            <div className={styles["upload"]}>
                        <div className={styles["header"]}>
                        <h1>Upload</h1>
                        <p>Upload your own meal-kits for review from our CampusEats team. Accepted Meal-Kits will be displayed on our market place and avaliable for purchase.</p>
                        </div>
                        <div className={styles["basicDetails"]}>
                        <h2>Basic Details</h2>
                                <div>
                                    <label>Meal Kit Name</label> 
                                    <input type="text" onChange={e => setUpload({...upload,['name']: e.target.value})} />
                                </div> 
                                <div>  
                                    <label>Choose an Image</label>
                                    <input type="file" accept="image/*" onChange={(e) => addImage(e)} /> 
                                </div>     
                         </div>              
                        <div>
                                <h2>Dietary Info</h2>
                                <p>Check the boxes for relevant dietary info which applies to your meal</p>
                                    <form>
                                        <div>
                                            <input type="checkbox" onChange={e => setUpload({...upload,['vegetarian']: e.target.value === 'on' ? true : false})}/>
                                            <label>Vegetarian</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" onChange={e => setUpload({...upload,['gf']: e.target.value ==='on' ? true : false})}/>
                                            <label>Gluten-free</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" onChange={e => setUpload({...upload,['vegan']: e.target.value === 'on' ? true : false})}/>
                                            <label>Vegan</label>
                                        </div>
                                </form>
                            </div>
                                <h2>Ingredients</h2>
                                <div className={styles['ingredientList']}>
                                    {ingredients.map((item, i) => {
                                        return (
                                            <div className={styles['ingredient']}>
                                                <div className={styles['ingredientName']}>
                                                    <label>{item.name} x {item.quantity} {item.measurement}</label>
                                                </div>  
                                                <div className={styles['removeIngredient']}>
                                                    <button name={`Button-${i}`} onClick={removeIngredient}> - </button>            
                                                </div>
                                            </div>    
                                        )
                                    })}                                                              
                                </div>
                                <div className={styles['addIngredient']}>
                                    <input type="text" value={newIngredient['name'] != null ? newIngredient['name'] : ''} placeholder="ingredient name"
                                     onChange={ e => setNewIngredient({...newIngredient, ['name']: e.target.value})}
                                     />
                                     <label>x</label>
                                     <input type="number" min ="1" placeholder="1" onChange={ e => setNewIngredient({...newIngredient, ['quantity']: e.target.value})}/>
                                     <select onChange={ e => setNewIngredient({...newIngredient, ['measurement']: e.target.value})}>
                                        <option value="grams">grams</option>
                                        <option value="milli-grams">milli-grams</option>
                                        <option value = "litres">litres</option>
                                        <option value = "milli-litres">milli-litres</option>
                                        <option value="tablespoon">tablespoon</option>
                                        <option value="item">item</option>
                                     </select>
                                     <button onClick={addIngredient}>Add</button>
                                     <div>
                                        <p style={{color:'red'}}>{errorIngredient ? errorIngredient : ''}</p>
                                    </div>
                                </div>

                                <div className={styles['submit']}>
                                    <button onClick={handleSubmit}>Submit Meal-Kit!</button>
                                    <p className={styles['error']}>{errorSubmit ? errorSubmit : ''}</p>
                                    <p className={styles['success']}>{successful ? successful : ''}</p>

                                </div>
            </div>  
        </div>
    ) : <Navigate to='/login'/>
}
