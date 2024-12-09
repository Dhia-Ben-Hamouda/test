import { Request, Response } from "express";
import Message from "../models/Message";
import Conversation from "../models/Conversation";

export async function sendMessage(req: Request, res: Response) {
    try {
        const { sender, receiver, content, associatedConversation } = req.body;

        const message = await Message.create(req.body);
        const conversation = await Conversation.findOne({ _id: associatedConversation });

        conversation?.messages.push(message._id);
        conversation!.mostRecentMessage = message._id;

        await conversation?.save();

        return res.status(201).json({ msg: "message has been sent successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while sending message" });
    }
}

export async function deleteAllMessages(req: Request,res: Response){
    try{
        await Message.deleteMany({});
        return res.status(202).json({ msg:"all messages have been deleted successfully" });
    }catch(err){
        return res.status(400).json({ msg:"error while deleting all messages" });
    }
}