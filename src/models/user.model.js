"use strict";
const permissions = require("./lib/permissions.json");
const bcrypt = require("bcrypt");
const usersModelCreator = (sequelize, DataTypes) => {
    const userModel = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lastLoginAt: {
            type: DataTypes.DATE,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role: {
            type: DataTypes.ENUM(
                "superAdmin",
                "projectManager",
                "teamLeader",
                "teamMember"
            ),
            allowNull: false,
        },
        stack: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.ENUM("Junior", "Mid", "Senior"),
            defaultValue: "Junior",
        },
        specialistIn: {
            type: DataTypes.ENUM(
                "Frontend",
                "Backend",
                "Database",
                "UI/UX",
                "Quality Assurance"
            ),
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                return {
                    usersModule: permissions.usersModule[this.role],
                    projectsModule: permissions.projectsModule[this.role],
                    teamsModule: permissions.teamsModule[this.role],
                    tasksModule: permissions.tasksModule[this.role],
                };
            },
        },
    });
    userModel.validatePassword = async (insertedEmail, password) => {
        const user = await userModel.findOne({
            where: { email: insertedEmail },
        });
        if (!user) return { valid: false, message: "Invalid email" };
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return { valid: false, message: "Invalid password" };
        }
        return { valid: true, user };
    };
    return userModel;
};

module.exports = {
    usersModelCreator,
};
