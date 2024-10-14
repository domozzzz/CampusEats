
import React, { useState } from "react";
import "../css/App.css"
import { Link } from "react-router-dom";
import homepage from '../images/Homepage.png'
import supabase from "../supabase";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirst] = useState('');
  const [lastname, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState("");
  
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
      const {data, error} = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              first_name: firstname,
              last_name: lastname,
              phone: phone,
            }
          }
        }
      )
      if (!error && data) {
        setMsg("Registration successful. Please check your email.");
      }
    } catch(error) {
      setMsg("There was an error creating your account");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div class="welcome">
          <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative", objectFit: "cover"}}></img>
        </div>
        <div className="login-box">
          <h2>{msg}</h2>
          <h2>Register to order</h2>
          <form  onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              className="input-field"
              value={firstname}
              onChange={(e) => setFirst(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="input-field"
              value={lastname}
              onChange={(e) => setLast(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
            <button type="submit" className="login-button">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login.</Link>
          </p>
        </div>
      </div>
      <div class="image-placeholder"></div>
    </div>
  );
}

export default RegisterPage;
