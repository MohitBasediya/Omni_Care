import mongoose from "mongoose";

var serviceSchema = new mongoose.Schema({
    Service_type: {
        type: String,
        required: true
    },
    Primary: [{
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
        },
        Gender: {
            type: String,
        }
    }],
    Secondary: [{
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
        },
        Gender: {
            type: String,
        }
    }],
    Tertiary: [{
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
        },
        Gender: {
            type: String,
        }
    }]
});

export default mongoose.model("service", serviceSchema);