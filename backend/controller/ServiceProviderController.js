import {serviceprovider} from "../module/ServiceProviderDetail.js";
import {agencyprice} from "../module/Agency_Price.js";
import service from "../module/ServiceModel.js";
import Cook from "../module/CookModel.js";
import { registration } from "../module/Registration.js";
import { Booking } from "../module/BookingModel.js";
import jwt from 'jsonwebtoken';
import { Agency_Booking } from "../module/AgencyBooking.js";
import stripe from 'stripe';
import dotenv from 'dotenv';
import { reviews } from "../module/Review.js";
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
const maxAge = 10 * 24 * 60 * 60;
var spData = {};
var agencyData = {};
const expiryTime = {
    expiresIn: maxAge
}
dotenv.config();
let providerData;
var aadharImg,agencyImg;
const { STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);
export const providerpayment=async(req,res)=>{
    providerData=req.body;
    console.log('req.files ',req.files);
    aadharImg = req.files['aadharimg'][0].originalname;
    agencyImg = (req.files['AgencyImg'])?req.files['AgencyImg'][0].originalname:'';
    try {
        const userData=await registration.findOne({_id:providerData.User_id});
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: userData.Name,
                    },
                    unit_amount: 50000,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000${providerData.pathname}?status=true`,
            cancel_url: `http://localhost:3000${providerData.pathname}?status=false`
        });
        res.status(201).json({id: session.id});
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const ProviderDataInsert = async(req,res)=>{
    try{
    console.log("ProviderDataInsert Controller");
    var payload={};
    var user=await registration.findOne({_id:providerData.User_id});
    console.log("aadharImg : ",aadharImg);    
    console.log("agencyImg : ",agencyImg);

    var provider = await serviceprovider.create({
        User_id:providerData.User_id,
        Address:providerData.Address,
        State:providerData.State,
        City:providerData.City,
        Service_category:providerData.Servicecategory,
        Service_type:providerData.Service_type,
        Aadhar_image:aadharImg,
        Agency_Name:(providerData.AgencyName)?providerData.AgencyName:'',
        Owner_Name:(providerData.OwnerName)?providerData.OwnerName:'',
        Contact_No:(providerData.AgencyContact)?providerData.AgencyContact:'',
        GSTNumber:(spData.GSTNumber)?providerData.GSTNumber:'',
        AgencyDetials:(providerData.AgencyDetails)?providerData.AgencyDetails:'',
        Agency_img : agencyImg,
    });
    payload.user={
        data:[user,provider],
        role:'Service Provider'
    }
    var token=jwt.sign(payload, SECRET_KEY, expiryTime);    
    console.log(token);
    if(provider){
        res.status(201).json({token:token,data:payload.user.data,role:payload.user.role}); 
    }else{        
        res.status(203).json({message:'Error when adding data'});
    }  
  }catch(error){
    console.log('error ',error);
    res.status(500).json({messgae:'Internak server error'});
  }
}

