import express from "express";
import {addServiceType,getServiceType,addServices,AdminloginController,
AdminawthenticateController,changePassword,checkOtp,getOtp,updateServiceController,
AdminauthorizeUser,ShowService,ShowCustomer,ShowServiceProvider,deleteServiceController,
UpdateProviderStatus,getAllBookingData,getAllCancelBookingData,AdminReview,UserReview,
CardData,providerPayment,providerPaymentDataSubmit,providerPaymentRequest} from '../controller/adminController.js';
import { upload,upload2} from "../middleware/upload.js";

var router=express.Router();

router.post('/addservicetype',addServiceType);
router.get('/getServiceType',getServiceType);
router.post('/login',AdminloginController);
router.post('/addservice',upload,addServices);
router.post('/awt_login',AdminawthenticateController,AdminauthorizeUser);
router.get('/getOtp/:Email',getOtp);
router.post('/checkOtp',checkOtp);
router.post('/changepassword',changePassword);
router.get('/customer',ShowCustomer);
router.get('/serviceprovider',ShowServiceProvider);
router.get('/service',ShowService);
router.post("/updateService", upload2,updateServiceController);
router.post("/deleteService", deleteServiceController);
router.post('/updatstatus',UpdateProviderStatus,ShowServiceProvider);
router.get('/allbooking',getAllBookingData);
router.get('/allcancelbooking',getAllCancelBookingData);
router.get("/UserReview",AdminReview);
router.post("/updatReviewstatus",UserReview,AdminReview);
router.get('/getcard_data',CardData);
router.get('/allpaymentdata',providerPaymentRequest);
router.post("/payment",providerPayment);
router.post("/submitpaymentdata",providerPaymentDataSubmit);
export default router;