import express from "express";
import { forgetPassword, refresh, resetPassword, signIn, signOut, signUp } from "../controllers/authController";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", upload.single("picture") ,signUp);
router.post("/signOut", signOut);
router.get("/refresh", refresh);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

export default router;