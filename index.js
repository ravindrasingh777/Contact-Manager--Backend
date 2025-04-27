const express = require("express");
const mongoose= require("mongoose");
const userRouter=require("./Routers/user.router");
require('dotenv').config();
var cors = require('cors');
const contactRouter = require("./Routers/contact.router");


const server=express();
server.use(cors({origin:process.env.ACCESS_URL,credentials:true}));
server.use(express.json()) //middleware
server.use(express.static("./Public"))

server.use("/user",userRouter);
server.use("/contact",contactRouter)


mongoose.connect(
    process.env.MONGO_URL,{dbName:"ContactManagement"}
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