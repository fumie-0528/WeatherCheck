import React, { useState } from "react";
import axios from "axios";
import sky2 from '../images/sky2.jpg';
import { Link, navigate } from '@reach/router';


const Login = (props) => {
  const {reloadBoolean, setReloadBoolean} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = event => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/users/login", { 
        email: email, 
        password: password,
      },
      {
        withCredentials: true,
      }
      )
      .then((res) => {
        console.log(res.cookie, "cookie");
        console.log(res, "res");
        console.log(res.data, 'is res data!');
        localStorage.setItem("currentUsername", res.data.userLoggedIn);
        localStorage.setItem("userId", res.data.userId); 
    
        console.log(currentUsername);
        setReloadBoolean(!reloadBoolean);
        navigate("/home");

      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div style={{ 
      backgroundImage: `url(${sky2})`, 
      backgroundRepeat: "no-repeat", 
      backgroundPosition: "relative", 
      minHeight: "100vh",
      backgroundSize: "cover",
      textAlign: "center",

  }}>
    <div className="header">
        <br/>
        <h2>Welcome to Weather Check</h2>
    </div>
    <br/>
    <br/>
    <br/>
    <div className="logregi"> 
      <div className="text-start w-50 mx-auto">
      <h2 >Login</h2>
      <p className="error-text" style={{color:"red"}}>{errorMessage ? errorMessage : ""}</p>
      <form onSubmit={login}>
        <div className="mb-3">
          <label for="inputPassword5" className="form-label">Email</label>
          <input className="form-control"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input for="inputPassword5" className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button 
            type="submit" class="btn btn-primary"
          >Sign In</button>
        </div>
      </form>
      <p>Need to register? <Link to="/">Register</Link> </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
