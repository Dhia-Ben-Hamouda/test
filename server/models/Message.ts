import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "content field is required"]
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "sender field is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    associatedConversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations",
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: [true, "readBy field is required"]
    }
})

export default mongoose.model("messages" , messageSchema);