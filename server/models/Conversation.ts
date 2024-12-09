import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "messages",
        default: [],
        required: [true, "messages field is required"]
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
        required: [true, "users field is required"]
    },
    mostRecentMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    groupChatName: {
        type: String,
        default: ""
    }
})

export default mongoose.model("conversations", conversationSchema);