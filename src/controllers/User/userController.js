import mongoose from "mongoose";
import User from "../../models/UserModel.js";


export const SaveUser= async (req,res,next) => {
   try{
       const resdata = await new User(req.body).save()
       res.send(resdata)
   } catch(err){
    console.log(err)
   }
}