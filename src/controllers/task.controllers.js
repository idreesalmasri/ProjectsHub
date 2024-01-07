'use strict';

const { taskModel, projectModel, userModel } = require("../models/index.sequelize");

const newTask=async(req,res,next)=>{
    const taskData = {
        ...req.body,
        projectId: req.params.projectId,
    };
    try {
        const task=await taskModel.create(taskData);
        res.status(201).json({
            message:'created successfully',
            task
        });
    } catch (error) {
        next(error)
    }
}
const getProjectTasks=async(req,res,next)=>{
    try {
        const list = await projectModel.findByPk(req.params.projectId, {
            attributes: ["id", "projectName"],
            include: {
                model: taskModel,
                as: "tasks",
                include: {
                    model: userModel,
                    as: "assigneeUser",
                    attributes: ["id", "username"],
                },
                separate: true,
                order: [["createdAt", "DESC"]],
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
                    where: { id: req.params.userId },
                    attributes: ["id", "username"],
                },
                separate: true,
                order: [["createdAt", "DESC"]],
            },
        });
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

const deleteTask=async(req,res,next)=>{
    try {
        const taskToDelete=await taskModel.findByPk(req.params.taskId);
        await taskToDelete.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    newTask,
    getProjectTasks,
    getUserTasksInProject,
    deleteTask,
};