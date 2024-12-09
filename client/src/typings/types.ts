import { Socket } from "socket.io-client";

export type User = {
    _id: string,
    name: string,
    email: string,
    picture: string,
    phone: string,
    friends: string[],
    setSelectedUsersForGroupChat: React.Dispatch<any>,
    selectedUsersForGroupChat: string[]
}

export type Message = {
    _id: string,
    content: string,
    sender: User,
    createdAt: string,
    associatedConversation: Conversation,
    readBy: User[]
}

export type Conversation = {
    _id: string,
    messages: [Message],
    users: User[],
    mostRecentMessage: Message,
    isGroupChat: boolean,
    groupChatName: string
}

export type FriendRequest = {
    _id: string,
    sender: User,
    receiver: User,
    createdAt: string
}

export type AuthForm = {
    name: string,
    phone: string,
    email: string,
    password: string,
    picture: File | null
}

export type ProviderProps = {
    children: React.ReactNode
}

export type AuthStatus = "Sign in" | "Sign up"

export type AuthContextType = [User | null, React.Dispatch<User | null>]
export type SocketContextType = [Socket | null, React.Dispatch<Socket | null>]