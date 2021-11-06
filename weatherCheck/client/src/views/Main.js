import React, {useEffect, useState } from 'react';
import axios from 'axios';
import WeatherList from '../components/WeatherList.js';
import NavBar from '../components/NavBar.js';
import blueSky from '../images/blueSky.jpg';

const Main = (props) =>{
    const {users, locations, reloadBoolean, setReloadBoolean} = props;

    

    return (
        <div style={{ 
            backgroundImage: `url(${blueSky})`, 
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            textAlign: "center",
           

        }}>
            <NavBar users={users} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
            <WeatherList locations={locations} users={users}/>
        </div>
    )
}

export default Main;