import { serviceprovider } from "../module/ServiceProviderDetail.js";
var spData = {};
export const ProviderDataInsert = async(req,res)=>{
    console.log("ProviderDataInsert Controller");
    console.log("Data : ",req.body);
    spData = req.body;
    console.log("spData : ",spData);
    console.log("spData.User_id : ",spData.User_id);
    console.log("data : ",req.files);
    var aadharImg = req.files['aadharimg'][0].originalname;
    console.log("aadharImg : ",aadharImg);
    var data = await serviceprovider.create({
        User_id:spData.User_id,
        Address:spData.Address,
        State:spData.State,
        City:spData.City,
        Service_category:spData.Servicecategory,
        Service_type:spData.Service_type,
        Aadhar_image:aadharImg
    });
    console.log(data);
    if(data){
        res.status(201).json({providerData : data});
    }else{
        res.status(500).json({message:'Internal Server Error When Adding Data'});
    }  
}

export const AgencyDataInsert = async(req,res)=>{
    console.log("AgencyDataInsert Controller");
    console.log("Agency Data : ",req.body);
    agencyData = req.body;
    console.log("agencyData : ",agencyData);

    var data = await agencyprice.create({
        service_provider_id : agencyData.AgencyId,

        Local_House_Shifting : [{
            BHK1 : {
                upto12Km : agencyData.LocalData.localonebhk1,
                km13to30: agencyData.LocalData.localonebhk2,
                above31km: agencyData.LocalData.localonebhk3,
            }
        },
        {
            BHK2: {
                upto12Km: agencyData.LocalData.localtwobhk1,
                km13to30: agencyData.LocalData.localtwobhk2,
                above31km: agencyData.LocalData.localtwobhk3,
            }
        },
        {
            BHK3: {
                upto12Km: agencyData.LocalData.localthreebhk1,
                km13to30: agencyData.LocalData.localthreebhk2,
                above31km: agencyData.LocalData.localthreebhk3,
            }
        },
        {
            BHK4to5: {
                upto12Km: agencyData.LocalData.localfourtofivebhk1,
                km13to30: agencyData.LocalData.localfourtofivebhk2,
                above31km: agencyData.LocalData.localfourtofivebhk3,
            }
        },
        {
            CompleteHousehold : {
                upto12Km: agencyData.LocalData.localcmplt1,
                km13to30: agencyData.LocalData.localcmplt2,
                above31km: agencyData.LocalData.localcmplt3,
            }
        }
    ],

    City_House_Shifting : [{
        BHK1 : {
            upto100Km : agencyData.CityData.cityonebhk1,
            km100to400: agencyData.CityData.cityonebhk2,
            km400to800: agencyData.CityData.cityonebhk3,
        }
    },
    {
        BHK2: {
            upto100Km : agencyData.CityData.citytwobhk1,
            km100to400: agencyData.CityData.citytwobhk2,
            km400to800: agencyData.CityData.citytwobhk3,
        }
    },
    {
        BHK3: {
            upto100Km : agencyData.CityData.citythreebhk1,
            km100to400: agencyData.CityData.citythreebhk2,
            km400to800: agencyData.CityData.citythreebhk3,
        }
    },
    {
        BHK4to5: {
            upto100Km : agencyData.CityData.cityfourtofivebhk1,
            km100to400: agencyData.CityData.cityfourtofivebhk2,
            km400to800: agencyData.CityData.cityfourtofivebhk3,
        }
    },
    {
        CompleteHousehold : {
            upto100Km : agencyData.CityData.citycmplt1,
            km100to400: agencyData.CityData.citycmplt2,
            km400to800: agencyData.CityData.citycmplt3,
        }
    }
],

State_House_Shifting : [{
    BHK1 : {
        upto900Km   : agencyData.StateData.stateonebhk1,
        km900to1300 : agencyData.StateData.stateonebhk2,
        km1300to1700: agencyData.StateData.stateonebhk3,
    }
},
{
    BHK2: {
        upto900Km   : agencyData.StateData.statetwobhk1,
        km900to1300 : agencyData.StateData.statetwobhk2,
        km1300to1700: agencyData.StateData.statetwobhk3,
    }
},
{
    BHK3: {
        upto900Km   : agencyData.StateData.statethreebhk1,
        km900to1300 : agencyData.StateData.statethreebhk2,
        km1300to1700: agencyData.StateData.statethreebhk3,
    }
},
{
    BHK4to5: {
        upto900Km   : agencyData.StateData.statefourtofivebhk1,
        km900to1300 : agencyData.StateData.statefourtofivebhk2,
        km1300to1700: agencyData.StateData.statefourtofivebhk3,
    }
},
{
    CompleteHousehold : {
        upto900Km   : agencyData.StateData.statecmplt1,
        km900to1300 : agencyData.StateData.statecmplt2,
        km1300to1700: agencyData.StateData.statecmplt3,
    }
}
]

});
    console.log("Data : ",data);
    if(data){
        res.status(201).json({agencydata : data});
    }else{
        res.status(500).json({message:'Internal Server Error When Adding Data'});
    }
}