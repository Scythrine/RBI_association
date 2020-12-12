//LOGIN ROUTE


//Environment variables
require("dotenv").config({path : __dirname + "/../.env"});

//Importing 
const Router = require("router");
const express = require("express");
const passport = require("passport");
const initPassport = require("../functions/handlePassport")
const handleJWT = require("../functions/handleJWT");
const session = require("express-session");

//Import passport from passport function
initPassport(passport);


const router = Router();

// Global Middlewares
router.use(
  express.urlencoded({
    extended: true, 
  })
);
router.use(express.json());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
router.use(passport.initialize());

// Routing
router.get("/", (req,res)=>{
  res.send("Welcome to Login");
});

// Local Passport Authentication Middleware to authenticate email and password

router.post("/", passport.authenticate("local", {session : false}) ,async(req, res) => {

  // Configuring Payload
  let userData = {
    id: req.user.id,
    name: req.user.name,  
    email: req.user.email
  }

  //Getting Access and Refresh Tokens from handleJWT( getAccessToken and getRefreshToken function)
  try {
  let accessToken = await handleJWT.getAccessToken(userData);
  let refreshToken = await handleJWT.getRefreshToken(userData);
  res.send("Access: " +  accessToken + " \nRefresh: " + refreshToken);
  }
  catch(e){
    res.status(404).send(e);
  }
});

//Exporting
module.exports = router;
