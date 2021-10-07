import React, {useEffect, useState } from 'react';
import axios from 'axios';
import WeatherList from '../components/WeatherList.js';
import NavBar from '../components/NavBar.js';
import sky from '../images/sky.jpg';

const Main = (props) =>{
    const {users, locations, reloadBoolean, setReloadBoolean} = props;

    

    return (
        <div className="text-center w-75" style={{ 
            backgroundImage: `url(${sky})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            textAlign: "center",
            margin: 30,
            padding: 30

        }}>
            <NavBar users={users} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
            <WeatherList locations={locations} users={users}/>

        </div>
    )
}

export default Main;