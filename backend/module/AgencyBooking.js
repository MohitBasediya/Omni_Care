import mongoose from "mongoose";

const Agencybooking_Schema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    serviceType: {
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
        type:String
    },
    drivername:{
        type:String
    },
    vehiclenumber:{
        type:String
    },
    traveltime:{
        type:String
    }
    
}, { timestamps: true });

export const Agency_Booking= mongoose.model('Agency_Booking', Agencybooking_Schema);