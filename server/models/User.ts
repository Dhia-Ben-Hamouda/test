import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field is required"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "phone field is required"],
        match: /^[0-9]{8}$/
    },
    email: {
        type: String,
        unique: [true, "email field is required"],
        match: /^[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/,
        required: [true, "email field is required"]
    },
    password: {
        type: String,
        required: [true, "password field is required"]
    },
    picture: {
        type: String,
        default: "profile.png"
    },
    refreshTokens: {
        type: [String],
        default: []
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: []
    }
})

export default mongoose.model("users", userSchema);