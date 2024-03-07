import mongoose from "mongoose";
var providerbankdata = mongoose.Schema({
    providerId:{
        type:mongoose.Schema.ObjectId
    },
    providerName:{
        type:String
    },
    bankName:{
        type:String
    },
    accountNumber:{
        type:String
    },
    paymentStatus:{
        type:String,
        default:'Pending'
    }
});
export const providerBankDetails = mongoose.model('providerbankdetail',providerbankdata);