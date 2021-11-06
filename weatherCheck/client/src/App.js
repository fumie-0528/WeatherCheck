import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router'; 
import Main from './views/Main';
import Edit from './views/Edit';
import Detail from './views/Detail';
import LogRegi from './views/LogRegi';
import New from './views/New';
import Login from './views/Login';

function App() {
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [reloadBoolean, setReloadBoolean] = useState(false);
  const deleteLocationsFromList = locationId =>{
    setLocations(locations.filter(locations => locations.id !== locationId));
}
  return (
    <div className="App">
      
      <Router>      
        <Login path="/login" users={users} locations={locations} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}></Login>
        <LogRegi path="/" users={users} locations={locations} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
        <Main path="/home" users={users} locations={locations} setReloadBoolean={setReloadBoolean} reloadBoolean={reloadBoolean}/>
        <Edit path="/location/:id/edit" 
        locations={locations} 
        deleteLocationsFromList = {deleteLocationsFromList} locations={locations}/>
        <Detail path="/location/:id" users={users} locations={locations}/>
        <New path="/location/new" users={users} locations={locations}/>
      </Router>
    </div>
  );
}

export default App;
