import mongoose from "mongoose";

const knowledgebaseSchema = new mongoose.Schema({
    user_email:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["website", "upload", "text"],
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    source_url: {
        type: String,
    },
    content: {
        type: String,
    },
    metadata: {
        type: String,
    }

}, {timestamps: true})

const knowledgeBaseModel = mongoose.models.knowledgeBase || mongoose.model("knowledgeBase", knowledgebaseSchema);

export default knowledgeBaseModel;