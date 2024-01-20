import { registration } from "../module/Registration.js";
import randomstring from "randomstring";
import { mailer } from "./mailer.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
var otp;
var user = {};
import serviceModel from "../module/ServiceModel.js";
import CookModel from "../module/CookModel.js";
export const AdminloginController = async (request, response) => {
    console.log(" Admin logincontroller");
    const { Email, Password } = request.body;
    console.log('email ' + Email);
    try {
        let token;
        const payload = {};
        const expiryTime = {
            expiresIn: '1d'
        }
        console.log('Adminlogin : ', Email, " Password : ", Password);
        const exist = await registration.findOne({
            $and: [{ Email: Email }, { User_Role: "Admin" }]
        });
        console.log(exist);
        if (exist) {
            console.log("exist");
            const pass = await bcrypt.compare(Password, exist.Password);
            if (pass) {
                console.log('pass');
                var Admin = {
                    data: exist,
                    role: "Admin"
                }
                console.log('Admin : ', Admin);
                payload.Admin = Admin;
                console.log("payload ", payload);
                token = jwt.sign(payload, SECRET_KEY, expiryTime);
                //console.log(token);
                response.status(201).json({ message: 'hii', token: token, exist: exist });
            } else {
                response.status(203).json({ message: 'Password not matched' });
            }
        }
        else {
            console.log("else");
            response.status(202).json({ message: 'email not matched' });
        }

    } catch (error) {
        console.log("error", error);
    }
}

export const AdminawthenticateController = async (req, res, next) => {
    console.log("awthenticateController");
    console.log(req.body);
    var { token } = req.body;
    console.log('token : ', token);
    if (!token) {
        res.status(205).json({ message: 'hii', token: cookie_token });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        // res.status(201).json({ message:'hii'});
        req.payload = payload;
        if (err)
            console.log('err : ', err);
        else {
            console.log("payload : in authenticate ", payload);
            console.log("authenticate : ");
            next();
        }
    });
}
export const AdminauthorizeUser = (request, response) => {
    var payload = request.payload;
    console.log('payload  ', payload);
    console.log("authorizeUser : ", payload);
    response.status(201).json({ message: 'User authorized', payload: payload });
}

export const ForgotPassword = async (request, response) => {
    console.log(12345);
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
    console.log("registration view blood controller");
    console.log('dataaaa: ', req.body);
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
export const addServiceType = async (req, res) => {
    try {
        var Service_type = req.body.serviceType;
        console.log('service type: ', Service_type);
        var service=await serviceModel.find({Service_type});
         if(service){
           res.status(203).json({msg:'Data already exist'});
         }
          await serviceModel.create({ Service_type });
          res.status(201).json({ msg: 'data added' });
    } catch (error) {
        console.log('Error : ', error);
    }
}

export const getServiceType = async (req, res) => {
    try {
        var data = await serviceModel.find({}, { Service_type: 1 });
        console.log('service type : ', data);
        res.status(201).json({ servicetype: data });
    } catch (error) {
        console.log('error : ', error);
    }
}

export const addServices = async (req,res) => {
    try {
         const {Service_type,serviceCategory,ServiceName,ServicePrice,ServiceDesc}=req.body;
         console.log("reqbody ==================== : ", req.body);
         console.log('type of Service Name ',typeof ServiceName);
        //  console.log('req-body -----------------> ',req.body);
         console.log('req -------------------------------> ',req.files['ServiceImage'][0].originalname);
         var Serviceimage=[];
         for(var i=0;i<req.files['ServiceImage'].length;i++){
            Serviceimage.push(req.files['ServiceImage'][i].originalname);
         }
         console.log("ServiceImages : ",Serviceimage,ServiceName,serviceCategory);
         if(Service_type === 'Cooking'){
            var data = await CookModel.findOne({ Service_type: Service_type });
            console.log('cook ',data);

            for (var i=0;i<Serviceimage.length;i++) {
                var obj={
                    ServiceName:(typeof ServiceName == 'object')?ServiceName[i]:ServiceName,
                    ServiceImage:Serviceimage[i],
                    ServiceDesc:(typeof ServiceDesc == 'object')?ServiceDesc[i]:ServiceDesc,
                    ServicePrice:(typeof ServicePrice == 'object')?ServicePrice[i]:ServicePrice
                }
                data[serviceCategory].push(obj);
            }
           await data.save();
         }
         else if(req.body.Gender){
            var data = await serviceModel.findOne({ Service_type: Service_type });
            for (var i=0;i<Serviceimage.length;i++) {
                console.log('type of : ', ServiceName,serviceCategory);
                var obj={
                    ServiceName:(typeof ServiceName == 'object')?ServiceName[i]:ServiceName,
                    ServiceImage:Serviceimage[i],
                    ServiceDesc:(typeof ServiceDesc == 'object')?ServiceDesc[i]:ServiceDesc,
                    ServicePrice:(typeof ServicePrice == 'object')?ServicePrice[i]:ServicePrice,
                    Gender:(typeof req.body.Gender == 'object')?req.body.Gender[i]:req.body.Gender
                }
                data[serviceCategory].push(obj);
            }
           await data.save();
         }else{
            var data = await serviceModel.findOne({ Service_type: Service_type });
            for (var i=0;i<Serviceimage.length;i++) {
                console.log('type of : ',ServiceName,ServiceName,serviceCategory);
                var obj={
                    ServiceName:(typeof ServiceName == 'object')?ServiceName[i]:ServiceName,
                    ServiceImage:Serviceimage[i],
                    ServiceDesc:(typeof ServiceDesc == 'object')?ServiceDesc[i]:ServiceDesc,
                    ServicePrice:(typeof ServicePrice == 'object')?ServicePrice[i]:ServicePrice
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