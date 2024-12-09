import React, { useMemo } from "react";
import profile from "../assets/images/profile.png";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import { Conversation as ConversationProps } from "../typings/types";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import baseURL from "../api/baseURL";

export default function Conversation({ messages, users, _id, mostRecentMessage, isGroupChat, groupChatName }: ConversationProps) {
    const navigate = useNavigate();
    const [user, setUser] = useAuth();

    function clickHandler() {
        navigate(`/${_id}`);
    }

    const userToSpeakTo = useMemo(() => users.find((x) => x._id !== user?._id), []);

    return (
        <>
            <Stack sx={{ cursor: "pointer" }} onClick={clickHandler} alignItems="center" direction="row" gap={2} borderRadius={2} bgcolor="#f4f4f4" padding={2} >
                {
                    !isGroupChat ? <img style={{ borderRadius: "50%" }} width={65} src={`${baseURL}/images/${userToSpeakTo?.picture}`} alt="profile-img" /> : <Stack justifyContent="center" alignItems="center" height={65} borderRadius="50%" width={65} bgcolor="#427FD1"  >
                        <Typography fontWeight="700" fontSize={24} color="#fff" >{groupChatName.charAt(0)}</Typography>
                    </Stack>
                }
                <Stack gap={.5} >
                    <Stack direction="row" alignItems="center" gap={2} >
                        <Typography fontSize={16} fontWeight="700" >{!isGroupChat ? userToSpeakTo?.name : groupChatName}</Typography>
                        {
                            mostRecentMessage && <Typography fontSize={12} >{moment(mostRecentMessage.createdAt).fromNow()}</Typography>
                        }
                    </Stack>
                    <Typography fontSize={14} >{mostRecentMessage?.content}</Typography>
                </Stack>
            </Stack>
        </>
    )
}