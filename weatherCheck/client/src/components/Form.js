import React, {useEffect, useState} from 'react';

import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Form = (props)=>{
    const { editedLocation, setEditedLocation, users, errors, setErrors, locations, deleteLocationsFromList } = props;

    const onChangeHandler = (e) =>{
        let newStateObject = {
            ...editedLocation 
        };
        newStateObject[e.target.name] = e.target.value;
        setEditedLocation(newStateObject)
    }
    const editLocation = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/locations/${props.id}/edit`, editedLocation)  
        .then((res) => {
            console.log(res)
            navigate('/home')
        })
        .catch(err => {
            console.log(err.response)
            setErrors(err.response.data.errors)})
    }
    const deleteLocation = (locationId) => {
        axios.delete(`http://localhost:8000/api/locations/${props.id}` )
        .then(res => {
            deleteLocationsFromList(locations.id)
            navigate('/home')
            window.location.reload()
            
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="text-start w-50 mx-auto" >


        <form className="mb-3 text-start" onSubmit={editLocation}>
        <label className="form-label">City: </label> 
            <input type="text" value={editedLocation}  className="form-control" onChange={onChangeHandler}/>
                {errors.editedLocation? 
                <p>{errors.editedLocation.message}</p> 
                :null
                }
                <br></br> 
            
            <label className="form-label">Zip Code: </label> 
            <input type="number" value={editedLocation}  className="form-control" onChange={onChangeHandler} />
                {errors.editedLocation?
                <p>{errors.editedLocation.message}</p>
                :null
                }
                <br></br> 
            
            
        <button onclick = {editLocation} type="button" className="btn btn-primary">Update </button>
        <button onClick={(e)=>{deleteLocation(locations._id)}} type="button" className="btn btn-secondary">Delete</button>     
        </form>
        
    </div>

    )
            }

export default Form;