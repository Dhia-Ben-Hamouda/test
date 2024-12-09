import express from "express";
import { createConversation, createGroupConversation, deleteAllConversations, getAllConversations, getConversationById } from "../controllers/conversationController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/getAllConversations", authMiddleware, getAllConversations);
router.get("/getConversationById", getConversationById);
router.post("/createConversation", authMiddleware, createConversation);
router.post("/createGroupConversation", authMiddleware, createGroupConversation);
router.delete("/deleteAllConversations", deleteAllConversations);

export default router;