import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from "../components/NavBar";
import sky from '../images/sky.jpg';

const Detail = (props) => {
    const {users, locations} = props;
    const [oneLocation, setOneLocation] = useState({});
    const [errors, setErrors] = useState({});
    const [state, setState] = useState(0);
    const [weather, setWeather] = useState({});

        useEffect(() => {
            console.log(users);
        axios.get("http://localhost:8000/api/locations/"+ props.id)
            .then(res => {
                console.log(res.data);
                setOneLocation(res.data);
                
            })
            .catch(err => console.log(err))  
    }, [])
    useEffect(() => {
        if (oneLocation.zipCode !== undefined){
            axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${oneLocation.zipCode},us&units=imperial&appid=2f62e70267e499112661d3d1fd022c23`)
        
            .then(res => {
                console.log(res);
                setWeather(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            console.log("zip code was undefined");
        }

    },[oneLocation])
    
    
    return (
        <div className= "w-75 mx-auto" style={{ 
            backgroundImage: `url(${sky})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            margin: 30,
            padding: 30}} >
            <NavBar /> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            <h2>Weather in {weather.name}, {oneLocation.zipCode}</h2>
            <div style={{ display:"flex", flexDirection:"row" ,height:"90%", width: "100%", justifyContent: "space-around"}}>
                <div style={{
                        width: "80%", 
                        height: "100%",
                        padding: "20px",
                        margin: "20px",
                        border: "solid-black"
                    }}>

                            <table className="table table-stripe">
                            <tbody>
                            <tr><td>Weather:</td> <td>{weather?.weather?.[0].main} </td></tr>
                            <tr><td>Max Temperature:</td> <td>{weather?.main?.temp_max} F</td></tr>
                            <tr><td>Min Temperature:</td> <td>{weather?.main?.temp_min} F</td></tr>
                            <tr><td>Humidity:</td> <td>{weather?.main?.humidity} %</td></tr>
                            <tr><td>Sunrise:</td> <td>{(new Date(weather?.sys?.sunrise * 1000)).toLocaleTimeString()}</td></tr>
                            <tr><td>Sunset:</td> <td>{(new Date(weather?.sys?.sunset * 1000)).toLocaleTimeString()   }</td></tr>
                            </tbody>
                            </table>
                </div>
                <div style={{ 
                            backgroundImage: `url("http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png")`,
                            backgroundRepeat: "no-repeat",
                            width: "20%", 
                            height: "300px",
                            padding: "20px",
                            margin: "20px"
                        }}>
                        
                </div>
            </div>
        </div>
    )
}
export default Detail;