'use strict';

const projectModelCreator=(sequelize,DataTypes)=>{
    const projectModel = sequelize.define("project", {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
        additionalInfo: {
            type: DataTypes.JSONB,
        },
    });
    return projectModel;
}

module.exports={
    projectModelCreator
}