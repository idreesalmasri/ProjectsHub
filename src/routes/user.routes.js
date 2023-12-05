'use strict';
const express=require('express');
const Router=express.Router();
const basicAuth=require('../auth/middlewares/basicAuth')

const {
    getUser,
    createUser,
    signInHandler,
} = require("../controllers/users.controllers");
Router.route("/").get(getUser).post(createUser);
Router.post("/signin", basicAuth,signInHandler);


module.exports=Router;