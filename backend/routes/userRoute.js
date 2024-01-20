import express  from "express";
import { VerifyEmail,VerifyOtp,loginController,awthenticateController,authorizeUser,ShowServicesController,updateUserController,getOtp,checkOtp,changePassword} from "../controller/UserController.js";
var userRouter = express.Router();
userRouter.post('/verifyemail',VerifyEmail);
userRouter.post('/verifyotp',VerifyOtp);
userRouter.post('/login',loginController);
userRouter.post('/awt_login',awthenticateController,authorizeUser);
userRouter.get('/Customer_services',ShowServicesController);
userRouter.post('/updateuser',updateUserController);
userRouter.get('/getOtp/:Email',getOtp);
userRouter.post('/checkOtp',checkOtp);
userRouter.post('/changepassword',changePassword)
export default userRouter;