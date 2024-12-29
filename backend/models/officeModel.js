import mongoose from "mongoose";

const officeSchema = mongoose.Schema(
    {
        officeId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
);

export const Office = mongoose.model('Office', officeSchema);
