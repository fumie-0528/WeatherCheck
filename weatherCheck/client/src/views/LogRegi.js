import React from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import beach from '../images/beach.jpg';

const LogRegi = (props) => {
    const {reloadBoolean, setReloadBoolean} = props;
    return (
        <div style={{ 
            backgroundImage: `url(${beach})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "relative", 
            minHeight: "100vh",
            backgroundSize: "cover",
            textAlign: "center",
            
            

        }}>
            <h1 style={{color:"white"}}> Welcome to weather check</h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <Login setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            <Registration />
        </div>
    );
};

export default LogRegi;