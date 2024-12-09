import express from "express";
import { acceptFriendRequest, getAllFriendRequests, sendFriendRequest } from "../controllers/requestController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/sendFriendRequest", authMiddleware, sendFriendRequest);
router.post("/acceptFriendRequest" , authMiddleware ,  acceptFriendRequest);
router.get("/getAllFriendRequests" , authMiddleware , getAllFriendRequests);

export default router;