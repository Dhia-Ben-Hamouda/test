import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Conversation as ConversationType, User as UserType } from "../../typings/types";
import { ConversationContainer, TopWrapper, WrapperText } from "../header/headerStyles";
import { Fade } from "@mui/material";
import { Modal, ModalContainer, UserContainer, UserImage, UserWrapper } from "./leftContainerStyles";
import api from "../../api/axios";
import baseURL from "../../api/baseURL";
import User from "../../components/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useSocket from "../../utils/hooks/useSocket";

export default function LeftContainer() {
    const { data: conversations } = useQuery<ConversationType[]>({ queryKey: ["conversations"], queryFn: fetchConversations });
    const { data: users } = useQuery<UserType[]>({ queryKey: ["users"], queryFn: fetchUsers });
    const { isSuccess: groupChatSuccess, error: groupChatError, isError: isGroupChatError, data: groupChatData, mutate: groupChatMutate } = useMutation({ mutationFn: createGroupConversation });
    const { isSuccess: chatSuccess, error: chatError, isError: isChatError, data: chatData, mutate: chatMutate } = useMutation({ mutationFn: createConversation });
    const [selectedUsersForGroupChat, setSelectedUsersForGroupChat] = useState<string[]>([]);
    const [selectedUserForChat, setSelectedUserForChat] = useState<any>(null);
    const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState("");
    const queryClient = useQueryClient();
    const [socket, setSocket] = useSocket();
    const theme = useTheme();

    async function fetchConversations() {
        const response = await api.get("/api/conversations/getAllConversations");
        return response.data;
    }

    async function fetchUsers() {
        const response = await api.get("/api/users");
        return response.data;
    }

    async function createConversation() {
        const response = await api.post("/api/conversations/createConversation", { user: selectedUserForChat });
        
        return response.data;
    }

    async function createGroupConversation() {
        const response = await api.post("/api/conversations/createGroupConversation", { users: selectedUsersForGroupChat, groupChatName });
        return response.data;
    }

    function toggleGroupChatModal() {
        setIsGroupChatModalOpen(!isGroupChatModalOpen);
    }

    function toggleChatModal() {
        setIsChatModalOpen(!isChatModalOpen);
    }

    function createGroupChatHandler() {
        toast.loading("creating group chat...", { id: "groupChatToast" });
        groupChatMutate();
    }

    function createChatHandler() {
        toast.loading("creating group chat...", { id: "chatToast" });
        chatMutate();
    }

    useEffect(() => {
        if (groupChatSuccess) {
            toast.success(groupChatData.msg, { id: "groupChatToast" });
            setIsGroupChatModalOpen(false);
            queryClient.invalidateQueries(["conversations"]);
            socket?.emit("new-chat-created");
        }
    }, [groupChatSuccess])

    useEffect(() => {
        if (chatSuccess) {
            toast.success(chatData.msg, { id: "chatToast" });
            setIsChatModalOpen(false);
            queryClient.invalidateQueries(["conversations"]);
            socket?.emit("new-chat-created");
        }
    }, [chatSuccess])

    useEffect(() => {
        if (isGroupChatError) {
            const { msg } = (groupChatError as AxiosError).response?.data as Record<string, string>;
            toast.error(msg, { id: "groupChatToast" });
            setIsGroupChatModalOpen(false);
        }
    }, [isGroupChatError])

    useEffect(() => {
        if (isChatError) {
            const { msg } = (chatError as AxiosError).response?.data as Record<string, string>;
            toast.error(msg, { id: "chatToast" });
            setIsChatModalOpen(false);
        }
    }, [isChatError])

    return (
        <>
            <ConversationContainer>
                <TopWrapper>
                    <WrapperText>My Chats</WrapperText>
                    <Stack direction="row" gap={1} >
                        <Button onClick={toggleChatModal} >Create chat</Button>
                        <Button onClick={toggleGroupChatModal} >Create Group chat</Button>
                    </Stack>
                </TopWrapper>
                <Stack gap={2} >
                    {
                        conversations?.map((conversation, index) => (
                            <Conversation key={index} {...conversation} />
                        ))
                    }
                </Stack>
            </ConversationContainer>
            <Modal open={isGroupChatModalOpen} onClose={toggleGroupChatModal} >
                <Fade in={isGroupChatModalOpen} >
                    <ModalContainer>
                        <UserContainer>
                            {
                                users?.map((user, index) => {
                                    return (
                                        <>
                                            <User key={index} {...user} selectedUsersForGroupChat={selectedUsersForGroupChat} setSelectedUsersForGroupChat={setSelectedUsersForGroupChat} />
                                        </>
                                    )
                                })
                            }
                        </UserContainer>
                        <TextField 
                            onChange={e => setGroupChatName(e.target.value)} value={groupChatName} placeholder="Enter group name..." />
                        <Button onClick={createGroupChatHandler} >Create Group chat</Button>
                    </ModalContainer>
                </Fade>
            </Modal>
            <Modal open={isChatModalOpen} onClose={toggleChatModal} >
                <Fade in={isChatModalOpen} >
                    <ModalContainer>
                        <UserContainer>
                            {
                                users?.map((user, index) => {
                                    return (
                                        <UserWrapper key={index} onClick={() => { setSelectedUserForChat(user._id) }} bgcolor={selectedUserForChat === user._id ? theme.palette.primary.main : "#f4f4f4"} >
                                            <UserImage src={`${baseURL}/images/${user.picture}`} />
                                            <Typography color={selectedUserForChat === user._id ? "#fff" : "#777"} >{user.name}</Typography>
                                        </UserWrapper>
                                    )
                                })
                            }
                        </UserContainer>
                        <Button onClick={createChatHandler} >Create chat</Button>
                    </ModalContainer>
                </Fade>
            </Modal>
        </>
    )
}