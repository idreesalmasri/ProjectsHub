"use strict";
const base64 = require("base-64");
const JWT = require("jsonwebtoken");
const { userModel } = require("../../models/index.sequelize");
const SECRET = process.env.SECRET;

const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let encoded = req.headers.authorization.split(" ").pop();
            let decoded = base64.decode(encoded);
            let [insertedEmail, insertedpassword] = decoded.split(":");
            const { valid, user ,message} = await userModel.validatePassword(
                insertedEmail,
                insertedpassword
            );
            if (!valid) {
                return res.status(403).send(message);
            }
            const { password, ...userData } = user.toJSON();
            let token = JWT.sign(
                {
                    id: user.id,
                    email: user.email,
                    capabilities: user.capabilities,
                },
                SECRET,
                {
                    expiresIn: "1d",
                }
            );
            const userWithoutPassword = { ...userData, token };
            req.user = userWithoutPassword;
            next();
        } else {
            res.status(401).send("please signIn");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = basicAuth;
