import mongoose from "mongoose";

const Agencybooking_Schema = new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    houseType: {
        type: String,
        required: true,
    },
    shiftingType: {
        type: String,
        required: true,
    },
    fromLocation: {
        type: String,
        required: true,
    },
    toLocation: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    Status:{
        type:String,
        default:'Pending' 
    },
    drivername:{
        type:String
    },
    vehiclenumber:{
        type:String
    },
    traveltime:{
        type:String
    },
    price:{
        type:Number
    },
    distance:{
        type:String
    }
    
}, { timestamps: true });

export const Agency_Booking= mongoose.model('Agency_Booking', Agencybooking_Schema);