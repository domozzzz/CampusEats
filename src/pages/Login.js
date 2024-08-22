/*export default function Login() {
  return (
    <p>This is a login page, edit the login page in the login branch</p>
  );
}*/
import React, { useState } from "react";
import "../Login.css";
import useToken from "../components/useToken";


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
    <div className="login-container">
      <div className="login-box">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
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
          Don’t have an account? <a href="#">Register now.</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
