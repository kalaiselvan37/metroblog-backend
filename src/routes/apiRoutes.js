// apiRoutes.js
import express from 'express';
import { register, verifyOTP } from '../controllers/auth/registerController.js';
import { login } from '../controllers/auth/loginController.js';
import { sendForgotPasswordOTP, updatePassword, verifyForgotPasswordOTP } from '../controllers/auth/passwordController.js';

const apiRouter = express.Router();
apiRouter.post('/apilogin', login);
apiRouter.post('/apiregister', register);
apiRouter.put('/apiverifyOTP', verifyOTP);
apiRouter.post('/apisendforgotpasswordOTP', sendForgotPasswordOTP);
apiRouter.post('/apiverifyforgotpasswordOTP', verifyForgotPasswordOTP);
apiRouter.post('/apiupdatepassword', updatePassword);




export default apiRouter;
