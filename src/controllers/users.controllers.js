"use strict";
const { userModel } = require("../models/index.sequelize");
const bcrypt = require("bcrypt");
const getUser = async (req, res, next) => {
    try {
        const users = await userModel.findAll({
            attributes: {
                exclude: ["password", "capabilities"], // List the attributes you want to exclude
            },
        });
        if (users.length) return res.status(200).json(users);
        res.status(200).send(" no users found");
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPass;
        }
        const newUser = await userModel.create(req.body);
        const { password, ...userData } = newUser.toJSON();
        res.status(201).json({
            message: "created succecfuly",
            user: userData,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Invalid data provided",
                details: error.parent.detail,
            });
        }
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: error.message,
            });
        }
        next(error);
    }
};
const signInHandler = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

const getRoleUsers = async (req, res, next) => {
    try {
        const list = await userModel.findAll({
            where: { role: req.query.role },
            attributes: ["id", "username", "level", "specialistIn"],
        });
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userModel.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.status(200).json({
            message: "updated successfully",
            user: updatedUser[1][0],
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Invalid data provided",
                details: error.parent.detail,
            });
        }
        next(error);
    }
};
module.exports = {
    getUser,
    createUser,
    signInHandler,
    getRoleUsers,
    updateUser,
};
