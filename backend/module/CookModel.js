import mongoose from "mongoose";

var CookSchema = new mongoose.Schema({
    Service_type: {
        type: String,
        required: true,
        default:'Cooking'
    },
    Rajasthani: [{
        ServiceName: {
            type: String,
        },
        ServicePrice: {
            type: Number,
        },
        ServiceDesc: {
            type: String,
        },
        ServiceImage: {
            type: String,
        }
    }],
    Gujarati: [{
        ServiceName: {
            type: String,
        },
        ServicePrice: {
            type: Number,
        },
        ServiceDesc: {
            type: String,
        },
        ServiceImage: {
            type: String,
        }
    }],
    Chinese: [{
        ServiceName: {
            type: String,
        },
        ServicePrice: {
            type: Number,
        },
        ServiceDesc: {
            type: String,
        },
        ServiceImage: {
            type: String,
        }
    }],
    South_Indian: [{
        ServiceName: {
            type: String,
        },
        ServicePrice: {
            type: Number,
        },
        ServiceDesc: {
            type: String,
        },
        ServiceImage: {
            type: String,
        }
    }],
    Normal: [{
        ServiceName: {
            type: String,
        },
        ServicePrice: {
            type: Number,
        },
        ServiceDesc: {
            type: String,
        },
        ServiceImage: {
            type: String,
        }
    }]
});

export default mongoose.model("Cook", CookSchema);