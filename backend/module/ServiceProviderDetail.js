import mongoose from "mongoose";
var Service_provider_schema=mongoose.Schema({
    User_id:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Service_type:{
        type:String,
    },
    Service_category:{
        type:String,
    },
    Aadhar_image:{
        type:String,
        required:true
    },
    Account_no:{
        type:Number,
    },
    Bank_Name:{
        type:String,
    },
    Agency_Name:{
        type:String,
    },
    Owner_Name:{
        type:String,
    },
    Contact_No:{
        type:Number,
    },
    Agency_img :{
        type:String,
    },
    GSTNumber :{
        type:String,
    },
    AgencyDetials :{
        type:String,
    }
});

export const serviceprovider = mongoose.model("serviceprovider",Service_provider_schema);