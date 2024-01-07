'use strict';

const { taskModel, projectModel, userModel } = require("../models/index.sequelize");

const newTask=async(req,res,next)=>{
    const{userId,...rest}=req.body;
    const taskData = {
        ...rest,
        projectId: req.params.projectId,
    };
    try {
        const task=await taskModel.create(taskData);
        res.status(201).json({
            message:'created successfully',
            task
        })
        await task.setAssigneeUser(req.body.userId);
    } catch (error) {
        next(error)
    }
}
const getProjectTasks=async(req,res,next)=>{
    try {
        const list = await projectModel.findByPk(req.params.projectId,{
            attributes: ["id", "projectName"],
            include: {
                model: taskModel,
                as: "tasks",
                include: {
                    model: userModel,
                    as: "assigneeUser",
                    attributes: ["id", "username"],
                },
            },
        });
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
const getUserTasksInProject=async (req,res,next)=>{
    try {
        const list = await projectModel.findByPk(req.params.projectId, {
            attributes: ["id", "projectName"],
            include: {
                model: taskModel,
                as: "tasks",
                include: {
                    model: userModel,
                    as: "assigneeUser",
                    where:{id:req.params.userId},
                    attributes: ["id", "username"],
                },
            },
        });
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}


module.exports = { newTask, getProjectTasks, getUserTasksInProject };