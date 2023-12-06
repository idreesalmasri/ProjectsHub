"use strict";

const { teamModel, projectModel, userModel } = require("../models/index.sequelize");

const getTeams = async (req, res, next) => {
    try {
        const teams = await teamModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "teamMembers",
                    attributes: ["id", "username"],
                    through: { attributes: [] }, // to exclude the join table record
                },
                {
                    model: userModel,
                    attributes: ["id", "username"],
                    as: "teamLeader",
                },
                {
                    model: projectModel,
                    attributes: ["id", "projectName"],
                    as: "relatedProject",
                },
            ],
        });
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
};
const createTeam = async (req, res, next) => {
    try {
        const team = {
            name: req.body.name,
            projectId: req.params.projectId,
            teamLeaderId: req.body.teamLeaderId,
        };
        const newTeam = await teamModel.create(team);
        // await newTeam.setRelatedProject(req.params.projectId);
        // await newTeam.setTeamLeaderId(req.body.teamLeaderId);
        await newTeam.setTeamMembers(req.body.usersIds); // array of users ids
        res.status(200).json(newTeam);
    } catch (error) {
        next(error);
    }
};
const getProjectTeams = async (req, res, next) => {
    try {
        const teams = await projectModel.findOne({
            where: { id: req.params.projectId },
            attributes: ["projectName", "description"],
            include: {
                model: teamModel,
                attributes: ["id", "name"],
                as: "teams",
                include: {
                    model: userModel,
                    attributes: ["id", "username"],
                    as: "teamLeader",
                },
            },
        });
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
};
module.exports = { createTeam, getTeams, getProjectTeams };
