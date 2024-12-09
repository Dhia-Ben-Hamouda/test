import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseURL from "../../api/baseURL";
import { Button, Stack, Typography } from "@mui/material";
import { User } from "../../typings/types";
import useAuth from "../../utils/hooks/useAuth";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function SearchPage() {
    const [user, setUser] = useAuth();
    const queryClient = useQueryClient();
    const query = new URLSearchParams(window.location.search).get("query");
    const { data: users } = useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers });
    const { mutate, isSuccess, isError, data, error } = useMutation({ mutationFn: (friendToBeAddedId: string) => addFriend(friendToBeAddedId) });

    useEffect(() => {
        if (isSuccess) {
            toast.success("friend request sent", { id: "toast" });
            queryClient.invalidateQueries(["users"]);
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            const { msg } = (error as AxiosError).response?.data as Record<string, string>
            toast.error(msg, { id: "toast" });
        }
    }, [isError])

    async function fetchUsers() {
        const response = await api.get(`/api/search?query=${query}`);
        return response.data;
    }

    async function addFriend(friendToBeAddedId: string) {
        toast.loading("adding friend...", { id: "toast" });

        const response = await api.post(`/api/requests/sendFriendRequest`, { friendToBeAddedId });
        return response.data;
    }

    function addFriendHandler(friendToBeAddedId: string) {
        mutate(friendToBeAddedId);
    }

    return (
        <>
            <Stack maxWidth="1200px" padding={2} marginInline="auto" gap={2} >
                <Typography fontSize={24} fontWeight="700" >Search results for "{query}"</Typography>
                <Stack flexWrap="wrap" gap={2} >
                    {
                        users?.map((u, index) => {
                            console.log(u.friends.includes(user!._id.toString()))

                            if (u._id !== user?._id) return (
                                <Stack key={index} width="50%" direction="row" justifyContent="space-between" padding={2} boxShadow="0px 2px 4px rgba(0,0,0,0.1)" bgcolor="#fff" >
                                    <Stack direction="row" alignItems="center" gap={2} >
                                        <img style={{ borderRadius: "50%" }} width={40} src={`${baseURL}/images/${u.picture}`} />
                                        <Typography fontSize={18} fontWeight="700" >{u.name}</Typography>
                                    </Stack>
                                    {
                                        !u.friends.includes(user!._id.toString()) && <Button onClick={() => { addFriendHandler(u._id) }} >Add friend</Button> 
                                    }
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Stack>
        </>
    )
}