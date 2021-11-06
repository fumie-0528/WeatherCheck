import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar';
import blueSky from '../images/blueSky.jpg';

const New = (props) =>{
    const {users, locations} = props;
    const [errors, setErrors] = useState({});
    const [newLocations, setNewLocations] = useState({
        city:"",
        zipCode:"",
    });
    const onChangeHandler = (e) =>{
        let newStateObject = {
            ...newLocations 
        };
        newStateObject[e.target.name] = e.target.value;
        setNewLocations(newStateObject)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/locations", newLocations,
        {
            withCredentials:true
        }
        ) 
        .then(res => {
            console.log("I am here")
            console.log(res)
            console.log(newLocations)
            navigate('/home')
    })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            console.log(err.data)
            if(err.response.status === 401){
                navigate("/home");
            }
            if(err.response.data.errors){
                setErrors(err.response.data.errors);
            }
    })};

    
    return (
        <div className="text-center mx-auto" style={{ 
            backgroundImage: `url(${blueSky})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            textAlign: "center",
            height: "100vh",
            backgroundSize: "cover",
            }} >
        <NavBar users={users}/>
        <div className="text-start w-50 mx-auto" style={{color:"white"}}>
        <br/>
        <br/>
        <br/>

        <h3>Enter your Favorite city and zip code:</h3>
        <form onSubmit = {submitHandler} className="mb-3">

        <label className="form-label">City: </label> 
        <input type="text" value={newLocations.city} name="city" className="form-control" onChange={onChangeHandler}/>
           {errors.city?
            <p>{errors.city.message}</p>
            :null
            }
            <br></br> 
            
        <label className="form-label">Zip code: </label> 
        <input type="number" value={newLocations.zipCode} name="zipCode" className="form-control" onChange={onChangeHandler}/>
            {errors.zipCode?
            <p>{errors.zipCode.message}</p>
            :null
            }  
            <br></br> 
        <button type="submit" className="btn btn-primary">Register</button>
 </form>
    </div>
    </div> 
    )
}

export default New;