'use strict';
const express=require('express');
const Router=express.Router();
const {
    newTask,
    getProjectTasks,
    getUserTasksInProject,
    deleteTask,
} = require("../controllers/task.controllers");
Router.route("/:projectId")
    .post(newTask)
    .get(getProjectTasks)
Router.get("/:projectId/:userId", getUserTasksInProject);
Router.delete("/:taskId", deleteTask);
module.exports=Router;
