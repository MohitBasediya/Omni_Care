import { registration } from "../module/Registration.js";
import randomstring from "randomstring";
import { mailer } from "./mailer.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { providerBankDetails } from "../module/ProviderBankDetails.js";
import { Booking } from "../module/BookingModel.js";
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
var otp;
var user = {};
import serviceModel from "../module/ServiceModel.js";
import { serviceprovider } from '../module/ServiceProviderDetail.js';
import CookModel from "../module/CookModel.js";
import { reviews } from "../module/Review.js";
import stripe from 'stripe';
import dotenv from 'dotenv';
import { payment_model } from "../module/Payment_Module.js";
dotenv.config();
var providerdata,session;

export const AdminloginController = async (request, response) => {
    const { Email, Password } = request.body;
    try {
        let token;
        const payload = {};
        const expiryTime = {
            expiresIn: '7d'
        }
        const exist = await registration.findOne({
            $and: [{ Email: Email }, { User_Role: "Admin" }]
        });
        if (exist) {
            const pass = await bcrypt.compare(Password,exist.Password);
            if (pass) {
                var Admin = {
                    data: exist,
                    role: "Admin"
                }
                payload.Admin = Admin;
                token = jwt.sign(payload,SECRET_KEY,expiryTime);
                //console.log(token);
                response.status(201).json({ message: 'hii', token: token, exist: exist });
            } else {
                response.status(203).json({message:'Password not matched'});
            }
        }
        else {

            response.status(202).json({ message: 'email not matched' });
        }
    } catch (error) {
        console.log("error", error);
        response.status(500).json({error:'Error while login'});
    }
}

export const AdminawthenticateController = async (req, res, next) => {
    var { token } = req.body;
    if (!token) {
        res.status(205).json({ message: 'hii', token: cookie_token });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        // res.status(201).json({ message:'hii'});
        req.payload = payload;
        if (err)
            console.log('err : ', err);
        else {
            next();
        }
    });
}
export const AdminauthorizeUser = (request, response) => {
    var payload = request.payload;
    response.status(201).json({ message: 'User authorized', payload: payload });
}

export const ForgotPassword = async (request, response) => {
    const { email } = req.body;
    registration.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" })
            }
            otp = randomstring.generate({
                length: 4,
                charset: 'numeric',
            });
            console.log('otp ',otp);
            var mailOptions = `Hello <b>${email}</b><br>Your One Time Password is ${otp} enter this otp and Verify Email<br>Thank You 😊`;

            mailer(email, mailOptions.text, (info) => {
                if (info) {
                    res.status(201).json({ Status: 'Success' });
                }
                else {
                    res.status(249).json({ Status: 'failed' });
                }
            })
        })
}

