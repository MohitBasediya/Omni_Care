import express  from "express";
import { VerifyEmail,VerifyOtp,loginController,awthenticateController,
ShowServicesController,updateUserController,getOtp,checkOtp,
changePassword,BookService,getCustomerServices,cancelBooking,
getCustomerCancelBookings,bookingPayment,confirmBooking,GetBookingController,getAllocatedProvider} from "../controller/UserController.js";

import { AddReview } from "../controller/UserController.js";

var userRouter = express.Router();

userRouter.post('/verifyemail',VerifyEmail);
userRouter.post('/verifyotp',VerifyOtp);
userRouter.post('/login',loginController);
userRouter.post('/awt_login',(req,res,next)=>{console.log("token in user router-->",req.body.token); next()},awthenticateController);
userRouter.get('/Customer_services',ShowServicesController);
userRouter.post('/updateuser',updateUserController);
userRouter.get('/getOtp/:Email',getOtp);
userRouter.post('/checkOtp',checkOtp);
userRouter.post('/changepassword',changePassword);
userRouter.get('/Customer_services',ShowServicesController);
userRouter.post('/booking',BookService);
userRouter.get('/getServices/:id',getCustomerServices);
userRouter.get('/cancelBooking/:id',cancelBooking);
userRouter.get('/getcancelservices/:id',getCustomerCancelBookings);
userRouter.post('/AddReview',AddReview);
userRouter.post('/payment',bookingPayment);
userRouter.post('/confirmbooking',confirmBooking);
userRouter.get('/getBooking/:id',GetBookingController);
userRouter.get('/getallocatedproviderdata/:id',getAllocatedProvider);
export default userRouter;