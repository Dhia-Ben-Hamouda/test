import express from "express";
import { deleteAllMessages, sendMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/sendMessage" , sendMessage);
router.delete("/deleteAllMessages" , deleteAllMessages);

export default router;