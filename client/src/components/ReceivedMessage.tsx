import React from "react";
import { Message as MessageProps } from "../typings/types";
import { Stack, Typography } from "@mui/material";
import baseURL from "../api/baseURL";

export default function ReceivedMessage({ sender, content, createdAt, associatedConversation }: Partial<MessageProps>) {
    return (
        <>
            <Stack direction="row" gap={2} alignItems="center" >
                <img style={{ borderRadius:"50%" }} width={35} src={`${baseURL}/images/${sender?.picture}`} />
                <Stack bgcolor="#e4e4e4" padding={1} paddingInline={2} borderRadius={5} >
                    <Typography fontSize={14} color="#555" >{content}</Typography>
                </Stack>
            </Stack>
        </>
    )
}