export const VerifyEmail = async (req, res) => {
    user = req.body;
    try {
        const existingUser = await registration.findOne({ Email: req.body.Email });
        if (existingUser) {
            otp = randomstring.generate({
                length: 4,
                charset: 'numeric',
            });
            console.log("otp of user ", otp);
            var message = `Hello <b>${user.Name}</b><br>Your One Time Password is ${otp} enter this otp and Verify Email<br>Thank You 😊`;
            mailer(user.Email, message, (info) => {
                if (info) {
                    // res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    console.log('otp sent sucesfully');
                    res.status(201).json({ message: 'Otp send sucessfully' });
                }
                else {
                    res.status(208).json({ message: 'email not sent' });
                }
            });
        } else {
            res.status(5000).json({ message: 'email not found' });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const VerifyOtp = async (req, res) => {
    console.log('otp : ', req.body);
    console.log(otp);
    if (otp == req.body.otp) {
        try {
            user.Password = await bcrypt.hash(user.Password, 10);
            var data = await registration.create(user);
            res.status(201).json({ userdata: data });
        } catch (error) {
            res.status(500).json({ message: 'internal server error when adding Data' });
        }
    } else {
        res.status(210).json({ message: 'Otp not matched' });
    }
}
export const addServiceType = async (req, res) => {
    try {
        var Service_type = req.body.serviceType;
        var service = await serviceModel.findOne({Service_type:Service_type});
        if (service) {
            res.status(203).json({ msg: 'Data already exist' });
        } else {
            await serviceModel.create({Service_type:Service_type});
            res.status(201).json({ msg: 'data added' });
        }
    } catch (error) {
        res.status(500).json({error:"Error while adding service type"});
        console.log('Error : ', error);
    }
}

export const getServiceType = async (req, res) => {
    try {
        var data = await serviceModel.find({}, { Service_type: 1 });
        res.status(201).json({ servicetype: data });
    } catch (error) {
        console.log('error : ', error);
    }
}

export const addServices = async (req, res) => {
    try {
        const { Service_type, serviceCategory, ServiceName, ServicePrice, ServiceDesc } = req.body;
        var Serviceimage = [];
        for (var i = 0; i < req.files['ServiceImage'].length; i++) {
            Serviceimage.push(req.files['ServiceImage'][i].originalname);
        }
        if (Service_type === 'Cooking') {
            var data = await CookModel.find({ Service_type: Service_type });

            for (var i = 0; i < Serviceimage.length; i++) {
                var obj = {
                    ServiceName: (typeof ServiceName == 'object') ? ServiceName[i] : ServiceName,
                    ServiceImage: Serviceimage[i],
                    ServiceDesc: (typeof ServiceDesc == 'object') ? ServiceDesc[i] : ServiceDesc,
                    ServicePrice: (typeof ServicePrice == 'object') ? ServicePrice[i] : ServicePrice
                }
                data[serviceCategory].push(obj);
            }
            await data.save();
        }
        else if (req.body.Gender) {
            var data = await serviceModel.findOne({ Service_type: Service_type });
            for (var i = 0; i < Serviceimage.length; i++) {
                var obj = {
                    ServiceName: (typeof ServiceName == 'object') ? ServiceName[i] : ServiceName,
                    ServiceImage: Serviceimage[i],
                    ServiceDesc: (typeof ServiceDesc == 'object') ? ServiceDesc[i] : ServiceDesc,
                    ServicePrice: (typeof ServicePrice == 'object') ? ServicePrice[i] : ServicePrice,
                    Gender: (typeof req.body.Gender == 'object') ? req.body.Gender[i] : req.body.Gender
                }
                data[serviceCategory].push(obj);
            }
            await data.save();
        } else {
            var data = await serviceModel.findOne({ Service_type: Service_type });
            for (var i = 0; i < Serviceimage.length; i++) {
                var obj = {
                    ServiceName: (typeof ServiceName == 'object') ? ServiceName[i] : ServiceName,
                    ServiceImage: Serviceimage[i],
                    ServiceDesc: (typeof ServiceDesc == 'object') ? ServiceDesc[i] : ServiceDesc,
                    ServicePrice: (typeof ServicePrice == 'object') ? ServicePrice[i] : ServicePrice
                }
                data[serviceCategory].push(obj);
            }
            await data.save();
        }
        return res.status(201).json({ message: 'ServiceData Added succussfully...' });
    } catch (error) {
        console.log('error : ', error);
    }
}

export const ShowCustomer = async (req, res) => {
    try {
        const customer = await registration.find({ User_Role: "Customer" });
        if (!customer || customer.length === 0) {
            return res.status(404).json({ message: "No Customer Found" })
        }
        else {
            return res.status(200).json({ customer: customer });
        }
    }
    catch (error) {
        console.log("error ", error);
    }
}

export const ShowServiceProvider = async (req, res) => {
    try {
        const RegistrationData = await registration.find({User_Role: "Service Provider" }, { Name: 1, Email: 1, Contact_No: 1, _id: 1, Status:1 });
        console.log("RegistrationData ",RegistrationData[8]);
        var ModifiedRegistrationData = [];

        for (var i = 0; i < RegistrationData.length; i++) {
            var ServiceData = await serviceprovider.findOne({ User_id: RegistrationData[i]._id });
            if(ServiceData){
            var updatedRegistration = {
                ...RegistrationData[i].toObject(),
                Address: ServiceData.Address,
                Service_type: ServiceData.Service_type,
                Service_category: ServiceData.Service_category
            };        
            ModifiedRegistrationData.push(updatedRegistration);
          }
        }

        if (!RegistrationData || RegistrationData.length === 0) {
            return res.status(404).json({ message: "No service provider Found" });
        } else {
            return res.status(200).json({ RegistrationData: ModifiedRegistrationData });
        }

    } catch (error) {
        console.log(error);
    }
}

export const ShowService = async (req, res) => {
    try {
        var service = await serviceModel.find();
        if (!service || service.length === 0) {
            return res.status(404).json({ message: "No service Found" })
        }
        else {
            return res.status(200).json({ service });
        }
    }
    catch (error) {
        console.log("error ", error);
    }
}

export const updateServiceController = async (req, res) => {
    const { ServiceType, ServiceCategory, ...serviceData } = req.body;
    try {
        let image = '';
        if (typeof req.files['image'] !== "undefined") {
            image = req.files['image'][0].originalname;
            serviceData = { ...serviceData, ["image"]: image };
        }

        const id = req.body._id;
        const service = await serviceModel.findOne({ Service_type: ServiceType });
        const indexToUpdate = service[ServiceCategory].findIndex(item => item._id == id);

        if (indexToUpdate !== -1) {
            service[ServiceCategory][indexToUpdate] = { ...serviceData, _id: id };
            await service.save();
        } else {
            console.log("Item not found for update");
        }
        const allService = await serviceModel.find();
        res.status(201).json({ allService, status: 'Service Updated Successfully!!!!' });
    } catch (error) {
        console.log('error ', error);
        const allService = await serviceModel.find();
        res.status(500).json({ allService, status: 'Error while Updating Service' });
    }
}

export const deleteServiceController = async (req, res) => {
    const { ServiceType, ServiceCategory, _id } = req.body;
    try {
        await serviceModel.findOneAndUpdate(
            { Service_type: ServiceType },
            { $pull: { [ServiceCategory]: { _id: _id } } },
        );
        const allService = await serviceModel.find();
        res.status(201).json({ allService, status: 'Service Deleted Successfully!!!!' });
    } catch (error) {
        console.log('error ', error);
        const allService = await serviceModel.find();
        res.status(500).json({ allService, status: 'Error while Deleting Service' });
    }
}

export const UpdateProviderStatus = async (req,res,next)=>{
    var email = req.body.Email;
    try{
        console.log(email);
        const registrationDoc = await registration.findOne({ Email: email });
        console.log("registrationDoc : ",registrationDoc);
        const newStatus = registrationDoc.Status === "Deactive" ? "Active" : "Deactive";
        const sts = await registration.updateOne({ Email: email }, 
            { $set: { Status: newStatus } });
        const regDoc = await registration.findOne({ Email: email });
        console.log("regDoc : ",regDoc);
        if(sts.acknowledged===true){
            next();           
        }else{
            return res.status(500);
        }
    }
    catch(err){
        console.log(err);
    }
}

export const getOtp =async(req,res)=>{
    try{
       const {Email}=req.params;
        var data = await registration.findOne({Email:Email});
        if(data){
            otp=randomstring.generate({
                length:4,
                charset:'numeric',
              });
              console.log("otp of user ",otp);
              var message=`Hello <b>${data.Name}</b><br>Your One Time Password is ${otp} enter this otp and Verify Email<br>Thank You 😊`;
              mailer(data.Email,message,(info)=>{
                if(info){
                    // res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    console.log('otp sent sucesfully');
                    res.status(201).json({ message:'Otp send sucessfully'});
                }
                else{
                    res.status(204).json({message:'email not sent'});   
                }
              });
        }else{
            res.status(203).json({message:'Email not found'});
        }
    }catch(err){
        console.log('error : ',err);
    }
}
export const checkOtp=(req,res)=>{
    console.log('req.body : ',req.body);
    try{
       if(otp==req.body.Otp){
        res.status(201).json({message:'Otp verify succesful'});
       }
       else{
        res.status(203).json({message:'Otp not matched'});
       }
    }catch(err){
       res.status(500).json({message : 'hello user'});
    }
}
export const changePassword=async(req,res)=>{
    try{
        var Password=await bcrypt.hash(req.body.Password,10);
        var data=await registration.updateOne({Email:req.body.Email},
            {
                $set:{
                    Password:Password
                }
            });
         if(data.acknowledged){
             res.status(201).json({message:'password changed'});
         }
         else{
            res.status(203).json({message:'password not update'});
         }
    }catch(err){
        console.log('error : ',err);
    }
}

export const getAllBookingData = async(req,res)=>{
    try{
        var bookings = await Booking.find();
        const requestedBookingData = await Promise.all(            
            bookings.map(async (booking)=>{
                // console.log("booking=>",booking);
                const requestData = await Promise.all(
                    booking.BookingData
                    .filter((bookingData)=> bookingData.Status !== 'Cancel')
                    .map(async (allBookings)=>{
                        const userData = await registration.findOne({_id : booking.Customer_id });
                        if(allBookings.Service_provider_id!==null){
                            const providerData = await registration.findOne({_id : allBookings.Service_provider_id});
                            var bookingDataWithUser = {
                                ...allBookings.toObject(),
                                "ServiceProviderName" : providerData.Name,
                                "CustomerName" : userData.Name
                            }
                        }else{
                            //console.log("in if condition ",allBookings);
                            var bookingDataWithUser = {
                                ...allBookings.toObject(),
                                "CustomerName" : userData.Name
                            }
                        }
                        return bookingDataWithUser;
                    })
                )
                return requestData;
            })
        );
        const flatReqUserData = requestedBookingData.flat();
        if(requestedBookingData.length>0){
            //console.log("requestedBookingData==>",requestedBookingData);
            res.status(201).json({reqBookingsData : flatReqUserData});

        }else{
            //console.log("Error !!!!!!!");
            res.status(201).json({error:"Error while fetching request"});
        }      

    }catch(err){
        console.log("Error !!!!!!!");
        res.status(500).json({message:'error'})
    }
}

export const getAllCancelBookingData = async(req,res)=>{
    try{
        var bookings = await Booking.find();
        //console.log("bookings=>",bookings);
        const requestedCancelBookingData = await Promise.all(
            bookings.map(async(booking)=>{
                //console.log("booking=>",booking);
                const requestedCancelBookings = await Promise.all(
                    booking.BookingData
                    .filter((cancelBookings)=>cancelBookings.Status == 'Cancel')
                    .map(async (allCancelBookings)=>{

                        const userDataaa = await registration.findOne({_id : booking.Customer_id});
                        // if(allCancelBookings.Service_provider_id!==null){
                        //     console.log("In if block...");
                            //const providerDataaa = await registration.findOne({_id : allCancelBookings.Service_provider_id});

                            var cancelBookingDataWithUser = {
                                ...allCancelBookings.toObject(),
                                "ServiceProviderName" : 'null',
                                //"ServiceProviderName" : providerDataaa.Name,
                                "CustomerName" : userDataaa.Name,
                            }

                        // }else{
                        //     console.log("In else block...");
                        //     var cancelBookingDataWithUser = {
                        //         ...allCancelBookings.toObject(),
                        //         "CustomerName" : userData.Name
                        //     }
                        // }
                        console.log("cancelBookingDataWithUser==>",cancelBookingDataWithUser);
                        return cancelBookingDataWithUser;
                    })
                )
                return requestedCancelBookings;
            })
        );

        const flatReqCancelBookings = requestedCancelBookingData.flat();
        if(requestedCancelBookingData.length > 0){
            console.log("requestedCancelBookingData===>",requestedCancelBookingData);
            console.log("flatReqCancelBookings===>",flatReqCancelBookings);
            res.status(201).json({reqCancelBookingData : flatReqCancelBookings});

        }else{
            console.log("Error!!!");
            res.status(201).json({error:"Error while fetching request"});
        }

    }catch(err){
        res.status(500).json({message : err});
        console.log("Error In Catch Block!!");
    }
}

export const AdminReview = async(req,res)=>{
    try {
        var result = await reviews.aggregate([
            {
                $lookup:{
                    from: "registrations",
                    localField:"User_Id",
                    foreignField:"_id",
                    as:"user"
                },
            },
        ])
        if (result.length > 0 && result[0].user.length > 0) {
            // console.log("User Field Data:", result[0].user[0]);
            return res.status(201).json({result:result});
        } else {
            console.log("No user field data found.");
        }
    } catch (error) {
        console.log(error);  
    }
}

export const UserReview = async(req,res,next)=>{
    try {
        const Id=req.body.id;
        const data= await reviews.findById({_id:Id});
        console.log(data);
        let result=null;
         if(data.Status=="Decline")
         {
              result=await reviews.updateOne({_id:Id},
                {
                    $set:{
                        Status:"Accept"
                    }
                });
                console.log('result ',result);
                if(result.acknowledged)
                 next();
                
            }
            else if(data.Status=="Accept")
            {
                 result=await reviews.updateOne({_id:Id},
                    {
                        $set:{
                            Status:"Decline"
                        }
                    });
                    console.log('result ',result);
                    if(result.acknowledged)
                     next();
            }

    } catch (error) {
        console.log(error)
    }   

}

export const CardData = async(req,res)=>{
    try {         
          const Customerdata= await registration.find({User_Role:'Customer'});
          const result1=Customerdata.length;
          const Servicedata= await registration.find({User_Role:'Service Provider'});
          const result2=Servicedata.length; 

        const data ={
            result1:result1,
            result2:result2
        }              
        return res.status(201).json({data:data});        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
}

export const providerPaymentRequest = async(req,res)=>{
    try{
        var result = await providerBankDetails.find({paymentStatus:'Pending'});
        if(result.length>0){
            for(var i=0;i<result.length;i++){
                var providerdata= await serviceprovider.findOne({User_id:result[i].providerId},{Wallet:1,_id:0});
                providerdata={...providerdata.toObject(),...result[i].toObject()};
                result[i]=providerdata;
                console.log("result : ",result[i]);
            }
            res.status(201).json({resultPayment:result});
        }else{
            res.status(203).json({message:'No Request find'});
        }
    }catch(error){
        console.log("error : ",error);
        res.status(500).json({message:'error while fetching data'});
    }
}
export const providerPayment = async(req, res) => {
    providerdata = req.body.data;
    const pathname = req.body.pathname; 
    console.log("==>In providerPayment", providerdata);
    try {
        session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'INR',
                    product_data:  {
                        name: providerdata.providerName,
                    },      
                    unit_amount: providerdata.Wallet_amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000${pathname}?status=true',
            cancel_url: 'http://localhost:3000${pathname}?status=false',  
        });
        console.log("session : ",session);
        res.status(201).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const providerPaymentDataSubmit = async(req,res)=>{
    try{
        const role = await registration.findOne({User_Role : 'Admin'});
        console.log("role=>",role);
        

        var date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
        var obj = {
            User_id : providerdata.providerId,
            Amount  : providerdata.Wallet_amount,
            Date    : date,
            Trannsaction_id : session.id,
            Booking_id : role._id
        }
        var data = await payment_model.create(obj);
        console.log("Data =>",data);

        var result = await providerBankDetails.updateOne({_id : providerdata._id},
            {
                $set : {
                    paymentStatus : "Completed"
                }
            }); 
        console.log('data ',providerdata);

        var result2= await serviceprovider.updateOne({ User_id: providerdata.providerId},
            { $set: { Wallet: 0 } });
        
        if(result2.acknowledged){
            res.status(201).json({message:'data updated'});
        }
        else{
            res.status(203).json({message:'data not updatrd'})
        }
    }catch(error){
        console.log("Error :",error);
    }
}