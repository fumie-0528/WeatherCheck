import React, {useEffect, useState} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';


const WeatherList = (props) => {
    const {users, locations} = props;
    const [locationList, setLocationList] = useState([]);


useEffect(() =>{
        axios.get("http://localhost:8000/api/locations/")
        .then(res => {
            console.log("I am here");
            console.log(res.data.Locations);
            setLocationList(res.data.Locations);

            console.log(locationList);

        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className ="text-center w-100 mx-auto" style={{
            backgroundColor: "#f9f9f9" ,

            backgroundPosition: "center", 
            margin: 30,
            padding: 30
        }}>
            <br></br>
            <h4>Let's check the weather of your favorite city!</h4>
                <table className="table table-hover">
                <thead>
                <tr>
                <th>User</th>
                <th>City</th>
                <th>Zip Code</th>
                <th>Actions Available</th>
                <th></th>
                </tr>
                </thead>  
                <tbody>
                {locationList.length > 0 && locationList.map((location, index)=>{
                return (
                    <tr key={index}>
                    <td>{location.user_id.username}</td>
                    <td>{location.city}</td>
                    <td>{location.zipCode}</td>
                    <td>
                    {
                        localStorage.getItem("userId") === location.user_id._id?

                    <button type="button" className="btn btn-success"><Link to={`/location/${location._id}/edit`}>Edit</Link></button>
                        :null
                }
                    </td>
                    <td><button type="button" className="btn btn-info"><Link to={`/location/${location._id}`}>Detail</Link></button></td>

                    </tr>
                )})}
            </tbody>
            </table>    
            <div className="text-start">
            <Link to ="/location/new"><button className="btn btn-primary ">Add location</button></Link></div>
        </div>
            )
}

export default WeatherList;