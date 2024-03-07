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
import { providerBankDetails } from "../module/ProviderBankDetails.js";
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
const maxAge = 10 * 24 * 60 * 60;
var spData = {};
var agencyData = {};
const expiryTime = {
    expiresIn: maxAge
}
dotenv.config();
let providerData;
var aadharImg,agencyImg,profileimg;
const { STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);
export const providerpayment=async(req,res)=>{
    providerData=req.body;
    aadharImg = (req.files['aadharimg'])?req.files['aadharimg'][0].originalname:'';
    agencyImg = (req.files['AgencyImg'])?req.files['AgencyImg'][0].originalname:'';
    profileimg = (req.files['profileimg'])?req.files['profileimg'][0].originalname:'';
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
        GSTNumber:(providerData.GSTNumber)?providerData.GSTNumber:'',
        AgencyDetials:(providerData.AgencyDetails)?providerData.AgencyDetails:'',
        Agency_img : agencyImg,
        ProfileImg:profileimg
    });
    payload.user={
        data:user,
        role:'Service Provider'
    }
    var token=jwt.sign(payload, SECRET_KEY, expiryTime);    
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
                    'BookingData.$.Service_provider_id': updatedUserData.User_id
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
    const { id, agencyFormData } = req.body;
    console.log("agency : =====> ", agencyFormData);
    console.log("serviceprovider : =====> ", id);

    try {
        // Fetch coordinates for fromLocation and toLocation
        const [fromCoordinates, toCoordinates] = await Promise.all([
            fetchCoordinates(agencyFormData.fromlocation),
            fetchCoordinates(agencyFormData.tolocation)
        ]);

        // Calculate distance between two sets of coordinates (in kilometers)
        const distance = calculateDistance(fromCoordinates, toCoordinates);
        console.log("distance",  distance);
        try {
            const serviceProviderId = id; // Replace with the actual service provider ID
            const category = agencyFormData.shiftingType; // or "city" or "state"
            //  distance = distance; // Example distance in kilometers
            const bhk = agencyFormData.houseType; // Example BHK
            console.log("distance  ",distance);
            console.log("agencyFormData.shiftingType  ",  agencyFormData.shiftingType);
            console.log("agencyFormData.shiftingType  ",  agencyFormData.houseType);
            var price = await fetchPrice(serviceProviderId, category, distance, bhk);
            console.log("Price:", price);
        } catch (error) {
            console.error("Error:", error);
        }

        async function fetchPrice(serviceProviderId, category, distance, bhk) {
            try {
                // Find the document with the specified service provider ID
                const priceData = await agencyprice.findOne({ service_provider_id: serviceProviderId });
        
                if (!priceData) {
                    throw new Error("Price data not found for the service provider ID");
                }
        
                let price;
        
                // Determine the category and calculate the price accordingly
                switch (category) {
                    case "Local_House_Shifting":
                        price = getPriceForLocal(distance, bhk, priceData.Local_House_Shifting);
                        break;
                    case "City_House_Shifting":
                        price = getPriceForCity(distance, bhk, priceData.City_House_Shifting);
                        break;
                    case "State_House_Shifting":
                        price = getPriceForState(distance, bhk, priceData.State_House_Shifting);
                        break;
                    default:
                        throw new Error("Invalid category");
                }
        
                // Determine the price based on the distance
                if (price === undefined) {
                    throw new Error(`Price not found for category: ${category} and BHK: ${bhk}`);
                }
        
                return price;
            } catch (error) {
                console.error("Error fetching price:", error);
                throw error;
            }
        }
        function getPriceForLocal(distance, bhk, localPrices) {
            // Determine the appropriate price based on distance and BHK
            // Adjust the logic based on your schema structure
            // Example:
            if (distance <= 12) {
                return localPrices.find(entry => entry[bhk].upto12Km)?.[bhk]?.upto12Km;
            } else if (distance > 12 && distance <= 30) {
                return localPrices.find(entry => entry[bhk].km13to30)?.[bhk]?.km13to30;
            } else {
                return localPrices.find(entry => entry[bhk].above31km)?.[bhk]?.above31km;
            }
        }
        
        // Helper function to get price for city house shifting
        function getPriceForCity(distance, bhk, cityPrices) {
            if (distance <= 100) {
                return cityPrices.find(entry => entry[bhk]?.upto100Km)?.[bhk]?.upto100Km;
            } else if (distance > 100 && distance <= 400) {
                return cityPrices.find(entry => entry[bhk]?.km100to400)?.[bhk]?.km100to400;
            } else {
                return cityPrices.find(entry => entry[bhk]?.km400to800)?.[bhk]?.km400to800;
            }
        }
        
         
        
        // Helper function to get price for state house shifting
        function getPriceForState(distance, bhk, statePrices) {
            // Similar logic to getPriceForLocal
            if (distance <= 900) {
                return statePrices.find(entry => entry[bhk].upto900Km)?.[bhk]?.upto900Km;
            } else if (distance >  900 && distance <= 1300) {
                return statePrices.find(entry => entry[bhk].km900to1300)?.[bhk]?.km900to1300;
            } else {
                return statePrices.find(entry => entry[bhk].km1300to1700 )?.[bhk]?.km1300to1700 ;
            }
        }
        
        // Save the booking data to the database
        const newBooking = new Agency_Booking({
            serviceProviderId: id,
            houseType: agencyFormData.houseType,
            shiftingType: agencyFormData.shiftingType,
            fromLocation: agencyFormData.fromlocation,
            toLocation: agencyFormData.tolocation,
            distance: distance, // Add distance to the booking object
            date: agencyFormData.date,
            customer_id: agencyFormData.customer_id,
            price:price
        });
        
        await newBooking.save();

        res.status(201).json({ message: 'Booking request submitted successfully' });
    } catch (error) {
        console.error('Error submitting booking request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to fetch coordinates for a given location using geocoding API
async function fetchCoordinates(location) {
    const apiKey = "e956c0730db04a47baedbcd836054d57"; // Replace with your actual API key
    const encodedLocation = encodeURIComponent(location);
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const { results } = response.data;
        if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error("No results found for the location");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
}   

// Function to calculate distance between two sets of coordinates using Haversine formula
function calculateDistance(coords1, coords2) {
    const R = 6371; // Radius of the Earth in kilometers
    const { latitude: lat1, longitude: lon1 } = coords1;
    const { latitude: lat2, longitude: lon2 } = coords2;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


export const Booking_DataController = async (req, res) => {
    try {
        const bookings = await Agency_Booking.find({ serviceProviderId: req.params.provider_id });
        console.log("bookings=>", bookings);

        const bookingDataa = await Promise.all(
            bookings.map(async (booking) => {
                const customer = await registration.findOne({ _id: booking.customer_id });
                console.log("customer", customer.Name);
                const bookingssData = {
                    ...booking.toObject(),
                    "Name": customer.Name
                }
                return bookingssData;
            })
        );
        console.log("bookingDataa=>", bookingDataa); 

        if (bookingDataa.length > 0) {
            res.status(201).json({ requestdata: bookingDataa });
        } else {
            res.status(203).json({ message: "Data is Empty" });
        }
    } catch (error) {
        console.error('Error fetching agency bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const AgencyacceptController=async(req,res)=>{
console.log("data");

console.log("req  ",req.body);
    const { agencydata } = req.body;
    
    try {
        const updatedBooking = await Agency_Booking.findByIdAndUpdate(
            agencydata.bookingId,
            {
                $set: {
                    Status:agencydata.Status,
                    drivername:agencydata.drivername,
                    vehiclenumber:agencydata.vehiclenumber,
                    traveltime:agencydata.traveltime,
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

export const acceptedservices = async(req,res)=>{
    try{
       const id = req.params.id;
       var services=await Booking.find();
       console.log('id : ',id);
       console.log("services : ",services);
       const acceptservices = await Promise.all(
        services.map(async (service) => {
            const Bookings = await Promise.all(
                service.BookingData
                    .filter((booking) => booking.Status === 'Accepted' && booking.Service_provider_id===id)
                    .map(async (acceptedBooking) => {
                        console.log('booking ', acceptedBooking);
                        const userdata = await registration.findOne({ _id: service.Customer_id });
                        const bookingWithUserData = {
                            ...acceptedBooking.toObject(),
                            "Name": userdata.Name
                        };
                        return bookingWithUserData;
                    })
            );
            return Bookings;
        })
    );
       const flatAcceptedServices = acceptservices.flat();
        if(acceptservices.length>0){
            res.status(201).json({accepteddata:flatAcceptedServices});
        }
        else{
            res.status(203).json({message:'data not available'});
        }
    }catch(error){
       console.log('error ',error);
       res.status(205).json({error:"Error while fetching request"});
    }
}

export const acceptedagencyservices = async(req,res)=>{
    try{
       const id = req.params.id;
       const bookings = await Agency_Booking.find({ serviceProviderId: id,Status:'Accepted' });
        console.log("bookings=>", bookings);
        if(bookings.length>0){
            res.status(201).json({accepteddata:bookings});
        }else{
            res.status(203).json({accepteddata:"error"});
        }
    }catch(error){
        console.log("error : ",error);
        res.status(500).json({error:'error'});
    }
}

export const confirmedservices = async(req,res)=>{
    try{
        const id = req.params.id;
       var services=await Booking.find();
       console.log('id : ',id);
       console.log("services : ",services);
       const confirmservices = await Promise.all(
        services.map(async (service) => {
            const Bookings = await Promise.all(
                service.BookingData
                    .filter((booking) => booking.Status === 'Confirm' && booking.Service_provider_id === id)
                    .map(async (confirmBooking) => {
                        console.log('booking ', confirmBooking);
                        const userdata = await registration.findOne({ _id: service.Customer_id });
                        const bookingWithUserData = {
                            ...confirmBooking.toObject(),
                            "Name": userdata.Name
                        };
                        return bookingWithUserData;
                    })
            );
            return Bookings;
        })
    );
       const flatAcceptedServices = confirmservices.flat();
        if(confirmservices.length>0){
            res.status(201).json({confirmdata:flatAcceptedServices});
        }
        else{
            res.status(203).json({message:'data not available'});
        }
    }catch(error){
        console.log('error : ',error);
        res.status(500).json({message:'error'});
    }
}

export const confirmedagencyservices = async(req,res)=>{
    try{
        const id = req.params.id;
        const bookings = await Agency_Booking.find({ serviceProviderId: id,Status:'Confirm' });
        console.log("bookings=>", bookings);
        if(bookings.length>0){
            res.status(201).json({accepteddata:bookings});
        }else{
            res.status(203).json({accepteddata:"error"});
        }
    }catch(error){
        console.log("error : ",error);
    }
}

export const completeBooking = async(req,res)=>{
    try {
        const { service } = req.body;
        console.log('service otp : ', service);
        const booking = await Booking.findOne({
            'BookingData._id': service.id
        });

        console.log('booking1 ----> ', booking);

        let otpMatched = false;
        let provider_id;
        let price;
        for (let i = 0; i < booking.BookingData.length; i++) {
            console.log("id : ",booking.BookingData[i]._id);
            console.log("otp : ",booking.BookingData[i].Otp);
            if (service.id == booking.BookingData[i]._id && service.otp == booking.BookingData[i].Otp) {
                otpMatched = true;
                booking.BookingData[i].Otp = 0;
                booking.BookingData[i].Status = 'Complete';
                provider_id = booking.BookingData[i].Service_provider_id;
                price = booking.BookingData[i].TotalPrice;
                break;
            }
        }

        if (otpMatched) {
            console.log('Booking updated:', booking);
            await booking.save(); // Save the changes back to the database
            var provider_data = await serviceprovider.findOne({User_id:provider_id});
            console.log("provider : ",provider_data);
            provider_data.Wallet= price - ((price/100)*10);
            var data=provider_data.Complete_Booking;
            data=[...data,{['booking_id']:service.id,['Price']:price - ((price/100)*10)}];
            provider_data.Complete_Booking=data;
            console.log("provider_data : ",provider_data);
            await provider_data.save(); // Save the changes back to the database
            res.status(201).json({message:'services completed'});
        } else {
            console.log('OTP not matched or booking not found');
            res.status(203).json({message:'Wrong Otp'});
        }
    } catch (error) {
        console.log('error ', error);
        res.status(500).json({ message: error });
    }
}

export const providerBankDetailsData = async (req,res)=>{
    console.log("In providerBankDetails Controller");
    console.log("==>",req.body);
    const dataBank = req.body;
    console.log("==> dataBank",dataBank);
    try{
        const providerbankdata = new providerBankDetails({
            providerId : dataBank.providerId,
            providerName: dataBank.providerName,
            bankName: dataBank.bankdata.bankName,
            accountNumber: dataBank.bankdata.accountNumber,
        });
        await providerbankdata.save();
        res.status(201).json({ message: 'Provider Bank Data submitted successfully' });
    }catch(err){
        console.log("Error :", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}