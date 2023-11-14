"use strict";

const teamModelCreator = (sequelize, DataTypes) => {
    const teamModel = sequelize.define("team", {
        name: {
            type: DataTypes.ENUM(
                "Frontend",
                "Backend",
                "Database",
                "UI/UX",
                "Quality Assurance"
            ),
            allowNull: false,
        },
    });
    return teamModel;
};

module.exports = {
    teamModelCreator,
};