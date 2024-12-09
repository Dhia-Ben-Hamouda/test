import { Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User as UserType } from "../typings/types";
import baseURL from "../api/baseURL";

export default function User({ email, friends, name, phone, picture, setSelectedUsersForGroupChat, selectedUsersForGroupChat, _id }: UserType) {
    const [isSelected, setIsSelected] = useState(false);
    const theme = useTheme();

    function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
        if (isSelected) {
            setIsSelected(false);
            setSelectedUsersForGroupChat((prev: string[]) => {
                const res = prev.filter(x => x !== _id);

                return res;
            })
        } else {
            setIsSelected(true);
            setSelectedUsersForGroupChat([...selectedUsersForGroupChat, _id]);
        }
    }

    return (
        <>
            <Stack onClick={clickHandler} style={{ cursor: "pointer", transition:".5s" }}  bgcolor={isSelected ? theme.palette.primary.main : "#f4f4f4"} padding={1} borderRadius={1} alignItems="center" gap={2} direction="row" >
                <img style={{ borderRadius:"50%" }} width={40} src={`${baseURL}/images/${picture}`} />
                <Typography color={ isSelected ? "#fff" : "#777"  } >{name}</Typography>
            </Stack>
        </>
    )
}