const userController=require("../Controllers/user.controller");
const express=require("express");

const userRouter=express.Router();

userRouter.post("/create",userController.register);
userRouter.post("/login",userController.login)

module.exports=userRouter;
