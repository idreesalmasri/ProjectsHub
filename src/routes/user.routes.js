'use strict';
const express=require('express');
const Router=express.Router();
const basicAuth=require('../auth/middlewares/basicAuth')

const {
    getUser,
    createUser,
    signInHandler,
    getRoleUsers,
} = require("../controllers/users.controllers");
Router.route("/").get(getUser).post(createUser);
Router.post("/signin", basicAuth,signInHandler);
Router.get('/role',getRoleUsers);

module.exports=Router;