'use strict';

const taskModelCreator=(sequelize,DataTypes)=>{
    const tasksModel = sequelize.define("task", {
        name: {
            type: DataTypes.STRING,
            allwNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allwNull:false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allwNull: false,
        },
        priority: {
            type: DataTypes.ENUM("High", "Medium", "Low"),
            defaultValue: "Medium",
        },
        status: {
            type: DataTypes.ENUM("Open", "In Progress", "Completed"),
            defaultValue: "Open",
        },
        additionalInfo: {
            type: DataTypes.JSONB, 
        },
    });
    return tasksModel;
}

module.exports={
    taskModelCreator
}