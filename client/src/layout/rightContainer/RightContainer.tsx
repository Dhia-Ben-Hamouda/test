import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import SentMessage from "../../components/SentMessage";
import ReceivedMessage from "../../components/ReceivedMessage";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { Conversation } from "../../typings/types";
import useAuth from "../../utils/hooks/useAuth";
import baseURL from "../../api/baseURL";
import useSocket from "../../utils/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { ConversationContainer, Dot, EmojiContainer, EmptyConversationContainer, EmptyConversationText, InputContainer, MainContainer, MessageSendingContainer, MessagesContainer, TypingAnimation } from "./rightContainerStyles";

export default function RightContainer() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const [message, setMessage] = useState("");
    const [newMessages, setNewMessages] = useState<any[]>([]);
    const [isHidden, setIsHidden] = useState(true);
    const [socket] = useSocket();
    const [user] = useAuth();
    const [isTyping, setIsTyping] = useState(false);
    const { conversationId } = useParams();
    const { data: conversation } = useQuery<Conversation>({ queryKey: ["conversation", conversationId], queryFn: fetchConversation });
    const { mutate, isSuccess } = useMutation({ mutationFn: sendMessage });

    const userToSpeakTo = useMemo(() => conversation?.users.find(x => x._id !== user?._id), [conversation, conversationId]);

    useEffect(() => {
        setNewMessages([]);
    }, [conversationId])

    async function fetchConversation() {
        if (!conversationId) return;

        const response = await api.get(`/api/conversations/getConversationById?conversationId=${conversationId}`);
        return response.data;
    }

    async function sendMessage() {
        if (!message) return;

        socket?.emit("send-message", { roomName: conversation?._id, content: message, sender: user });
        setNewMessages([...newMessages, { sender: user, content: message, associatedConversation: conversation?._id }]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        const response = await api.post("/api/messages/sendMessage", { sender: user?._id, content: message, associatedConversation: conversation?._id });
        return response.data;
    }

    useEffect(() => {
        if (isSuccess) {
            setMessage("");
            queryClient.invalidateQueries(["conversations"]);
        }
    }, [isSuccess])

    useEffect(() => {
        if (socket) {
            socket.on("message-received", ({ sender, content, roomName }) => {
                setNewMessages((prev) => [...prev, { content, sender, associatedConversation: roomName }]);
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                queryClient.invalidateQueries(["conversations"]);
            });

            socket.on("refresh-conversations", () => {
                queryClient.invalidateQueries(["conversations"]);
            })

            socket.on("sender-istyping", () => {
                setIsTyping(true);
            })

            socket.on("sender-stopped-typing", () => {
                setIsTyping(false);
            })
        }
    }, [socket])

    useEffect(() => {
        if (socket && conversation) {
            socket.emit("join-room", conversation._id);
        }
    }, [socket, conversation])

    useEffect(() => {
        socket?.emit("sender-istyping", conversation?._id);

        const timeout = setTimeout(() => {
            socket?.emit("sender-stopped-typing", conversation?._id);
        }, 750);

        return () => { clearTimeout(timeout); }
    }, [message])

    return (
        <>
            <MainContainer>
                {
                    !conversationId ? <EmptyConversationContainer>
                        <EmptyConversationText>Click on a conversation to start chatting !</EmptyConversationText>
                    </EmptyConversationContainer> : <ConversationContainer>
                        <Stack gap={1.5} direction="row" alignItems="center"  >
                            {
                                (conversation && userToSpeakTo) && <>
                                    {
                                        conversation.isGroupChat ? <Stack justifyContent="center" alignItems="center" borderRadius="50%" width={30} height={30} bgcolor="#427FD1" >
                                            <Typography color="#fff" >{conversation.groupChatName.charAt(0)}</Typography>
                                        </Stack> : <img style={{ borderRadius: "50%" }} width={35} src={`${baseURL}/images/${userToSpeakTo?.picture}`} alt="img" />
                                    }
                                    <Typography fontWeight="700" >{!conversation.isGroupChat ? userToSpeakTo?.name : conversation.groupChatName}</Typography>
                                </>
                            }
                        </Stack>
                        <MessagesContainer>
                            {
                                conversation?.messages.map((message, index) => {
                                    if (message.sender?._id === user?._id) {
                                        return <SentMessage key={index} {...message} />
                                    } else return <ReceivedMessage key={index} {...message} />
                                })
                            }
                            {
                                newMessages.map((msg, index) => {
                                    if (msg.sender._id === user?._id) {
                                        return <SentMessage key={index} {...msg} />
                                    } else return <ReceivedMessage key={index} {...msg} />
                                })
                            }
                            {
                                isTyping && <TypingAnimation>
                                    <Dot className="a" />
                                    <Dot className="b" />
                                    <Dot className="c" />
                                </TypingAnimation>
                            }
                            <Box padding={2} ref={messagesEndRef} />
                        </MessagesContainer>
                    </ConversationContainer>
                }
                {
                    conversationId && <MessageSendingContainer>
                        <InputContainer>
                            {
                                !isHidden && <EmojiContainer>
                                    <EmojiPicker onEmojiClick={(emoji) => { setMessage(message + emoji.emoji) }} searchDisabled={true} emojiStyle="facebook" />
                                </EmojiContainer>
                            }
                            <TextField InputProps={{
                                endAdornment: <FaSmile onClick={() => { setIsHidden(!isHidden) }} color="#777" size="1.5rem" style={{ cursor: "pointer" }} />
                            }} value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Enter message" />
                        </InputContainer>
                        <Button onClick={() => { mutate() }} >Send message</Button>
                    </MessageSendingContainer>
                }
            </MainContainer>
        </>
    )
}