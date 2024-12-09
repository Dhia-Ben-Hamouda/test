import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true , "sender field is required"]
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true , "receiver field is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("friendRequests", friendRequestSchema);