import { Request, Response } from "express";
import Conversation from "../models/Conversation";
import { Conversation as ConversationType, MyRequest } from "../@types/types";
import User from "../models/User";

export async function getAllConversations(req: MyRequest, res: Response) {
    try {
        let conversations = await Conversation.find({ users: { $in: [req.userId] } }).populate("users").populate("mostRecentMessage") as ConversationType[];

        return res.status(200).json(conversations);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error while fetching conversations" });
    }
}

export async function createGroupConversation(req: MyRequest, res: Response) {
    try {
        const { users, groupChatName } = req.body;

        const existingConversation = await Conversation.findOne({ isGroupChat: true, users: { $in: users } });
        if (existingConversation) return res.status(400).json({ msg: "a conversation with these users already exists" });

        const newConversation = await Conversation.create({ isGroupChat: true, users: [...users, req.userId], groupChatName });

        return res.status(200).json({ msg: "group chat has been created successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while creating group conversation" });
    }
}

export async function createConversation(req: MyRequest, res: Response) {
    try {
        const { user } = req.body;

        const existingConversation = await Conversation.findOne({ users: { $all: [user, req.userId], $size: 2 } });
        if (existingConversation) return res.status(400).json({ msg: "conversation already exists" });

        await Conversation.create({ users: [user, req.userId] });

        return res.status(200).json({ msg: "chat has been created successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while creating conversation" });
    }
}

export async function getConversationById(req: Request, res: Response) {
    try {
        const { conversationId } = req.query;

        const conversation = await Conversation.findById(conversationId).populate("users").populate({
            path: "messages",
            populate: {
                path: "sender"
            }
        });
        return res.status(200).json(conversation);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error while fetching conversation" });
    }
}

export async function deleteAllConversations(req: Request, res: Response) {
    try {
        await Conversation.deleteMany({});
        return res.status(202).json({ msg: "all conversations have been deleted successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while deleting all conversations" });
    }
}