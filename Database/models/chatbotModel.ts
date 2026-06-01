import mongoose from "mongoose";

const chatBotSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#4f39f6"
    },
    welcome_message: {
        type: String,
        default: "Hello there, How can I help you today ? "
    }
}, {timestamps: true}) 

const chatBot = mongoose.models.chatBot || mongoose.model("chatBot", chatBotSchema)

export default chatBot;