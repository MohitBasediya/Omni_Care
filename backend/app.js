import express from 'express';
import cors from 'cors';
import connection from './connection/dbconfig.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import providerRouter from './routes/providerRoute.js';
var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/user",userRouter);
app.use('/admin',adminRouter);
app.use('/provider',providerRouter);
app.listen(3001,()=>{
    console.log("Server Connection Successfull");
});