import express from 'express';
import { createPost, deletePost, getblogposts, getPostById, getviewblogposts, updatePost } from '../controllers/Post/postController.js';
import multer from 'multer';



const postRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

postRouter.post('/createpost', upload.array('Image'), createPost);
postRouter.get('/getblogspost', getblogposts);
postRouter.get('/getblogpostbyid/:id',getPostById);
postRouter.get('/getviewblogpost',getviewblogposts);
postRouter.put('/updatepost/:id',updatePost);
postRouter.delete('/deletepost/:id', deletePost);
export default postRouter;