const userModel =require("../Models/user.model");
const Cryptr = require('cryptr');
const cryptr = new Cryptr("Ravindra@123");
const sendMail =require("../emailsender");
const jwt=require("jsonwebtoken");


const userController={

   async register(req,res){
    try {
        const email=req.body.email;
        const password=req.body.password;
        
        const user=new userModel({
           email:email,
           password:password
        })
        await user.save();
       
        const token=jwt.sign({...user.toJSON()},process.env.JWT_KEY,{expiresIn:"24h"})
        sendMail(email,"User Authentication","Register Successfully, Welcome To Contact Management")

        res.cookie("user_Token",token,
            { 
             httpOnly: false, 
             secure: false,
             sameSite:'lax',
             maxAge: 1000 * 60 * 60 * 24  // 24 hrs  
            }
           );

           res.json({flag:1,msg:"User Registration Successfully...",user:{
            ...user.toJSON(),
            token
        }})

    } catch (error) {
        res.send({flag:0,msg:error.message})
    }
   },

   async login(req,res){
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user=await userModel.findOne({email:email});
        if(user){
            if(cryptr.decrypt(user?.password) == password){
                sendMail(email,"User Authentication","Login Successfully, Welcome To Contact Management");
                const token=jwt.sign({...user.toJSON()},process.env.JWT_KEY,{expiresIn:"24h"})
                res.cookie("user_Token",token,
                    { 
                     httpOnly: false, 
                     secure: false,
                     sameSite:'lax',
                     maxAge: 1000 * 60 * 60 * 24  // 24 hrs  
                    }
                   );
                   res.json({flag:1,msg:"User Login Successfully...",user:{
                    ...user.toJSON(),
                    token
                }})
              }else{
                  res.send({flag:0,msg:"Unable To Login User Make Sure Password Is Correct..."})
              }
        }else{
            res.send({flag:0,msg:"Unable To Login User Make Sure Email Is Correct..."})
        }
    } catch (error) {
        res.send({flag:0,msg:error.message})
    }
   }
}

module.exports=userController;