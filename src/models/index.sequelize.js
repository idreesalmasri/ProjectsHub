"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const dbString = process.env.DB_URL;
const { usersModelCreator } = require("../models/user.model");
const { projectModelCreator } = require("./projects.model");
const { taskModelCreator } = require("./tasks.model");
const { teamModelCreator } = require("./teams.model");
const { organizationModelCreator } = require("./organization.model");
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
              dialectOptions: {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false,
                  },
              },
          }
        : {};

const sequelize = new Sequelize(dbString, sequelizeOptions);
const userModel = usersModelCreator(sequelize, DataTypes);
const projectModel = projectModelCreator(sequelize, DataTypes);
const taskModel = taskModelCreator(sequelize, DataTypes);
const teamModel = teamModelCreator(sequelize, DataTypes);
const organizationModel = organizationModelCreator(sequelize, DataTypes);

// organizationModel.hasMany(userModel,{foreignKey:'organizationId', as:'organizationMembers'});
// userModel.belongsTo(organizationModel, {foreignKey: "organizationId",as: "relatedOrganization"});

// organizationModel.hasMany(projectModel, { foreignKey: "organizationId" , as:'organizationProjects'});
// projectModel.belongsTo(organizationModel, { foreignKey: "organizationId" ,as:"relatedOrganization"});

userModel.hasMany(projectModel, {
    foreignKey: "projectManagerId",
    as: "managedProjects",
    onDelete: "CASCADE",
});
projectModel.belongsTo(userModel, {
    foreignKey: "projectManagerId",
    as: "projectManager",
    onDelete: "CASCADE",
});

projectModel.hasMany(teamModel, {
    foreignKey: "projectId",
    as: "teams",
    onDelete: "CASCADE",
});
teamModel.belongsTo(projectModel, {
    foreignKey: "projectId",
    as: "relatedProject",
    onDelete: "CASCADE",
});

userModel.hasMany(teamModel, { foreignKey: "teamLeaderId", as: "leadedTeam" });
teamModel.belongsTo(userModel, {
    foreignKey: "teamLeaderId",
    as: "teamLeader",
});

userModel.belongsToMany(teamModel, { through: "user_team", as: "memberOf" });
teamModel.belongsToMany(userModel, { through: "user_team", as: "teamMembers" });

// teamModel.hasMany(taskModel, { foreignKey: "teamId", as:"tasks" });
// taskModel.belongsTo(teamModel, { foreignKey: "teamId",as:"assigneeTeam" });

projectModel.hasMany(taskModel, {
    foreignKey: "projectId",
    as: "tasks",
    onDelete: "CASCADE",
});
taskModel.belongsTo(projectModel, {
    foreignKey: "projectId",
    as: "project",
    onDelete: "CASCADE",
});

userModel.hasMany(taskModel, { foreignKey: "userId", as: "assignedTasks" });
taskModel.belongsTo(userModel, {
    foreignKey: "userId",
    as: "assigneeUser",
    onDelete: "CASCADE",
});

module.exports = {
    sequelize,
    userModel,
    projectModel,
    taskModel,
    teamModel,
    organizationModel,
};
