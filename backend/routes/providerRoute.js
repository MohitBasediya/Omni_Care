import express  from "express";
import {ProviderDataInsert,AgencyDataInsert,GetProviderServices,getAgencyList,
updateProviderController,getAgencyData,Servicerequest,acceptRequest,AgencyBookingRequest,
Booking_DataController,AgencyacceptController,providerpayment} from '../controller/ServiceProviderController.js';

import { AddReview } from "../controller/UserController.js";

import { upload1 } from '../middleware/upload.js';

var providerRouter = express.Router();
providerRouter.post('/payment',upload1,providerpayment);
providerRouter.post('/providerdata',ProviderDataInsert);
providerRouter.post('/agencydata',AgencyDataInsert);
providerRouter.get('/getproviderservice',GetProviderServices);
providerRouter.get('/getagencylist',getAgencyList);
providerRouter.post('/updateprovider',updateProviderController);
providerRouter.get('/getagencydata/:id',getAgencyData);
providerRouter.get('/servicerequest/:Service_type',Servicerequest);
providerRouter.post('/acceptrequest',acceptRequest);
providerRouter.post('/submitBookingRequest',AgencyBookingRequest);
providerRouter.get('/agency_bookingData/:provider_id',Booking_DataController);
providerRouter.post('/agency_bookingAccept',AgencyacceptController);
providerRouter.post('/AddReview',AddReview);
export default providerRouter;