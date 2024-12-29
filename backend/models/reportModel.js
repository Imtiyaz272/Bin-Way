import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
        issue:{
            type: String,
            required: true
        },
        wardName:{
            type: String,
            required: true
        },
        citizen:{
            type:String,
            required:false
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:false
        },
        date: {  // Add this field
            type: Date,
            default: () => new Date()
        }
    },
);

export const Report = mongoose.model('Report', reportSchema);