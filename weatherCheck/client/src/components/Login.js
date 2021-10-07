import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';

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
        // this will force the sending of the credentials / cookies so they can be updated
        //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
        //    unless withCredentials is set to true before making the request
        withCredentials: true,
      }
      )
      .then((res) => {
        console.log(res.cookie, "cookie");
        console.log(res, "res");
        console.log(res.data, 'is res data!');
        // setCurrentUsername(res.data.userLoggedIn);
        localStorage.setItem("currentUsername", res.data.userLoggedIn);
        localStorage.setItem("userId", res.data.userId); 
        console.log(currentUsername);
        setReloadBoolean(!reloadBoolean);
        navigate("/home");

      })
      .catch(err => {
        console.log(err.res);
        setErrorMessage(err.res.data.message);
      });
  };

  return (
    <div className="text-start w-50 mx-auto" style={{color:"white"}}>
      <h2 >Login</h2>
      <p className="error-text">{errorMessage ? errorMessage : ""}</p>
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
    </div>
  );
};

export default Login;
