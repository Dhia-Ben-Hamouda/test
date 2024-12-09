import { Request, Response } from "express";
import FriendRequest from "../models/FriendRequest";
import { FriendRequest as FriendRequestType, MyRequest } from "../@types/types";
import User from "../models/User";
import Conversation from "../models/Conversation";

export async function sendFriendRequest(req: MyRequest, res: Response) {
    try {
        const { friendToBeAddedId } = req.body;

        const existingRequest = await FriendRequest.find(({ receiver: friendToBeAddedId, sender: req.userId }));

        await FriendRequest.create({ receiver: friendToBeAddedId, sender: req.userId });
        console.log("cre")

        return res.status(200).json({ msg: "a friend request has been sent successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error while adding friend" });
    }
}

export async function acceptFriendRequest(req: MyRequest, res: Response) {
    try {
        const { requestId } = req.body;

        const request = await FriendRequest.findById(requestId).populate("sender");
        const friendToBeAcceptedId = request?.sender._id;

        await User.findByIdAndUpdate(req.userId, { $push: { friends: friendToBeAcceptedId } });
        await User.findByIdAndUpdate(friendToBeAcceptedId, { $push: { friends: req.userId } });

        await FriendRequest.findByIdAndDelete(request?._id);
        await Conversation.create({ users: [req.userId, friendToBeAcceptedId] });

        return res.status(200).json({ msg: "friend request accepted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error while accepting friend request" });
    }
}

export async function getAllFriendRequests(req: MyRequest, res: Response) {
    try {
        let friendRequests = await FriendRequest.find({ receiver: req.userId }).populate("sender");

        return res.status(200).json(friendRequests);
    } catch (err) {
        return res.status(400).json({ msg: "error while fetching friend requests" });
    }
}