const locationController = require("../controllers/location.controller");
const  { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.get("/api/locations", locationController.findAllLocations);
    app.post("/api/locations", authenticate,locationController.createNewLocation);
    app.get("/api/locations/user/:id", locationController.findAllCartoonsByUser);
    app.get("/api/locations/:id", locationController.findOneLocation);
    app.put("/api/locations/:id/edit", locationController.updateExistingLocation);
    app.delete("/api/locations/:id", locationController.deleteExistingLocation);
}