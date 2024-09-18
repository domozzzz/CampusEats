import React from "react";
import homepage from '../images/homepage.png'
import "../css/upload.css"
import "../css/App.css"


export default function Upload() {
    return (
        <div>
            <div className="welcome" alt="Avatar">
                <div className="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>  
            <div className="upload">
                <form>
                    <h2>1. Upload your picture.</h2>
                    <div className="file_upload_container">
                        <p>
                            Drag or drop your picture here <br/>
                            or <br/>
                            <label for="file-upload" className="custom-file-upload">
                                Click here to browse your files
                            </label>
                        </p>
                    </div>
                    <input id="file-upload" type="file"/>
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
                        <div className="add-ingredient">
                            <input type="text" placeholder="e.g. Egg"/>
                            <button>+</button>
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