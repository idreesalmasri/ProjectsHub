'use strict';

const organizationModelCreator=(sequelize,DataTypes)=>{
    const organizationModel=sequelize.define('organization',{
        name:{
            type:DataTypes.STRING,
            allwNull:false
        },
        location:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.TEXT
        }
    })
    return organizationModel
}

module.exports = {organizationModelCreator};