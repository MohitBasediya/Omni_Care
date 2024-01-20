import mongoose from "mongoose";
var registration_schema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Contact_No:{
        type:String,
        required:true
    },
    User_Role:{
        type:String,
        required:true
    }
});
export const registration=mongoose.model("registration",registration_schema);