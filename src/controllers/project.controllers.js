"use strict";

const { projectModel, userModel,teamModel } = require("../models/index.sequelize");

const getProject = async (req, res, next) => {
    try {
        const projects = await projectModel.findAll({
            include: [
                {
                    model: userModel,
                    attributes: ["username"],
                    as: "projectManager",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (projects.length) return res.status(200).json(projects);
        res.status(200).send("no project found");
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        // const user=await findByPk(req.body.projectManagerId,{
        //     attributes:["role",'usernsme']
        // });
        // if(user.role!=="projectManager"){
        //     return res.status(400).json({
        //         message:'failed',
        //         details:`${user.username} can't be a project manager`
        //     })
        // }
        const newProject = await projectModel.create(req.body);
        if(req.body.teamName){
            const newTeam=await teamModel.create({name:req.body.teamName})
            await newProject.addTeams(newTeam);
        }
        res.status(201).json({
            message: "created successfully",
            project: newProject,
        });
    } catch (error) {
        next(error);
    }
};

const getManagerProjects=async(req,res,next)=>{
    try {
        const projects = await userModel.findByPk(req.params.id, {
            attributes: ["id", "username", "role"],
            include: {
                model: projectModel,
                attributes: ["projectName", "startDate", "endDate", "id"],
                as: "managedProjects",
            },
        });
        if(projects) return res.status(200).json(projects);
        res.status(200).send('no projects found')
    } catch (error) {
        next(error);
    }
}

const deleteProject=async(req,res,next)=>{
    try {
        const projectToDelete=await projectModel.findByPk(req.params.projectId);
        await projectToDelete.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getProject,
    createProject,
    getManagerProjects,
    deleteProject,
};
