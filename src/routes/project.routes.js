'use strict';
const express=require('express');
const Router=express.Router();
const {
    createProject,
    getProject,
    getManagerProjects,
} = require("../controllers/project.controllers");


Router.route('/').get(getProject).post(createProject);
Router.get("/manager/:id", getManagerProjects);

module.exports=Router;