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
        <div className="w-75 mx-auto navbar navbar-light bg-light container-fluid">

            <span className="display-5">Welcome, {currentUsername}! </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


            <Link to="/home">Home</Link> |
            <nobr onClick={logout}><Link to="/">Log Out</Link></nobr>
        </div>
    )
}
export default NavBar;