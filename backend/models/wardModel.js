import mongoose from "mongoose";

const wardSchema = mongoose.Schema(
    {
        wardId:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
    }
);

export const Ward = mongoose.model('Ward', wardSchema);