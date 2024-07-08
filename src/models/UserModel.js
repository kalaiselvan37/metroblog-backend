import mongoose from "mongoose";
import db from "../config/db/db.js";

const UserSchema = mongoose.Schema({
    Name : String,
    Email: String,
    MobileNumber : String,
    Password : String,
    OTP : String,
    Role:String,
    User_Status :  { type: String, default: 'Active' }
},{timestamps:true})
const User = db.model('users',UserSchema)
export default User