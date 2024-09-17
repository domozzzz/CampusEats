import React, {useState} from "react";
import homepage from '../images/homepage.png'
import "../css/upload.css"
import "../css/App.css"
import supabase from "../supabase";


export default function Upload() {

    const [inputs, setInputs] = useState({})

    const handleInput = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        setInputs(values => ({...values, [inputName]:inputValue}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
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
                    <label>Your name</label>
                    <input type="text" placeholder="Example: Spiderman Dude" name="username" onChange={handleInput} />
                    <label>Dish Name</label>
                    <input type="text" placeholder="Example: Jacket Potato with Chilli and Cheese" name="dishname"
                     onChange={handleInput}/>
                    <label>Description of Dish</label>
                    <input className="description" type="text" placeholder="Example: Spuds with Spicy Chilli-con-carne and cheese" 
                    name="description" onChange={handleInput}/>
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