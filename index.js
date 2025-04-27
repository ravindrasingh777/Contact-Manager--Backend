const express = require("express");
const mongoose= require("mongoose");
const userRouter=require("./Routers/user.router");
require('dotenv').config();
var cors = require('cors');
const contactRouter = require("./Routers/contact.router");


const server=express();
server.use(cors({origin:"http://localhost:3000",credentials:true}));
server.use(express.json()) //middleware
server.use(express.static("./Public"))

server.use("/user",userRouter);
server.use("/contact",contactRouter)


mongoose.connect(
    "mongodb://localhost:27017/",
    {dbName:"ContactManegment"}
).then(
    ()=>{
        server.listen(5000,
            ()=>{
                console.log("Server is running on port 5000");
                console.log("Database is Connected Successfully...")
            }
        )
    }
).catch(
    ()=>{
        console.log("Unable to connect database...")
    }
)