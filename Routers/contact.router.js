const contactController =require("../Controllers/contact.controller");
const express =require("express");
const contactRouter=express.Router();
const fileupload =require("express-fileupload")

contactRouter.post("/add",fileupload({createParentPath:true}),contactController.addcontact);
contactRouter.get("/get-data/:userId",contactController.getdata);
contactRouter.get("/get-data-by-contactid/:contactid",contactController.getdatabycontactid);
contactRouter.get("/get-data-by-name/:name",contactController.getdatabyname);
contactRouter.get("/get-data-by-relation/:relation",contactController.getdatabyrelation);
contactRouter.delete("/delete/:id",contactController.deletecontact);
contactRouter.put("/edit-contact",fileupload({createParentPath:true}),contactController.editcontact)

module.exports=contactRouter