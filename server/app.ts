import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./routes/authRoutes";
import User from "./models/User";
import conversationRoutes from "./routes/conversationRoutes";
import messageRoutes from "./routes/messageRoutes";
import requestRoutes from "./routes/requestRoutes";
import { MyRequest, User as UserType } from "./@types/types";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
const server = http.createServer(app);

// handle middleware

app.use(express.json());
app.use(express.static("uploads"));
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(cookieParser());
dotenv.config();

// env variables

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL as string;

// connecting to mongoDB

mongoose.connect(mongoURL)
    .then(() => { console.log("connected to mongoDB !") })
    .catch((err) => { console.error(err); })

// launching the server

server.listen(port, () => {
    console.log(`listening to requests on port ${port}`);
})

// handle routes

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/requests", requestRoutes);

app.get("/api/search", async (req, res) => {
    try {
        const { query } = req.query;

        let users = await User.find({ name: { $regex: query, $options: "i" } }) as UserType[];

        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({ msg: "error while searching for users" });
    }
})

app.get("/api/users", authMiddleware, async (req: MyRequest, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } });

        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({ msg: "error while fetching users" });
    }
})

// handle web sockets

const io = new Server(server, {
    cors: {
        origin: "*"
    },
    pingTimeout: 60000
})

const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log(`connected with socket ${socket.id}`);

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
    })

    socket.on("send-message", ({ sender, content, roomName }) => {
        socket.broadcast.in(roomName).emit("message-received", { sender, content, roomName });
    })

    socket.on("new-chat-created" , () => {
        socket.broadcast.emit("refresh-conversations");
    })

    socket.on("sender-istyping", (roomName) => {
        socket.broadcast.in(roomName).emit("sender-istyping");
    })

    socket.on("sender-stopped-typing", (roomName) => {
        socket.broadcast.in(roomName).emit("sender-stopped-typing");
    })

    socket.on("disconnect", () => {

    })
})