import mongoose from "mongoose";

const binSchema = mongoose.Schema(
    {
        binId:{
            type: String,
            required: true
        },
        fillLevel:{
            type: Number,
            required: true
        },
        latitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        },
        wardId:{
            type:String,
            required:true
        },
        distanceOff:{
            type: Number,
            required:true
        },
        status:{
            type:String,
            required:false
        },
        lastCollected:{
            type:Date,
            required:false
        }
    },
    {
        timeStamps:true
    }
);

export const Bin = mongoose.model('Bin', binSchema);