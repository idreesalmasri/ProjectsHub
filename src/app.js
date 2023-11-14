'use strict';
const express=require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const notFound=require('./errorsHandlers/404');
const PORT=process.env.PORT;
const start=()=>{
    app.listen(PORT,()=>{
        console.log(`up and running on port ${PORT}`);
    })
}
app.get('/',(req,res)=>{
    res.status(200).send('wlcome to the home page');
})
app.use(notFound);
module.exports={
    start,
    app
}