
import React, { useState } from "react";
import "../Login.css";
import useToken from "../components/useToken";


function RegisterPage() {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirst] = useState('');
  const [lastname, setLast] = useState('');
  const [phone, setPhone] = useState('');
  
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
    <div className="login-container">
      <div className="login-box">
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
          <button type="submit" className="login-button">Register</button>
        </form>
        <p>
         Already have an account? <a href="/login">Login.</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
