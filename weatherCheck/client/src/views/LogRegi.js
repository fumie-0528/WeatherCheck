import React from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import sky from '../images/sky.jpg';

const LogRegi = (props) => {
    const {reloadBoolean, setReloadBoolean} = props;
    return (
        <div style={{ 
            backgroundImage: `url(${sky})`, 
            backgroundRepeat: "noRepeat", 
            backgroundPosition: "center", 
            textAlign: "center",
            margin: 30,
            padding: 30

        }}>
            <Login setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            <Registration />
        </div>
    );
};

export default LogRegi;