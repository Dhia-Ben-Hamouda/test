import React from "react";
import { Message as MessageProps } from "../typings/types";
import { Stack, Typography } from "@mui/material";

export default function SentMessage({ sender, content, createdAt, associatedConversation }: Partial<MessageProps>) {
    return (
        <>
            <Stack alignItems="flex-end" >
                <Stack bgcolor="#427FD1" padding={1} paddingInline={2.5} borderRadius={5} >
                    <Typography fontSize={14} color="#fff" >{content}</Typography>
                </Stack>
            </Stack>
        </>
    )
}