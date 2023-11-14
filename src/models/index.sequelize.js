'use strict';

const {Sequelize,DataTypes}=require('sequelize');
const dbString=process.env.DB_URL;
const { usersModelCreator } = require("../models/user.model");
const { projectModelCreator } = require("./projects.model");
const { taskModelCreator } = require("./tasks.model");
const {teamModelCreator}=require('./teams.model')
const sequelize=new Sequelize(dbString,{});
const userModel=usersModelCreator(sequelize,DataTypes);
const projectModel=projectModelCreator(sequelize,DataTypes)
const taskModel=taskModelCreator(sequelize,DataTypes);
const teamModel = teamModelCreator(sequelize,DataTypes)

projectModel.hasMany(taskModel);
taskModel.belongsTo(projectModel);

userModel.hasOne(projectModel, { foreignKey: "projectManagerId" });
projectModel.belongsTo(userModel, { foreignKey: "projectManagerId" });

userModel.belongsToMany(projectModel,{through:"user_project"});
projectModel.belongsToMany(userModel,{through:"user_project"});

teamModel.hasMany(userModel, { foreignKey: "teamId" });
userModel.belongsTo(teamModel, { foreignKey: "teamId" });

userModel.hasOne(teamModel, { foreignKey: "teamLeaderId" });
teamModel.belongsTo(userModel, { foreignKey: "teamLeaderId" });

projectModel.hasMany(teamModel, { foreignKey: "relatedProjectId" });
teamModel.belongsTo(projectModel, { foreignKey: "relatedProjectId" });

teamModel.hasMany(taskModel, { foreignKey: "assigneeTeamId" });
taskModel.belongsTo(teamModel, { foreignKey: "assigneeTeamId" });


module.exports = {
    sequelize,
    userModel,
    projectModel,
    taskModel,
    teamModel,
};