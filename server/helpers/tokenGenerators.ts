// functions to generate both access token and refresh token
import jwt from "jsonwebtoken";
import { AccessTokenPayload, RefreshTokenPayload } from "../@types/types";

export function generateAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
}

export function generateRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
}