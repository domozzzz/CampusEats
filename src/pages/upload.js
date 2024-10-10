import React, {useState} from "react";
import homepage from '../images/Homepage.png'
import {Helmet} from 'react-helmet-async'
import styles from "../css/Upload.module.css"
import { useAuth } from '../components/AuthProvider';
import supabase from "../supabase";
import { Navigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from 'react-bootstrap/Stack'
import Alert from 'react-bootstrap/Alert'

//Empty ingredients object for user when inputting ingredients
const baseIngreident = {
    name: null,
    quantity: 1,
    measurement: 'grams'
}
export default function Upload() {

    const { user } = useAuth()

    const [display, setDisplay] = useState(0)
    const [ingredients, setIngredients] = useState([])
    const [errorIngredient, setErrorIngreident] = useState(null)
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [newIngredient, setNewIngredient] = useState(baseIngreident)
    const [successful, setSuccessful] = useState(null)
    const [image, setImage] = useState(null);

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
   
    const handleSubmit = async () => {
        if (upload['name'] === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered valid name")
        }else if (image === null) {
            setErrorSubmit("Error uploading mealkit, ensure you have entered an image line")
        }else if (ingredients.length == 0) {
            setErrorSubmit("Error uploading mealkit, ensure you add ingredients")
        } else {

            const url = await uploadImage()
            
            
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

    const basicDetails = (
        <div className="Basic_info">
            <h2>Basic Details</h2>
            <div className="basic_input">
                <Form.Label>Meal Kit Name</Form.Label>
                <Form.Control type="text" onChange={e => setUpload({...upload,['name']: e.target.value})} />
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
        console.log(user)
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


 
    return user ? (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>  
            <div className={styles["upload"]}>
                    <Container fluid>
                        <Row lg="8" md="8" sm="10">
                        <div className={styles["header"]}>
                        <h1>Upload</h1>
                        <p>Upload your own meal-kits for review from our CampusEats team. Accepted Meal-Kits will be displayed on our market place and avaliable for purchase.</p>
                        </div>
                        </Row>
                        <Row className={`${styles['section']} mx-auto col-md-8`}>
                                    <h2>Basic Details</h2>
                                    <Form.Label>Meal Kit Name</Form.Label>
                                    <Form.Control type="text" onChange={e => setUpload({...upload,['name']: e.target.value})} />
                                    <Form.Label>Choose an Image</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={(e) => addImage(e)} />    
                        </Row>
                        <Row className={`${styles['section']} mx-auto col-md-8`}>
                                <h2>Dietary Info</h2>
                                <p>Check the boxes for relevant dietary info which applies to your meal</p>
                                    <Form style={{'flex-direction': 'row'}}>
                                        <Form.Check 
                                            inline
                                            className={styles['option']}
                                            label="Vegetarian" 
                                            type="checkbox" 
                                            onChange={e => setUpload({...upload,['vegetarian']: e.target.value === 'on' ? true : false})}
                                    />
                                        <Form.Check
                                            inline
                                            label="Gluten-Free" 
                                            className={styles['option']}
                                            type="checkbox" 
                                            onChange={e => setUpload({...upload,['gf']: e.target.value ==='on' ? true : false})}
                                        />
                                        <Form.Check 
                                            inline
                                            label="Vegan" 
                                            className={styles['option']}
                                            type="checkbox" 
                                            onChange={e => setUpload({...upload,['vegan']: e.target.value === 'on' ? true : false})}
                                        />    
                                </Form>
                        </Row>
                        <Row className={`${styles['section']} mx-auto col-md-8`}>
                                <h2>Ingredients</h2>
                                <ListGroup  className={styles['ingredients']}>
                                    {ingredients.map((item, i) => {
                                        return (
                                                <ListGroup.Item variant="success"> {item.name} x {item.quantity} {item.measurement} <Button 
                                                className="ml-auto" variant="success" name={`Button-${i}`} onClick={removeIngredient}>-</Button>
                                                </ListGroup.Item>
                                        )
                                    })}                                                              
                                </ListGroup>
                                    <Form>
                                        <Row>
                                            <Col xs="4">
                                        <Form.Control value={newIngredient['name'] != null ? newIngredient['name'] : ''} placeholder="ingredient name" onChange={ e => setNewIngredient({...newIngredient, ['name']: e.target.value})}/>
                                            </Col>
                                            <Col xs="1">
                                                <Form.Label>x</Form.Label>
                                            </Col>
                                            <Col xs="2">
                                                <Form.Control type="number" min ="1" placeholder="1" onChange={ e => setNewIngredient({...newIngredient, ['quantity']: e.target.value})}/>
                                            </Col>
                                            <Col xs="3">
                                                <Form.Select onChange={ e => setNewIngredient({...newIngredient, ['measurement']: e.target.value})}>
                                                <option value="grams">grams</option>
                                                <option value="milli-grams">milli-grams</option>
                                                <option value = "litres">litres</option>
                                                <option value = "milli-litres">milli-litres</option>
                                                <option value="tablespoon">tablespoon</option>
                                                <option value="item">item</option>
                                                </Form.Select>
                                            </Col>
                                            <Col xs="2">
                                                <Button variant="secondary" onClick={addIngredient}>Add</Button>
                                            </Col>
                        
                                        </Row>
                                    </Form>    
                                    <div>
                                        <p style={{color:'red'}}>{errorIngredient ? errorIngredient : ''}</p>
                                    </div>
                        </Row>
                        <Stack className={`mx-auto col-lg-4 ${styles['section']}`} gap={2}>
                            <Button size="lg" onClick={handleSubmit} variant="success">Submit Meal-kit</Button>
                            {errorSubmit ? 
                            <Alert variant="danger" dismissible>
                                <Alert.Heading>Oh, No!</Alert.Heading>
                                <p>{errorSubmit}</p>
                            </Alert> : ''}
                            {successful ? 
                            <Alert variant="success" dismissible>
                                <Alert.Heading>Uploaded!</Alert.Heading>
                                <p>{successful}</p>
                            </Alert> : ''}
                        </Stack>
                    </Container>
            </div>  
        </div>
    ) : <Navigate to='/login'/>
}