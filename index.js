const express = require('express');
const app =express()
require("dotenv").config();
const userRouter = require("./router/user.router")
const PORT = process.env.PORT || 5000;
const{dbconnect} = require('./config/database')

app.use(express.json());



app.listen(PORT, ()=>{
    console.log(`app started at port ${PORT}`)
});

dbconnect();

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello dashboard"
    });
});


app.use('/api/v1', userRouter)

