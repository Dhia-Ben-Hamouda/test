import { Request, Response } from "express";
import User from "../models/User";
import { comparePasswords } from "../helpers/comparePasswords";
import { RefreshTokenPayload, User as UserType } from "../@types/types";
import { generateAccessToken, generateRefreshToken } from "../helpers/tokenGenerators";
import { hashPassword } from "../helpers/hashPassword";
import sharp from "sharp";
import jwt from "jsonwebtoken";

export async function signIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }) as UserType;
        if (!user) return res.status(404).json({ msg: "user with the given email doesn't exist" });

        const match = comparePasswords(password, user.password);

        if (!match) return res.status(401).json({ msg: "wrong password" });

        const accessToken = generateAccessToken({ id: user._id, email, name: user.name, phone: user.phone, picture: user.picture });
        const refreshToken = generateRefreshToken({ id: user._id });

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            msg: "signed in successfully",
            user: { _id: user._id, email, name: user.name, phone: user.phone, picture: user.picture }
        })
    } catch (err) {
        return res.status(400).json({ msg: "error while signing in" });
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const { name, phone, email, password } = req.body;

        const user = await User.findOne({ email }) as UserType;
        if (user) return res.status(400).json({ msg: "user with the given email already exists" });

        const hashedPassword = await hashPassword(password);

        const file = (req as any).file;

        if (file) {
            const imageName = `users/${Date.now()}--${file.originalname}`;
            const imagePath = `uploads/images/${imageName}`;

            await sharp(file.buffer).toFile(imagePath);
            await User.create({ name, phone, email, password: hashedPassword, picture: imageName });
        } else {
            await User.create({ name, phone, email, password: hashedPassword });
        }

        return res.status(201).json({ msg: "user has been created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "error while signing up" });
    }
}

export async function signOut(req: Request, res: Response) {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ msg: "signed in successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while signing out" });
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) return res.status(401).json({ msg: "refresh token is required to use this route" });

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as RefreshTokenPayload;
        const user = await User.findById(decodedToken.id) as UserType;

        const newAccessToken = generateAccessToken({ id: user._id, email: user.email, name: user.name, phone: user.phone, picture: user.picture });
        const newRefreshToken = generateRefreshToken({ id: user._id });

        res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({ msg: "refreshed tokens successfully" });
    } catch (err) {
        return res.status(400).json({ msg: "error while refershing" });
    }
}

export async function forgetPassword(req: Request, res: Response) {
    try {

    } catch (err) {
        return res.status(400).json({ msg: "error while signing in" });
    }
}

export async function resetPassword(req: Request, res: Response) {
    try {

    } catch (err) {
        return res.status(400).json({ msg: "error while signing in" });
    }
}