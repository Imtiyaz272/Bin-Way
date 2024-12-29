import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    {
        timeStamps:true
    }
);

export const User = mongoose.model('User', userSchema);