export const AgencyDataInsert = async(req,res)=>{
    console.log("AgencyDataInsert Controller");
    console.log("Agency Data : ",req.body);
    agencyData = req.body;
    console.log("agencyData : ",agencyData);

    var data = await agencyprice.create({
        service_provider_id : agencyData.AgencyId,

        Local_House_Shifting : [{
            BHK1 : {
                upto12Km : agencyData.LocalData.localonebhk1,
                km13to30: agencyData.LocalData.localonebhk2,
                above31km: agencyData.LocalData.localonebhk3,
            }
        },
        {
            BHK2: {
                upto12Km: agencyData.LocalData.localtwobhk1,
                km13to30: agencyData.LocalData.localtwobhk2,
                above31km: agencyData.LocalData.localtwobhk3,
            }
        },
        {
            BHK3: {
                upto12Km: agencyData.LocalData.localthreebhk1,
                km13to30: agencyData.LocalData.localthreebhk2,
                above31km: agencyData.LocalData.localthreebhk3,
            }
        },
        {
            BHK4to5: {
                upto12Km: agencyData.LocalData.localfourtofivebhk1,
                km13to30: agencyData.LocalData.localfourtofivebhk2,
                above31km: agencyData.LocalData.localfourtofivebhk3,
            }
        },
        {
            CompleteHousehold : {
                upto12Km: agencyData.LocalData.localcmplt1,
                km13to30: agencyData.LocalData.localcmplt2,
                above31km: agencyData.LocalData.localcmplt3,
            }
        }
    ],

    City_House_Shifting : [{
        BHK1 : {
            upto100Km : agencyData.CityData.cityonebhk1,
            km100to400: agencyData.CityData.cityonebhk2,
            km400to800: agencyData.CityData.cityonebhk3,
        }
    },
    {
        BHK2: {
            upto100Km : agencyData.CityData.citytwobhk1,
            km100to400: agencyData.CityData.citytwobhk2,
            km400to800: agencyData.CityData.citytwobhk3,
        }
    },
    {
        BHK3: {
            upto100Km : agencyData.CityData.citythreebhk1,
            km100to400: agencyData.CityData.citythreebhk2,
            km400to800: agencyData.CityData.citythreebhk3,
        }
    },
    {
        BHK4to5: {
            upto100Km : agencyData.CityData.cityfourtofivebhk1,
            km100to400: agencyData.CityData.cityfourtofivebhk2,
            km400to800: agencyData.CityData.cityfourtofivebhk3,
        }
    },
    {
        CompleteHousehold : {
            upto100Km : agencyData.CityData.citycmplt1,
            km100to400: agencyData.CityData.citycmplt2,
            km400to800: agencyData.CityData.citycmplt3,
        }
    }
],

State_House_Shifting : [{
    BHK1 : {
        upto900Km   : agencyData.StateData.stateonebhk1,
        km900to1300 : agencyData.StateData.stateonebhk2,
        km1300to1700: agencyData.StateData.stateonebhk3,
    }
},
{
    BHK2: {
        upto900Km   : agencyData.StateData.statetwobhk1,
        km900to1300 : agencyData.StateData.statetwobhk2,
        km1300to1700: agencyData.StateData.statetwobhk3,
    }
},
{
    BHK3: {
        upto900Km   : agencyData.StateData.statethreebhk1,
        km900to1300 : agencyData.StateData.statethreebhk2,
        km1300to1700: agencyData.StateData.statethreebhk3,
    }
},
{
    BHK4to5: {
        upto900Km   : agencyData.StateData.statefourtofivebhk1,
        km900to1300 : agencyData.StateData.statefourtofivebhk2,
        km1300to1700: agencyData.StateData.statefourtofivebhk3,
    }
},
{
    CompleteHousehold : {
        upto900Km   : agencyData.StateData.statecmplt1,
        km900to1300 : agencyData.StateData.statecmplt2,
        km1300to1700: agencyData.StateData.statecmplt3,
    }
}
]

});
    console.log("Data : ",data);
    if(data){
        res.status(201).json({agencydata : data});
    }else{
        res.status(500).json({message:'Internal Server Error When Adding Data'});
    }
}

export const GetProviderServices = async(req,res)=>{
    console.log("GetProviderServices Controller");
    console.log("Service Provider ki Services : ",req.query.Service_type);

    if(req.query.Service_type == 'Cooking'){

        var data = await Cook.find({Service_type : req.query.Service_type});
        console.log("Cooking ProviderServicesData =>",data);
        if(data){
            res.status(201).json({services : data});

        }else{
            res.status(500).json({message:'Internal Server Error When Retriving Data'});
        }

    }else{
        var data = await service.find({Service_type : req.query.Service_type});
        console.log("ProviderServicesData =>",data);
        if(data){
            res.status(201).json({services : data});

        }else{
            res.status(500).json({message:'Internal Server Error When Retriving Data'});
        }
    }   
}

export const getAgencyList=async(req,res)=>{
    try{
       const agencylist = await serviceprovider.find({Service_type:'Shifting Agency'});
       console.log('agency list ',agencylist);
       if(agencylist){
         res.status(201).json({agencylist:agencylist});
       }
    }catch(err){
        console.log('error in catch : ',err);
    }
}

export const updateProviderController = async (req, res) => {
    try {
        console.log("update Provider Controller");
        console.log(req.body.updatedUserData);
        console.log(req.body.updatedUserData1);

        var update1 = await registration.updateOne({ Email: req.body.updatedUserData.Email }, {
            $set: {
                Name: req.body.updatedUserData.Name,
                Contact_No: req.body.updatedUserData.Contact_No,
                Gender: req.body.updatedUserData.Gender
            }
        });

        const userData1 = await registration.findOne({ Email: req.body.updatedUserData.Email });
        console.log("userData of Registration ", userData1);

        var update2 = await serviceprovider.updateOne({ User_id: req.body.updatedUserData1.User_id }, {
            $set: {
                Address: req.body.updatedUserData1.Address,
                Service_category :req.body.updatedUserData1.Service_category
            }
        });
        const userData2 = await serviceprovider.findOne({ User_id: req.body.updatedUserData1.User_id });
        console.log(" User Data Of Serviceprovider ", userData2);
        var userData = [userData1, userData2];
        if (userData) {
            res.status(201).json({ updatedUser: userData });
        }

    } catch (err) {
        console.log("error: ", err);
    }
}

