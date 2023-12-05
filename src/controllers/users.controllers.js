'use strict';
const {userModel} = require("../models/index.sequelize");
const bcrypt = require("bcrypt");
const getUser=async(req,res,next)=>{
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
}

const createUser=async(req,res,next)=>{
    try {
        const hashedPass=await bcrypt.hash(req.body.password,10);
        req.body.password=hashedPass;
        const newUser = await userModel.create(req.body);
        const {password,...userData}=newUser.toJSON();
        res.status(201).json({
            message: "created succecfuly",
            user: userData,
        });
    } catch (error) {
        console.log(error.detail);
        next(error)
    }
}
const signInHandler=async (req,res,next)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getUser,
    createUser,
    signInHandler,
};