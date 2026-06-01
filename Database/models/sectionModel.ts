import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    user_email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sourceIds:{
        type: [String],
        required: true
    },
    tone:{
        type: String,
        required: true
    },
    allowedTopics: {
        type: String,
        default: null
    },
    blockedTopics: {
        type: String,
        default: null
    },
    status:{
        type: String,
        default: "active"
    }
}, {timestamps: true})

export const sectionModel = mongoose.models.section || mongoose.model("section", sectionSchema);