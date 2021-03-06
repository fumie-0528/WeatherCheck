import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from '@reach/router';

const Registration = props => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errs, setErrs] = useState({});

  // CHECK THIS OUT!!!!
  //    using a single state object to hold all data!
  const [ user, setUser ] = useState({
    username: "",
    email: "", 
    password: "", 
    confirmPassword: "",
  })

  // using a single function to update the state object
  //    we can use the input's name attribute as the key in to the object
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const register = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/register", 
      user,  // the user state is already an object with the correct keys and values!
      {
        // this will force the sending of the credentials / cookies so they can be updated
        //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
        //    unless withCredentials is set to true before making the request
        withCredentials: true,
      }
      
      )
      .then(res => {
        console.log(res.data);
        // when we successfully created the account, reset state for registration form
        //    We do this if we are NOT navigating automatically away from the page
        setUser({
          userName: "",
          email: "", 
          password: "", 
          confirmPassword: "",
        })
        setConfirmReg("Thank you for Registering, you can now log in!");
        setErrs({});  // remember to reset errors state if it was successful
      })
      .catch((err) => {
        console.log(err);
        setErrs(err.response.data.errors);
      });
  };

  return (
    <div className="text-start w-50 mx-auto">
      <h2>Register</h2>
      {
        confirmReg ? 
          <h4 style={{color: "green"}}>{confirmReg}</h4>
          : null
      }
      <form onSubmit={register}>
        <div className="mb-3">
          <label>Username</label>
          {
            errs.username ? 
              <span className="error-text" style={{color: "red"}}>{ errs.username.message }</span>
              : null
          }
          <input className="form-control"
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          {
            errs.email? 
              <span className="error-text" style={{color: "red"}}>{ errs.email.message }</span>
              : null
          }
          <input className="form-control"
            type="email"
            name="email"
            value={user.email}
            onChange={ handleChange }
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          {
            errs.password ? 
              <span className="error-text" style={{color: "red"}}>{ errs.password.message }</span>
              : null
          }
          <input className="form-control"
            type="password"
            name="password"
            value={user.password}
            onChange={ handleChange }
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          {
            errs.confirmPassword? 
              <span className="error-text" style={{color: "red"}}>{ errs.confirmPassword.message }</span>
              : null
          }
          <input className="form-control"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={ handleChange }
          />
        </div>
        <div className="mb-3">
          <button 
            type="submit" class="btn btn-primary"
          >Register Me</button>
        </div>
      </form>
      <p>already registered? <Link to="/login">Login</Link> </p>
    </div>
  );
};

export default Registration;
