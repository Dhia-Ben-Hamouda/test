import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenPayload, MyRequest } from "../@types/types";

export default function authMiddleware(req: MyRequest, res: Response, next: NextFunction) {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(401).json({ msg: "access token is required to use this route" });

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as AccessTokenPayload;
        req.userId = decodedToken.id;

        next();
    } catch (err) {
        return res.status(403).json({ msg: "invalid access token" });
    }
}