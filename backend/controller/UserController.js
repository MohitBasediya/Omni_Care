import { registration } from "../module/Registration.js";
import serviceModel from '../module/ServiceModel.js';
import CookModel from '../module/CookModel.js';
import { Booking } from "../module/BookingModel.js";
import randomstring from "randomstring";
import { mailer } from "./mailer.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serviceprovider } from "../module/ServiceProviderDetail.js";
import { reviews } from "../module/Review.js";
const maxAge = 10 * 24 * 60 * 60;
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
import stripe from 'stripe';
import dotenv from 'dotenv';
import { payment_model } from '../module/Payment_Module.js';
dotenv.config();
var otp;
var user={};
const { STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);
var u_data,b_data,session;
export const VerifyEmail = async (req, res) => {
    user=req.body;
    try {
        const existingUser = await registration.findOne({ Email: req.body.Email });
        if (existingUser) {
             res.status(250).json({ message: 'Email already exists' });
        }else{
            //mail
            otp=randomstring.generate({
                length:4,
                charset:'numeric',
              });
              console.log("otp of user ",otp);
              var message=`Hello <b>${user.Name}</b><br>Your One Time Password is ${otp} enter this otp and Verify Email<br>Thank You 😊`;
              mailer(user.Email,message,(info)=>{
                if(info){
                    // res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    console.log('otp sent sucesfully');
                    res.status(201).json({ message:'Otp send sucessfully'});
                }
                else{
                    res.status(208).json({message:'email not sent'});   
                }
              });            
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const VerifyOtp=async(req,res)=>{
    var payload={}
    var data;
    const expiryTime = {
        expiresIn: maxAge
    }
    if(otp==req.body.otp){
        try{
         user.Password=await bcrypt.hash(user.Password,10);
          if(user.User_Role==='Service Provider'){
             var obj={...user,Status:'Deactive'};
             data = await registration.create(obj);
          }else{
             data = await registration.create(user);
          }
          console.log('data : ',data);
          if(user.User_Role==='Customer'){
            payload.user={
                data:data,
                role:'Customer'
            }
            var token=jwt.sign(payload,SECRET_KEY,expiryTime);
             res.status(201).json({token:token,userdata:data,role:'Customer'}); 
          }else{
            console.log(data);     
            res.status(201).json({userdata:data}); 
          }         
        }catch(error){
            console.log('error ',error);
            res.status(500).json({message:'internal server error when adding Data'});
        }
    }else{
        res.status(210).json({message:'Otp not matched'});
    }
}
export const loginController=async(request,response)=>{
    console.log("logincontroller");
    const {email, password} = request.body;
    console.log("requestbody",request.body);
    //console.log('email '+Email);   
    try {
        let token;
        const payload = {};
        const expiryTime = {
            expiresIn: maxAge
        }        
     //   console.log('userlogin : ',Email," Password : ",Password);
          const exist = await registration.findOne({
            Email: email,Status:'Active'
          });
            // console.log(exist);
            if (exist) {
              console.log("exist");
                const pass = await bcrypt.compare(password, exist.Password);
                if (pass) {
                    var user={};
                    console.log('pass');
                    if(exist.User_Role==='Service Provider')
                        user={data:exist,role:"Service Provider"}
                    else
                        user={data:exist,role:"Customer"}
                    console.log("user in login controller : ",user);
                    payload.user = user;    
                    console.log("pyaload in login controller : ",payload);                
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    response.status(201).json({ message:'login success',token:token,exist:user.data,role:user.role});
                } else {                   
                    response.status(203).json({message:'Password not matched'});
                }
            }
            else {
                response.status(202).json({message:'email not matched'});
            }
        
    }catch(error){
        console.log("error",error);
        response.status(500).json({messgae:'error'});
    }
}

export const awthenticateController=async(req,res)=>{
    console.log('authenticate');
     var {token}=req.body;
        jwt.verify(token,SECRET_KEY,async(err, payload)=>{  
            if(err){
             console.log('err : ',err);
             res.status(203).json({error :'Error while checking token'});
            }else{
                if(payload.user.role==='Service Provider'){
                    console.log("payload ",payload.user.data);
                    const data1=payload.user.data;
                    console.log('65af430dae58000f2333ceb8 ',data1._id);
                    var provider = await serviceprovider.findOne({User_id:data1._id});
                    console.log("provider : ",provider);
                    res.status(201).json({data:[payload.user.data,provider],role:'Service Provider'});
                }else{
                    console.log("payload in customer ",payload.user.data);
                    const data1=payload.user.data;
                    console.log('data 1 ',data1);
                   var customer=await registration.findOne({_id:data1._id});
                   console.log("customer : ",customer);
                   res.status(201).json({message: 'User authorized', data:customer,role:'Customer'});   
                }
            }      
      });
}


export const updateUserController = async (request,response)=>{
    try{
        console.log("updateUserController");
        console.log(request.body.updatedData);
        var userData = await registration.updateOne({Email : request.body.updatedData.Email},{
            $set : { 
                Name : request.body.updatedData.Name,
                Contact_No : request.body.updatedData.Contact_No,
                Gender : request.body.updatedData.Gender
            }});

          console.log("userData",userData);
          
        if(userData){
            response.status(201).json({updatedUser : userData});
        }      
                    
    }catch(err){
        console.log('error ',err);
        response.status(500).json({messgae:'error'});
    }
}
export const getOtp =async(req,res)=>{
    console.log('get OTP');
    try{
       const {Email}=req.params;
       console.log('Email : ',req.params);
        var data = await registration.findOne({Email:Email});
        if(data){
            console.log('data : ',data);
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
        res.status(500).json({messgae:'error'});
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
        console.log('error : ',err);
        res.status(500).json({messgae:'error'});
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
         console.log('data : ',data); 
         if(data.acknowledged){
             res.status(201).json({message:'password changed'});
         }
         else{
            res.status(203).json({message:'password not update'});
         }
    }catch(err){
        console.log('error : ',err);
        res.status(500).json({messgae:'error'});
    }
}

export const ShowServicesController = async (request, response) => {
    console.log("showServicesController");
    try {
        const services = await serviceModel.find().lean(); // Use lean() to get a plain JavaScript object
        const Cook = await CookModel.find().lean();
        // Extract relevant data from services
        const extractedServices = services.map(service => ({
            _id: service._id,
            Service_type: service.Service_type,
            Primary: service.Primary,
            Secondary: service.Secondary,
            Tertiary: service.Tertiary,
            __v: service.__v,
        }));
        const CookData = Cook.map(Cook => ({
            _id: Cook._id,
            Service_type: Cook.Service_type,
            Rajasthani: Cook.Rajasthani,
            Gujarati: Cook.Gujarati,
            South_Indian: Cook.South_Indian,
            Chineses: Cook.Chinese,
            Normal: Cook.Normal,
        }));
        response.status(200).json({ message: '', services: extractedServices, Cookdata: CookData });
    } catch (err) {
        console.log('error  ', err);
        response.status(500).json({ message: 'Internal server error' });
    }
};

export const BookService = async(req,res)=>{
    try{
        const {Customer_id}=req.body;
        var userdetail=await registration.findOne({_id:Customer_id});
        var bookingdata=await Booking.findOne({Customer_id:Customer_id});
        var sent=true;
        if(bookingdata){
           bookingdata.BookingData=[...bookingdata.BookingData,{ServiceCategory:req.body.ServiceCategory,ServiceName:req.body.ServiceName,ServiceType:req.body.ServiceType,TotalPrice:req.body.TotalPrice,Address:req.body.Address,City:req.body.City,State:req.body.State,Date:req.body.Date,Time:req.body.Time}]
           await bookingdata.save();
        }else{
           bookingdata=[{ServiceCategory:req.body.ServiceCategory,ServiceName:req.body.ServiceName,ServiceType:req.body.ServiceType,TotalPrice:req.body.TotalPrice,Address:req.body.Address,City:req.body.City,State:req.body.State,Date:req.body.Date,Time:req.body.Time}];
           var data=await Booking.create({
            Customer_id:Customer_id,
            BookingData:bookingdata
           });
        }
        const ProviderData = await serviceprovider.find({Service_type:req.body.ServiceType});
        ProviderData.forEach(async(data)=>{
            if(data.Service_category.includes(req.body.ServiceCategory)){
                var service_provider=await registration.findOne({_id:data.User_id});
                var message=`Hello ${service_provider.Name} Booking of <b>${userdetail.Name}</b> for <b>${req.body.ServiceName}</b> services on <b>${req.body.Date}</b> at <b>${req.body.Time}</b> <br> If you want to accept then click on this <br> <a href='http://localhost:3000'>Omnicare</a>`;
                mailer(service_provider.Email,message,(info)=>{
                    if(info){
                        sent=true
                        console.log('request sent successfully');
                    }
                });
            }
        });
        if(sent)
           res.status(201).json({message:'request sent'});  
        else{
           res.status(203).json({message:'error in sending request'});
        }

    }catch(error){
        console.log('error ',error);
        res.status(500).json({messgae:'error'});
    }
}

export const getCustomerServices = async(req,res)=>{
    console.log('getCustomer');
    try{
        const id=req.params.id;
        console.log("customer id : ",id);
        var bookingData=await Booking.findOne({Customer_id:id});
        console.log("bookingData ",bookingData);
        
        if(bookingData.BookingData.length>0){
            var Customer_Booking=[];
            for(var i=0;i<bookingData.BookingData.length;i++)
            {
                var booking=bookingData.BookingData[i];
                if(booking.Status==='Accepted' || booking.Status==='Confirm'){
                   console.log('bookign : ',booking);
                   var providerdata=await registration.findOne({_id:booking.Service_provider_id});
                   console.log();
                   booking={...booking.toObject(),'ServiceProviderName':providerdata.Name};
                   Customer_Booking.push(booking);
                }
                else{
                    Customer_Booking.push(booking); 
                }
            }
            console.log('bookingData : ',Customer_Booking);
            res.status(201).json({BookingData:Customer_Booking});
        }
        else{
            res.status(203).json({messgae:'No Booking'});
        }
    }catch(error){
        console.log('error ',error);
        res.status(500).json({message:'Error while fetching Data'});
    }
}

export const cancelBooking = async(req,res)=>{
    try{
        const id=req.params.id;
        console.log('in controller');
        var update=await Booking.findOneAndUpdate(
            { 'BookingData._id': id },
            {
                $set: {
                    'BookingData.$.Status': 'Cancel'                    
                }
            },
            { new: true });
            if (!update) {
                res.status(404).json({ error: 'Booking not found' });
            } else {
                res.status(201).json({ message: 'Booking status updated successfully' });
            }
    }catch(error){
        console.log('error ',error);
        res.status(500).json({messgae:'error'});
    }
}

export const getCustomerCancelBookings = async(req,res)=>{
    try{
        const id = req.params.id;
        var bookingData = await Booking.findOne({Customer_id:id});
        var cancelBookingsData=[];
        bookingData.BookingData
        .filter((cb)=>cb.Status == 'Cancel')
        .map(async (allcancelBookings)=>{
             cancelBookingsData = [...cancelBookingsData,allcancelBookings];
        });
        if(cancelBookingsData.length>0){
            res.status(201).json({cancelBookings : cancelBookingsData});
        }else{
            res.status(203).json({error:"Error while fetching request"});
        }
    }catch(err){
        console.log("error",err);
        res.status(500).json({message:'Error while fetching Data'});
    }
}

export const AddReview=async(req,res)=>{
    try{
       const review=req.body.review;
       const userId=req.body.userId;
        
        var result = await reviews.create({
            User_Id:userId,
            Text_Review:review,
        });
    if(result){
        res.status(201).json({result : result});
    }else{
        res.status(203).json({message:'Internal Server Error When Adding Review'});
    }  
    }
    catch(error)
    {
        console.log(" Error while inserting review"+error);
        res.status(500).json({message:error});
    }
};

export const bookingPayment = async(req,res)=>{
    u_data = req.body.userData;
    b_data = req.body.Booking;
    const pathname = req.body.pathname;
    try {
         session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: u_data.Name,
                    },
                    unit_amount: (b_data.TotalPrice*100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000${pathname}?status=true`,
            cancel_url: `http://localhost:3000${pathname}?status=false`
        });
        res.status(201).json({id: session.id});
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const confirmBooking = async(req,res)=>{
    try{    
        console.log("confirm :",b_data,"\n u_data ",u_data,"session : ",session);
        var sent = true;
        var sent2 = true;
        var otp1=randomstring.generate({
            length:4,
            charset:'numeric'
          });
        var update=await Booking.findOneAndUpdate(
            { 'BookingData._id': b_data._id },
            {
                $set: {
                    'BookingData.$.Status': 'Confirm',
                    'BookingData.$.Otp':otp1                  
                }
            },
            { new: true });
        if(update){
            console.log("update : ",update);
           var provider =await registration.findOne({_id:b_data.Service_provider_id});
           var message1=`Booking of ${u_data.Name} is confirmed and you will go to provide ${provider.ServiceName} on ${provider.Date} Thank You`
            mailer(provider.Email,message1,(info)=>{
                if(info){
                    sent=true;
                    console.log('request sent successfully');
                }else{ sent=false}
            });
            var message2=`Booking of ${u_data.Name} is confirmed and your otp is ${otp1} you will provide this otp to Service Provider when service complete Thank You`;
            console.log("u_data : ",u_data);
            mailer(u_data.Email,message2,(info)=>{
                if(info){
                    sent2=true
                    console.log('request sent successfully');
                }else { sent2=false }
            });
            if(sent && sent2){
                var date = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear();
                var obj={
                    User_id:u_data._id,
                    Amount:b_data.TotalPrice,
                    Date:date,
                    Transaction_id:session.id,
                    Booking_id:b_data._id
                }
                var data=await payment_model.create(obj);
                console.log("data ",data);
                res.status(201).json({messsgae:'Booking confirmed',billdata:{...b_data,...data}});
            }
        }else{
            res.status(203).json({message:'error while confirm booking'});
        }
    }catch(error){
        console.log("error ",error);
        res.status(500).json({messsage:'error'});
    }
}

export const GetBookingController = async(req,res)=>{
    console.log("GetBookingControoler");
    try{
        const id=req.params.id;
        console.log("customer id : ",id);
        var bookingData=await Agency_Booking.find({Customer_id:id});
        console.log("Agency bookingData ",bookingData);
        res.status(201).json({message:"agency",bookingData:bookingData});
    }catch(error){
        console.log("error  ",error);
        res.status(500).json({message:error});  
    }
}

export const getAllocatedProvider = async(req,res)=>{
    try{
       const id = req.params.id;
       var service_provider=[];
       var data = await Booking.findOne({Customer_id:id},{BookingData:1});
       const booking = data.BookingData;
       console.log("booking : --------> ",booking);
       for(var i=0;i<booking.length;i++){
          if(booking[i].Service_provider_id){
            console.log("provider : ------> ",booking[i].Service_provider_id);
           var provider = await serviceprovider.findOne({User_id:booking[i].Service_provider_id},{Service_type:1,ProfileImg:1,_id:0});
           var provider_name = await registration.findOne({_id:booking[i].Service_provider_id},{Name:1,Email:1,Contact_No:1,_id:0});
          }
          service_provider = [...service_provider,{...provider_name.toObject(),...provider.toObject()}];
       }
       res.status(201).json({providerData:service_provider});
    }catch(error){
        console.log("error : ",error);
        res.status(500).json({message:error});
    }
}