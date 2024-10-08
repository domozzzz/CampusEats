
import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase.js";
import homepage from '../images/Homepage.png';
import { useAuth } from "../components/AuthProvider.js";
import { Navigate } from "react-router-dom";


function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
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
    const { data: {user, session}, error } = await login(email, password)
    if (error) {
      console.log(error);

    }
    if (user && session) {
      navigate("/");
    } else {
      console.log("didnt work\n", user, session, error );
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