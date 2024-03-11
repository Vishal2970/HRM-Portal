// controller 
// middleware

const express = require("express");
const router = express.Router();
const auth_controllers = require('../Controller/auth-controller');


// router.route("/login").post(auth_controllers.login);
router.route("/login").post(auth_controllers.login);

module.exports =router;