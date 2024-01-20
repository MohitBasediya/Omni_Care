import express from "express";
import {addServiceType,getServiceType,addServices,AdminloginController,AdminawthenticateController,AdminauthorizeUser} from '../controller/adminController.js';
import { upload } from "../middleware/upload.js";
var router=express.Router();

router.post('/addservicetype',addServiceType);
router.get('/getServiceType',getServiceType);
router.post('/login',AdminloginController);
router.post('/addservice', upload,addServices);
router.post('/awt_login',AdminawthenticateController,AdminauthorizeUser);
// router.post('/forgotPassword',ForgotPassword);
// router.post('/sendOtp',VerifyEmail);
// router.post('/verifyotp',VerifyOtp);
export default router;