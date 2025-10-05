const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/users.js");



router.route("/signup")
.get( userController.renderSignupForm)      // render Signup form
.post( wrapAsync(userController.signup));   // signup




router.route("/login")
.get( userController.renderLoginForm )  // render Login Form
.post(                                 // login
    saveRedirectUrl,                 
     passport.authenticate("local", {
     failureRedirect: "/login",
     failureFlash: true,
    }),
    userController.login  // isse hum login nahi bol sakte kyuki login toh upar automatically PASSPORT kara h, hum nahi kara rahe. Humne bss simplicity k liye likha login isko.
);


router.get("/logout", userController.logout);



module.exports = router;