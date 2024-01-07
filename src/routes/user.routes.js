'use strict';
const express=require('express');
const Router=express.Router();
const basicAuth=require('../auth/middlewares/basicAuth')

const {
    getUser,
    createUser,
    signInHandler,
    getRoleUsers,
    updateUser,
} = require("../controllers/users.controllers");
Router.route("/").get(getUser).post(createUser);
Router.route("/:id").patch(updateUser);
Router.post("/signin", basicAuth,signInHandler);
Router.get('/role',getRoleUsers);

module.exports=Router;