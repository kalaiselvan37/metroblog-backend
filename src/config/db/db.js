import mongoose from "mongoose";
const db=mongoose.createConnection("mongodb+srv://kalaiselvan:32BYVd1xd8MJS0gW@cluster0.jpxtohg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
db.once('open',()=>console.log("DB successfully connected"));
db.on('error',(err)=>console.log(`Db not connceted:${err.message}`));
export default db;