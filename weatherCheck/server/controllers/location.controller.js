const Location = require("../models/location.model");
const jwt = require('jsonwebtoken');

module.exports.findAllLocations = (req, res) => {
  Location.find({})
      .populate("user_id", "username")
      .then(allLocations => res.json({ Locations: allLocations}))
      .catch(err =>{
        console.log("Get all Locations failed");
        res.status(400).json(err)});
      }

module.exports.findAllCartoonsByUser = (req, res)=>{

  Location.find({user_id: req.params.id})
  .then((allUserLocations)=>{
      console.log(allUserLocations);
      res.json(allUserLocations);
  })
  .catch((err)=>{
      console.log(err);
      res.status(400).json(err);
  })
},

module.exports.createNewLocation = (req, res) => {
  const location = new Location(req.body);
  const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true});
  location.user_id = decodedJwt.payload.user_id;
  location.createdByUserName = decodedJwt.payload.username;
  console.log("1",decodedJwt.payload.user_id);
  console.log("2",decodedJwt.payload.username);
  console.log("3", location.createdByUserName);
    Location.create(location)
      .then(newlyCreatedLocation => {
        console.log(newlyCreatedLocation);
        res.json(newlyCreatedLocation)})
      .catch(err => {
        console.log("Create location failed");
        res.status(400).json(err)}
      )};
  

module.exports.findOneLocation = (req, res) => {
  Location.findOne({ _id: req.params.id})
      .then(oneLocation => res.json(oneLocation))
      .catch(err => res.status(400).json(err))
    };

module.exports.updateExistingLocation = (req, res) => {
  Location.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators:true })
  .then(updatedLocation => res.json(updatedLocation))
  .catch(err => res.status(400).json(err));
};

module.exports.deleteExistingLocation = (req, res) => {
  Location.deleteOne({ _id: req.params.id })
  .then(deletedLocation => res.json({ Location: deletedLocation }))
  .catch(err => res.status(400).json(err));
};