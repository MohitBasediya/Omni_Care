import { registration } from "../module/Registration.js";
import serviceModel from '../module/ServiceModel.js';
import randomstring from "randomstring";
import { mailer } from "./mailer.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
var otp;
var user={};
export const VerifyEmail = async (req, res) => {
    console.log("registration view blood controller");
    console.log('dataaaa: ', req.body);
    user=req.body;
    try {
        const existingUser = await registration.findOne({ Email: req.body.Email });
        if (existingUser) {
            console.log("exist");
             res.status(250).json({ message: 'Email already exists' });
        }else{
            console.log('data : ', req.body);
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
    console.log('otp : ',req.body);
    console.log(otp);
    if(otp==req.body.otp){
        try{
            console.log('user ',user.Password);
            user.Password=await bcrypt.hash(user.Password,10);
            console.log('user ',user.Password);
          var data=await registration.create(user);     
          console.log(data);     
            res.status(201).json({userdata:data});          
        }catch(error){
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
            expiresIn: '1d'
        }        
     //   console.log('userlogin : ',Email," Password : ",Password);
          const exist = await registration.findOne({
            Email: email
          });
            console.log(exist);
            if (exist) {
              console.log("exist");
                const pass = await bcrypt.compare(password, exist.Password);
                if (pass) {
                    console.log('pass');
                    var user={
                        data:exist,
                        role:"User"
                    }
                    console.log('user : ',user);
                    payload.user = user;                    
                    console.log("payload ",payload);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    //console.log(token);
                    response.status(201).json({ message:'hii',token:token,exist:exist});
                } else {                   
                    response.status(203).json({message:'Password not matched'});
                }
            }
            else {
                console.log("else");
                response.status(202).json({message:'email not matched'});
            }
        
    }catch(error){
        console.log("error",error);
    }
}

export const awthenticateController=async(req,res,next)=>{
   console.log("awthenticateController");
   console.log(req.body);
   var {token}=req.body;
   console.log('token : ',token);
   if (!token) {
    res.status(205).json({ message:'hii',token:cookie_token});    
  }
    jwt.verify(token,SECRET_KEY,(err, payload)=>{  
        // res.status(201).json({ message:'hii'});
           req.payload = payload;  
        if(err)
          console.log('err : ',err);
        else{
        console.log("payload : in authenticate ",payload);
        console.log("authenticate : ");
        next();   
        }
    });
    }
export const authorizeUser = (request,response) => {
    var payload=request.payload;
    console.log('payload  ',payload);
    console.log("authorizeUser : ",payload);
    response.status(201).json({ message: 'User authorized', payload: payload });   
}

export const ShowServicesController = async (request, response) => {
    console.log("showServicesController");
    try {
        const services = await serviceModel.find().lean(); // Use lean() to get a plain JavaScript object
        console.log('services =>', services);

        // Extract relevant data from services
        const extractedServices = services.map(service => ({
            _id: service._id,
            Service_type: service.Service_type,
            Primary: service.Primary,
            Secondary: service.Secondary,
            Tertiary: service.Tertiary,
            __v: service.__v,
        }));

        response.status(200).json({ message: '', services: extractedServices });
    } catch (err) {
        console.log('error  ', err);
        response.status(500).json({ message: 'Internal server error' });
    }
};

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
    }
}