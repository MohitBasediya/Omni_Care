import mongoose from 'mongoose';
var url = "mongodb+srv://janhavijoshi9893:t5fpHtyZ4h9aCukT@cluster0.y0orwc1.mongodb.net/Omnicare";

var connection = mongoose.connect(url).then(()=>{
    console.log("Connection to mongoose established successfully");
}).catch((err)=>{
    console.log("Error while connecting with mongoose : "+err);
});

export default connection;