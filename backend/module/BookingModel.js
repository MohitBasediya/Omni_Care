import mongoose from 'mongoose';
var BookingSchema=mongoose.Schema({
    Customer_id:{
        type:String,
        required:true
    },    
    BookingData:[
        {
            ServiceName:{
                type:String,
                required:true
            },
            TotalPrice:{
                type:Number,
                required:true
            },
            ServiceType:{
                type:String,
                required:true
            },
            ServiceCategory:{
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
            Time:{
                type:String,
                required:true
            },
            Date:{
                type:String,
                required:true
            },
            Service_provider_id:{
                type:String,
                default:null
            },
            Status:{
                type:String,
                default:'Pending'
            },
            Otp:{
                type:Number,
                default:null
            }
        }
    ]
});
export const Booking = mongoose.model('Booking',BookingSchema);