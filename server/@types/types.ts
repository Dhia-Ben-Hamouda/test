import { Document } from "mongoose"
import { Request } from "express"

export type User = {
    name: string,
    phone: string,
    email: string,
    password: string,
    picture: string,
    refreshTokens: string[],
    friends: string[]
} & Document

export type Message = {

} & Document

export type Conversation = {
    messages: unknown[],
    users: unknown[],
    mostRecentMessage: unknown 
} & Document

export type FriendRequest = {
    sender: string,
    receiver: string,
    createdAt: string
} & Document

export type RefreshTokenPayload = {
    id: string,
    exp?: number,
    iat?: number
}

export type AccessTokenPayload = {
    name: string,
    phone: string,
    email: string,
    picture: string
} & RefreshTokenPayload

export type MyRequest = {
    userId?: string
} & Request