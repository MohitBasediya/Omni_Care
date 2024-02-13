import mongoose from "mongoose";
var review_schema = new mongoose.Schema({
    User_Id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
   
    Text_Review : {
        type :String, 
        required : true
    },
    Status : {
        type :String, 
        required : true,
        default:"Decline"
    }
});

export const reviews = mongoose.model("reviews",review_schema);