import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from '../components/NavBar';
// import Form from '../components/Form';

const Edit = (props) => {
    const {users, locations, deleteLocationsFromList} = props;
    const [errors, setErrors] = useState({});
    const [editedLocation, setEditedLocation] = useState({
        // city: "",
        // zipCode:""
    });
    useEffect(() => {
        axios.get(`http://localhost:8000/api/locations/${props.id}`, { withCredentials: true })
            .then(res => {
                console.log("1", res.data);
                console.log("2", res.data.city);
                console.log("2", res.data.zipCode);
                setEditedLocation(res.data);
                console.log(editedLocation);
                // console.log(editedLocation.zipCode);
            })

            .catch(err => {
                console.log(err.response)
                // setErrors(err.response.data.errors);
    })
    }, [])

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
    <div className="mx-auto">
    <NavBar />
    <div className="text-start w-50 mx-auto" >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h2 >Change your Location</h2>

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
    </div>
)
            }
export default Edit;