'use strict';
require("dotenv").config();
const {start}=require('./src/app');
const {sequelize}=require('./src/models/index.sequelize');
sequelize.sync({alter:true}).then(()=>{
    start()
}).catch((error)=>{
    console.log(error);
});