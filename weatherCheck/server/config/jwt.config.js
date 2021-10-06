//create our middleware
//if a user is not logged in, send an error response back


const jwt = require('jsonwebtoken');


module.exports = {
    authenticate(req, res, next){
        jwt.verify(req.cookies.usertoken,
            process.env.JWT_SECRET,
            //once we compare the unhashed version of the cookie, run this callback function

            (err, payload)=>{
                if(err){
                     //not a valid token or cookie doesn't exist
                     res.status(401).json({verified:false})
                }
                else{
                    //err is null, so verified
                    console.log("all good to go forward");
                    next();
                }
            })
    }
}