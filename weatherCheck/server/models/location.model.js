const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    city: {
        type:String,
        required:[true, "City must not be blank"],
    },
    zipCode: {
        type:Number,
        required:[true, "Zip code must not be blank"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdByUserName: {
        type: String
    }
}, {timestamps: true});

const Location = mongoose.model("Location", LocationSchema);


module.exports = Location;