import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from "../components/NavBar";

const Detail = (props) => {
    const {users, locations} = props;
    // const [city, setCity] = useState("");
    // const [zipCode, setZipCode] = useState("");
    const [errors, setErrors] = useState({});
    const [state, setState] = useState(0);
    const [weather, setWeather] = useState({});

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/locations/" + locations.id)
    //         .then(res => {
    //             console.log(res.data);
    //             setCity(res.data)
    //             setZipCode(res.data)
    //         })
    //         .catch(err => console.log(err))  
    // }, [])

        useEffect(() => {
            console.log(users);
        axios.get("http://localhost:8000/api/users/"+ props.id)
            .then(res => {
                console.log(res.data);
                // setCity(res.data)
                // setZipCode(res.data)
            })
            .catch(err => console.log(err))  
    }, [])
    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${users.zipCode},us,&appid=2f62e70267e499112661d3d1fd022c23`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    
    
    return (
        <div className= "w-75 mx-auto">
        <NavBar /> 
            <div style={{ display:"flex", flexDirection:"row"}}>
                <div style={{ 
                    backgroundImage: `url("https://publicdomainq.net/images/201708/09s/publicdomainq-0012025mcj.jpg"` , 
                    width: 500, 
                    height: 600,
                    padding: 20,
                    margin: 20
                }}>
                </div>
    
            <div style={{
                 width: 500, 
                 height: 600,
                 padding: 20,
                 margin: 20
            }}>
                    <h2>Weather in {locations.city}, {locations.zipCode}</h2>
                    <table className="table table-stripe">
                    <tbody>
                    <tr><td>Weather:</td> <td>{   }</td></tr>
                    <tr><td>Temperature:</td> <td>{  }</td></tr>
                    <tr><td>Humidity:</td> <td>{   }</td></tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Detail;