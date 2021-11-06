import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from '../components/NavBar';
import blueSky from '../images/blueSky.jpg';

const Edit = (props) => {
    const {users, locations, deleteLocationsFromList} = props;
    const [errors, setErrors] = useState({});
    const [oneLocation, setOneLocation] = useState({
        // city: "",
        // zipCode:""
    });
    useEffect(() => {
        axios.get(`http://localhost:8000/api/locations/${props.id}`, { withCredentials: true })
            .then(res => {
                console.log("1", res.data);
                console.log("2", res.data.city);
                console.log("2", res.data.zipCode);
                setOneLocation(res.data);
                // console.log(oneLocation);
                // console.log(oneLocation.zipCode);
            })

            .catch(err => {
                console.log(err.response)
                // setErrors(err.response.data.errors);
    })
    }, [])

    const onChangeHandler = (e) =>{
        let newStateObject = {
            ...oneLocation 
        };
        newStateObject[e.target.name] = e.target.value;
        setOneLocation(newStateObject)
    }
    // const onChangeHandlerZip = (e) =>{
    //     let newStateObject = {
    //         ...oneLocation.zipCode 
    //     };
    //     newStateObject[e.target.name] = e.target.value;
    //     setOneLocation(newStateObject)
    // }


const editLocation = (e) => {
    e.preventDefault();
    console.log("inside edit location")
    axios.put(`http://localhost:8000/api/locations/${props.id}/edit`, oneLocation,
    {
        withCredentials:true
    })  
    .then((res) => {
        console.log(res)
        navigate('/home')
    })
    .catch(err => {
        console.log(err.response)
        if(err.response.status === 401){
            navigate("/home");
        }
        if(err.response.data.errors){
            setErrors(err.response.data.errors);
        }

    })
}
const deleteLocation = (locationId) => {
    axios.delete(`http://localhost:8000/api/locations/${props.id}` ,{
        withCredentials:true
    })
    .then(res => {
        deleteLocationsFromList(locations.id)
        navigate('/home')
        window.location.reload()
        
        
    })
    .catch(err => console.log(err))
}

return(
    <div className="text-center mx-auto" style={{ 
        backgroundImage: `url(${blueSky})`, 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center", 
        textAlign: "center",
        margin: 30}}>
    <NavBar />
    <div className="text-start w-50 mx-auto" style={{color:"white"}}>
        <br/>
        <br/>
        <br/>
        <h2 >Change your Location</h2>

        <form className="mb-3 text-start" onSubmit={editLocation}>
        <label className="form-label">City: </label> 
            <input type="text" value={oneLocation.city}  name="city" className="form-control" onChange={onChangeHandler}/>
                {errors.city? 
                <p>{errors.city.message}</p> 
                :null
                }
                <br></br> 
            
            <label className="form-label">Zip Code: </label> 
            <input type="number" value={oneLocation.zipCode}  name="zipCode" className="form-control" onChange={onChangeHandler} />
                {errors.zipCode?
                <p>{errors.zipCode.message}</p>
                :null
                }
                <br></br> 
            
    
        <button type="submit" className="btn btn-primary">Update </button>&nbsp;&nbsp;&nbsp;
        <button onClick={(e)=>{deleteLocation(locations._id)}} type="button" className="btn btn-danger">Delete</button>     
        </form>
        </div>
    </div>
)
            }
export default Edit;