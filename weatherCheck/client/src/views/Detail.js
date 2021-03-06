import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from "../components/NavBar";
import blueSky from '../images/blueSky.jpg';

const Detail = (props) => {
    const {users, locations} = props;
    const [oneLocation, setOneLocation] = useState({});
    // const [errors, setErrors] = useState({});
    // const [state, setState] = useState(0);
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
        <div>   
            <NavBar /> 
            <div className= "mx-auto" 
            style={{ 
            backgroundImage: `url(${blueSky})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            height: "100vh",
            backgroundSize: "cover",}} 
            >
            <br/>
            <br/>  
            <br/>
            <br/>
                <h2 style={{color:"white"}}>Weather in {weather.name}, {oneLocation.zipCode}</h2>
                <div className="box">
                    <div className="weather">
                        <br/>
                        <p style={{fontSize:"30px"}}>Weather:</p>
                        <p style={{fontSize:"30px"}}> {weather?.weather?.[0].main}</p>
                        <p> <img src="http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png}"/></p>
                    </div>
                    <div className="weather">
                    <br/>
                    <br/>
                        <p style={{fontSize:"30px"}}>Temprature:</p>
                        <br/>
                        <span style={{fontSize:"70px"}}>   &nbsp;&nbsp;{weather?.main?.temp} </span><span style={{fontSize:"30px"}}>F</span>
                    </div>
                    <div className="weather">
                        <br/>
                        <br/>
                        <p style={{fontSize:"30px"}}>Humidity:</p>
                        <br/>
                        <span style={{fontSize:"80px"}}>{weather?.main?.humidity}  </span><span style={{fontSize:"30px"}}>%</span>
                    </div>
                </div>
                <div className="box2">
                    <div className="sunset">
                        <span style={{fontSize:"20px"}}>Sunrise:</span> &nbsp;&nbsp;
                        <span style={{fontSize:"60px"}}>{(new Date(weather?.sys?.sunrise * 1000)).toLocaleTimeString()}</span>
                    </div>
                    <div className="sunset">
                        <span style={{fontSize:"20px"}}>Sunset:</span> &nbsp;&nbsp;
                        <span style={{fontSize:"60px"}}>{(new Date(weather?.sys?.sunset * 1000)).toLocaleTimeString()   }</span>
                    </div>
                </div>

                 


                    {/* <div style={{ 
                    backgroundImage: `url("http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png")`,
                    width: "50%", 
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    margin: "auto",
                    marginTop: "30px",
                    paddingTop: "40px"
                    }}> */}

                    {/* </div>
        
                        <div style={{
                            width: "90%", 
                            height: "100%",
                            padding: "20px",
                            margin: "20px",
                            border: "solid-black"
                        }}>

                        <table className="table table-stripe" style={{color:"white"}}>
                        <tbody>
                        <tr><td>Weather:</td> <td>{weather?.weather?.[0].main} </td></tr>
                        <tr><td>Max Temperature:</td> <td>{weather?.main?.temp_max} F</td></tr>
                        <tr><td>Min Temperature:</td> <td>{weather?.main?.temp_min} F</td></tr>
                        <tr><td>Humidity:</td> <td>{weather?.main?.humidity} %</td></tr>
                        <tr><td>Sunrise:</td> <td>{(new Date(weather?.sys?.sunrise * 1000)).toLocaleTimeString()}</td></tr>
                        <tr><td>Sunset:</td> <td>{(new Date(weather?.sys?.sunset * 1000)).toLocaleTimeString()   }</td></tr>
                        </tbody>
                        </table>

                        </div> */}
                    </div>
                    </div>


    )
}
export default Detail;