export const getAgencyData = async(req,res)=>{
    var agencyID = req.params.id;
    console.log("agencyID ======>",agencyID);
    try{
        const agencydata = await agencyprice.find({service_provider_id : agencyID});
        console.log(agencydata);

        if(agencydata){
            res.status(201).json({AgencyData : agencydata});
        }else{
            res.status(500);
        }
    }catch(err){
        console.log("error in catch : ",err);
    }
}
export const Servicerequest=async (req,res)=>{
     try{
         var services=await Booking.find();
         const requestedservices = await Promise.all(
            services.map(async (service) => {
                const requestedBookings = await Promise.all(
                    service.BookingData
                        .filter((booking) => booking.Status === 'Pending' && booking.ServiceType.includes(req.params.Service_type))
                        .map(async (pendingBooking) => {
                            console.log('booking ', pendingBooking);
                            const userdata = await registration.findOne({ _id: service.Customer_id });
                            // Add additional information to the pending booking
                            const bookingWithUserData = {
                                ...pendingBooking.toObject(),
                                "Name": userdata.Name
                            };
                            return bookingWithUserData;
                        })
                );
                return requestedBookings;
            })
        );
        const flatRequestedServices = requestedservices.flat();
         if(requestedservices.length>0){
             res.status(201).json({requestdata:flatRequestedServices});
         }
         else{
             res.status(203).json({message:'data not available'});
         }
     }catch(error){
        console.log('error ',error);
        res.status(205).json({error:"Error while fetching request"});
     }   
}

export const acceptRequest= async(req,res)=>{
    try{
         const {id,updatedUserData}=req.body;
         console.log('update : ',updatedUserData,"\n id ",id);
         var update=await Booking.findOneAndUpdate(
            { 'BookingData._id': id },
            {
                $set: {
                    'BookingData.$.Status': 'Accepted',
                    'BookingData.$.Service_provider_id': updatedUserData._id
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
    }
}

export const AgencyBookingRequest = async (req, res) => {
    const { id, bookingData } = req.body;
    try {
        // Save the booking data to the database
        const newBooking = new Agency_Booking({
            serviceProviderId: id,
            serviceType: bookingData.serviceType,
            shiftingType: bookingData.shiftingType,
            fromLocation: bookingData.fromLocation,
            toLocation: bookingData.toLocation,
            date: bookingData.date,
        });

        await newBooking.save();

        // Respond with a success message or other relevant data
        res.status(201).json({ message: 'Booking request submitted successfully' });
    } catch (error) {
        console.error('Error submitting booking request:', error);
        // Handle errors and respond with an error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const Booking_DataController=async (req, res) => {
    try {
        const bookings = await Agency_Booking.find({serviceProviderId:req.params.provider_id});
        if(bookings.length>0){
            
            res.status(201).json({requestdata:bookings});

        }else{
            res.status(203).json({message:'data is empty'});
        }
    } catch (error) {
        console.error('Error fetching agency bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const AgencyacceptController=async(req,res)=>{
console.log("data");
//const { bookingId } = req.params;
console.log("req  ",req.body);
    const { bookingId,Status,drivername,vehiclenumber,traveltime } = req.body;
try {
    const updatedBooking = await Agency_Booking.findByIdAndUpdate(
        bookingId,
        {
            $set: {
                Status,
                drivername,
                vehiclenumber,
                traveltime,
            },
        },
        { new: true }
        
    );
    console.log("updatedata",updatedBooking);
    return res.json(updatedBooking);
}catch(error){
         console.log("error: ",error);
    }
}
// export const providerpayment=async(req,res)=>{
//     const {providerData,pathname}=req.body;
//     try {
//         const userData=await registration.findOne({_id:providerData.User_id});
//         const session = await stripeInstance.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [{
//                 price_data: {
//                     currency: 'INR',
//                     product_data: {
//                         name: userData.Name,
//                     },
//                     unit_amount: 50000,
//                 },
//                 quantity: 1,
//             }],
//             mode: 'payment',
//             success_url: `http://localhost:3000${pathname}?status=true`,
//             cancel_url: `http://localhost:3000${pathname}?status=false`
//         });
//         res.status(201).json({id: session.id});
//     } catch (error) {
//         console.error('Error creating Stripe session:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }