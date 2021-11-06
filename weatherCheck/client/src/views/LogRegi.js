import React from "react";
import Registration from "../components/Registration";
import sky2 from '../images/sky2.jpg';


const LogRegi = (props) => {
    const {reloadBoolean, setReloadBoolean} = props;
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
                <br/>
                <Registration />
                <br/>
                <br/>
            </div>
        </div>
    );
};

export default LogRegi;