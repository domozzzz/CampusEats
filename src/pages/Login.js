
import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import homepage from '../images/Homepage.png';
import { useAuth } from "../components/AuthProvider.js";


function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginerror, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  /**
   * Validates the information that the user has entered
   * @returns bool if input is valid
   */
  const validform = () => {
    const emailRegex = /\S+@\S+\.\S+/;  // Check that email has @ and .
    const isEmailValid = emailRegex.test(email);
    const isPaswwordValid = password.length > 8;   //checks that password is longer than 8 characters
    return isEmailValid && isPaswwordValid;
  }

  /**
   * Handles user submitting the form
   * Checks if the input is valid and logs the user in
   * navigates to the homepage once logged in 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!validform()) {
      alert("Please enter a valid email and password");
      return;
    }
    const { data: {user, session}, error } = await login(email, password)  // logs user into site and sets session
    if (error) {
      console.log(error);
      setError(true);

    }
    if (user && session) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div class="welcome">
          <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative", objectFit: "cover"}}></img>
        </div>
        <div className="login-box">
          <h2>Sign in to your account</h2>
          {loginerror ? <h2>Incorrect email or password, please try again</h2>: ''}
          <form  onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
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