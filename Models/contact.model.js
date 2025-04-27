const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const contactSchema=new Schema(
    {
       user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
       },
       name:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true,
        unique:true
       },
       mobile:{
        type:String,
        required:true,
        unique:true
       },
       relation:{
        type:String,
        default:"other"
       },
       main_image:{
        type:String,
        required:true
       }
       
    },{timestamps:true}
)

const contactModel=new mongoose.model("contact",contactSchema);
module.exports=contactModel;