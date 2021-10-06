const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res)=>{
        console.log("in register");
        console.log(req.body);
      //use the req data and the User model constructor to create a user object
      const user = new User(req.body);
        //info is already in the instance of THIS object. no need to pass anything in.
        //save is an instance method. doesn't require anything passed in.
        //create is static and takes the object as the parameter.

        user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Successfully registered!");
                res.json({
                    successMessage:"Thank you for registering!",
                    user: newUser
                })
            })
            .catch((err)=>{
                console.log("register NOT successful");
                console.log(err);
                res.status(400).json(err);
            })
    },

    login: (req, res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
            //check if this returned obj is null
            if(userRecord === null){// email not found
                res.status(400).json({message: "Invalid Login Attempt"})
            }
            else{
                //email is found
                //compare req.body.email to fields in the collection
                bcrypt.compare(req.body.password, userRecord.password) //salt both 10x ...return promise BOOLEAN t/f
                .then((isPasswordValid)=>{
                    if(isPasswordValid){
                        console.log("password is valid");

                    res.cookie("usertoken",
                        jwt.sign({ //payload is data we want to save
                            user_id: userRecord._id,
                            email: userRecord.email
                        },
                        //we need a key to sign and hash cookie's data
                        process.env.JWT_SECRET),

                        {//configuration settings for this cookie (options) 
                            httpOnly: true,
                            expires: new Date(Date.now() + 9000000)
                        }   
                    )
                    .json({
                        message:"Successfully Logged in",
                        userLoggedIn: userRecord.username
                    })
                }
                
                else{
                    res.status(400).json({message:"Login and/or Email Invalid"})//dont specifiy 4 securty
                }
                })

                .catch((err)=>{
                    console.log(err);
                    res.status(400).json({message: "Invalid Attempt"});
                })
            }
            })
            .catch((err)=>{
                console.log("error");
                res.status(400).json({message: "Invalid Attempt"});
            })
    },

    logout: (req, res) =>{
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message:"You have successfully logged out!"
        })
    },
    getOneUser: (req, res)=>{
        User.findOne({_id: req.params.id})
        .then((oneUser)=>{
            console.log(oneUser);
            res.json(oneUser);
        })    
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    }
}


