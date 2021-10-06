import React, {useEffect, useState } from 'react';
import axios from 'axios';
import WeatherList from '../components/WeatherList.js';
import NavBar from '../components/NavBar.js';

const Main = (props) =>{
    const {users, locations, reloadBoolean, setReloadBoolean} = props;
    // const [loaded, setLoaded] = useState(false);
    

    return (
        <div className="text-center">
            <NavBar users={users} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
            {/* { loaded &&<WeatherList locations={locations} users={users}/>} */}
            <WeatherList locations={locations} users={users}/>

        </div>
    )
}

export default Main;