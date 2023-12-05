'use strict';
const express=require('express');
const Router=express.Router();
const {
    createTeam,
    getTeams,
    getProjectTeams,
} = require("../controllers/team.controllers");

Router.get('/',getTeams);
Router.post('/:projectId',createTeam);
Router.get('/:projectId',getProjectTeams);

module.exports=Router;