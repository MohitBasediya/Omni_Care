import mongoose from 'mongoose';
var payment = mongoose.Schema({
    User_id:{
        type:String
    },
    Amount:{
        type:String,
    },
    Date:{
        type:String
    },
    Trannsaction_id:{
        type:String
    }
});
export const payment_model = mongoose.model('Payment',payment);