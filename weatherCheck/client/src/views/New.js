import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar';
import sky from '../images/sky.jpg';

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
        // <div className="text-start w-50 mx-auto" >
        // <NavBar users={users}/>
        // <h2 >Change your Location</h2>
        // <Form
        // newLocations = {newLocations}
        // setNewLocations = {setNewLocations}
        // errors = {errors}
        // setErrors = {setErrors}
        // users = {users}
        // locations = {locations}
        // submitHandler = {submitHandler}
        // />
        // </div>


        <div className="text-center w-75 mx-auto" style={{ 
            backgroundImage: `url(${sky})`, 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center", 
            textAlign: "center",
            margin: 30,
            padding: 30}} >
        <NavBar users={users}/>
        <div className="text-start w-75 mx-auto">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
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
    </div></div> 
    )
}

export default New;