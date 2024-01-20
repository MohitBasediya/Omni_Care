import mongoose from "mongoose";
var Agency_Price_Schema = mongoose.Schema({

    service_provider_id:{
        type:String,
    },

    Local_House_Shifting :[{
        BHK1 : {
            upto12Km : {
                type : Number
            },
            km13to30 : {
                type : Number
            },
            above31km : {
                type : Number
            }
        },  
        BHK2 : {
            upto12Km : {
                type : Number
            },
            km13to30 : {
                type : Number
            },
            above31km : {
                type : Number
            }
        },
        BHK3 : {
            upto12Km : {
                type : Number
            },
            km13to30 : {
                type : Number
            },
            above31km : {
                type : Number
            }
        },
        BHK4to5 : {
            upto12Km : {
                type : Number
            },
            km13to30 : {
                type : Number
            },
            above31km : {
                type : Number
            }
        },
        CompleteHousehold : {
            upto12Km : {
                type : Number
            },
            km13to30 : {
                type : Number
            },
            above31km : {
                type : Number
            }
        }      
    }],

    City_House_Shifting :[{
        BHK1 : {
            upto100Km : {
                type : Number
            },
            km100to400 : {
                type : Number
            },
            km400to800 : {
                type : Number
            }
        },  
        BHK2 : {
            upto100Km : {
                type : Number
            },
            km100to400 : {
                type : Number
            },
            km400to800 : {
                type : Number
            }
        },
        BHK3 : {
            upto100Km : {
                type : Number
            },
            km100to400 : {
                type : Number
            },
            km400to800 : {
                type : Number
            }
        },
        BHK4to5 : {
            upto100Km : {
                type : Number
            },
            km100to400 : {
                type : Number
            },
            km400to800 : {
                type : Number
            }
        },
        CompleteHousehold : {
            upto100Km : {
                type : Number
            },
            km100to400 : {
                type : Number
            },
            km400to800 : {
                type : Number
            }
        }      
    }],

    State_House_Shifting :[{
        BHK1 : {
            upto900Km : {
                type : Number
            },
            km900to1300 : {
                type : Number
            },
            km1300to1700 : {
                type : Number
            }
        },  
        BHK2 : {
            upto900Km : {
                type : Number
            },
            km900to1300 : {
                type : Number
            },
            km1300to1700 : {
                type : Number
            }
        },
        BHK3 : {
            upto900Km : {
                type : Number
            },
            km900to1300 : {
                type : Number
            },
            km1300to1700 : {
                type : Number
            }
        },
        BHK4to5 : {
            upto900Km : {
                type : Number
            },
            km900to1300 : {
                type : Number
            },
            km1300to1700 : {
                type : Number
            }
        },
        CompleteHousehold : {
            upto900Km : {
                type : Number
            },
            km900to1300 : {
                type : Number
            },
            km1300to1700 : {
                type : Number
            }
        }      
    }]
});

export const agencyprice = mongoose.model("agencyprice",Agency_Price_Schema);