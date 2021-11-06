import React, {useState, useEffect} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const NavBar = (props) =>{
    const {users, reloadBoolean} = props;
    const [currentUserId, setCurrentUserId] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout", { 
            // no body required for this request
          }, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setCurrentUserId("");
            localStorage.removeItem("userId"); 
            localStorage.removeItem("currentUsername");
            navigate("/");
          })
          .catch(err => {
            console.log(err);
          });
      }
      useEffect(()=>{
        console.log("inside useEffect in header");
        console.log(users);
        setCurrentUserId(localStorage.getItem("userId"));
        setCurrentUsername(localStorage.getItem("currentUsername"));
      }, [reloadBoolean])
    
    return (
        <div className="w-100 mx-auto navbar navbar-light bg-light container-fluid"
        >
            <div>
              <h3 className="display-5" style={{width: "600px"}}>Welcome, {currentUsername}! </h3>
            </div>
            <div>
            <button type="button" class="btn btn-outline-warning"><Link to="/home">Home</Link></button> 
            &nbsp;&nbsp;
            <button onClick={logout} type="button" class="btn btn-outline-info"><Link to="/">Log Out</Link></button>
            </div>
        </div>
    )
}
export default NavBar;