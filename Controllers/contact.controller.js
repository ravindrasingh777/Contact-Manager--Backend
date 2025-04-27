const contactModel =require("../Models/contact.model");
const fsmodule=require("fs");
const sendMail =require("../emailsender");

const contactController={
  async addcontact(req,res){
    try {
    const main_image=req.files.main_image;
    const user_id=req.body?.user_id;
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const relation=req.body.relation;

    const destination="./Public/contact-images/";
    main_image.mv(
        destination + main_image.name,
        async(err)=>{
          if(err){
            res.send({flag:0, msg:"Unable to upload image..."})
          }else{
            const contact=new contactModel(
                {
                    user_id:user_id,
                    name:name,
                    email:email,
                    mobile:mobile,
                    relation:relation,
                    main_image:main_image.name
                }
            )
            await contact.save()
             .then(
                     ()=>{
                         res.send({
                            flag:1,
                             msg:"Contact Added Sucessfully..."
                            })
                            }
                        ).catch(
                         (err)=>{
                        fsmodule.unlinkSync(destination + main_image.name)
                        res.send({
                            flag:0,
                             msg:err.message
                            })
                            }
                              )
          }
        }
    )
    } catch (error) {
        
    }



  },

  async getdata(req,res){
   try {
    const userId=req.params.userId;
    const contactdata=await contactModel.find({user_id:userId}).sort({createdAt:-1});
    res.send({flag:1,msg:"Contacts Fetched Successfully...",contactdata});
   } catch (error) {
    res.send({flag:0,msg:error.message,});
   }
  },

  async deletecontact(req,res){
    try {
    const id=req.params.id;
    await contactModel.findByIdAndDelete(id);
    res.send({flag:1,msg:"Contact Delete Successfully..."})
    } catch (error) {
      res.send({flag:0,msg:error.message})
    }
  },

  async getdatabycontactid(req,res){
    try {
      const contactid=req.params.contactid;
      const contactdata=await contactModel.findById(contactid);
      res.send({flag:1,msg:"Contacts Fetched Successfully...",contactdata});
     } catch (error) {
      res.send({flag:0,msg:error.message,});
     }

  },

  async editcontact(req,res){
    try {
      const main_image=req.files.main_image;
      const name=req.body.name;
      const email=req.body.email;
      const mobile=req.body.mobile;
      const relation=req.body.relation;
      const contact_id=req.body.contact_id;

      console.log(main_image,name,email,mobile,relation,contact_id);

      await contactModel.findByIdAndUpdate(contact_id,{
        name:name,
        email:email,
        mobile:mobile,
        relation:relation,
        main_image:main_image.name
      })
      res.send({flag:1,msg:"Contact Update Successfully..."})

    } catch (error) {
      res.send({flag:0,msg:"Unable To Update Contact..."})
    }
  },

  async getdatabyname(req,res){
   try {
    const name=req.params.name;
    if(name){
    const contact=await contactModel.find({name: { $regex: new RegExp(name, "i") }})
    res.send({flag:1,msg:"Contact Fetched Successfully...",contact})
   }
   } catch (error) {
    res.send({flag:0,msg:"Unable to fetch Contact..."})
   }
  },

  async getdatabyrelation(req,res){
    try {
      const relation=req.params.relation;
      if(relation != "All"){
        const contact=await contactModel.find({relation:relation});
        res.send({flag:1,msg:"Contact Fetched Successfully...",contact})
      }
    } catch (error) {
      res.send({flag:0,msg:"Unable to fetch contact"})
    }
  }


}

module.exports=contactController;