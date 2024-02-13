import express from 'express';
import cors from 'cors';
import connection from './connection/dbconfig.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import providerRouter from './routes/providerRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/user",userRouter);
app.use('/admin',adminRouter);
app.use('/provider',providerRouter);
app.listen(3001,()=>{
    console.log("Server Connection Successfull");
});