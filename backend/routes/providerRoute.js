import {ProviderDataInsert} from '../controller/ServiceProviderController.js';
import express  from "express";
import { upload1 } from '../middleware/upload.js';
var providerRouter = express.Router();

providerRouter.post('/providerdata',upload1,ProviderDataInsert);

export default providerRouter;