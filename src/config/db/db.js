import mongoose from "mongoose";
const db=mongoose.createConnection("mongodb://localhost:27017/Metroblog");
db.once('open',()=>console.log("DB successfully connected"));
db.on('error',(err)=>console.log(`Db not connceted:${err.message}`));
export default db;