import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
    user_email:{
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    website_url: {
        type: String,
        required: true
    },
    external_links:{
        type: String,
    }
}, {timestamps: true})

export const metadata = mongoose.models.metadata || mongoose.model("metadata", metadataSchema);