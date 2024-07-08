import express from 'express';
import { SaveUser } from '../controllers/User/UserController.js';

const UserRouter = express.Router()
   UserRouter.post('/saveuser' , SaveUser)
  
 export default UserRouter; 