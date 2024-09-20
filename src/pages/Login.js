
import React, { useState } from "react";
import "../css/Login.css";
import useToken from "../components/useToken";
import { Link } from "react-router-dom";
import homepage from '../images/homepage.png'


function LoginPage() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const validform = (e) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmailValid = emailRegex.test(email);
    const isPaswwordValid = password.length > 8;
    return isEmailValid && isPaswwordValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validform()) {
      alert("Please enter a valid email and password");
      return;
    }
    
    try {
      console.log(email,password)
      //requires running 'json-server --watch ./src/db.json --port 3001' you might need to run 'npm install -g json-server' to install
      const response = await fetch (`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await response.json();
      
      if (data.length > 0) {
        console.log("logined in",email,password);
      } else {
        console.log(data);
        alert("Invalid username or password");
      }

    } catch (error) {
      console.error("error during login:", error);
    }
    
  };

  return (
    <div>
    <div className="login-container">
    <div class="welcome">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
            </div>
      <div className="login-box">
        <h2>Sign in to your account</h2>
        <form  onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register now.</Link>
        </p>
      </div>
      </div>
      <div class="image-placeholder"></div>
    </div>
  );
}

export default LoginPage;