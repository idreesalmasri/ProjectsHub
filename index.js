'use strict';
require("dotenv").config();
const {start}=require('./src/app');
const {sequelize}=require('./src/models/index.sequelize');
sequelize.sync().then(()=>{
    start()
}).catch((error)=>{
    console.log(error);
});