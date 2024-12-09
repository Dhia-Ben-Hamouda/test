import React, { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FriendRequest } from "../../typings/types";
import baseURL from "../../api/baseURL";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function ReceivedFriendRequests() {
    const queryClient = useQueryClient();
    const { data: friendRequests } = useQuery<FriendRequest[]>({ queryKey: ["friendRequests"], queryFn: fetchFriendRequests });
    const { data, mutate, isSuccess, isError, error } = useMutation({ mutationFn: (requestId: string) => acceptFriendRequest(requestId) });

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries(["friendRequests"]);
            toast.success("friend request accepted successfully", { id: "toast" });
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            const { msg } = (error as AxiosError).response?.data as Record<string, string>
            toast.error(msg, { id: "toast" });
        }
    }, [isError])

    async function fetchFriendRequests() {
        const response = await api.get("/api/requests/getAllFriendRequests");
        return response.data;
    }

    async function acceptFriendRequest(requestId: string) {
        toast.loading("accepting friend request...", { id: "toast" });

        const response = await api.post("/api/requests/acceptFriendRequest", { requestId });
        return response.data;
    }

    function acceptFriendRequestHandler(requestId: string) {
        mutate(requestId);
    }

    return (
        <>
            <Stack maxWidth="1200px" padding={2} marginInline="auto" gap={2} >
                <Typography fontSize={24} fontWeight="700" >Received friend requests: </Typography>
                <Stack>
                    {
                        friendRequests?.map((request, index) => {
                            return (
                                <Stack width="50%" direction="row" justifyContent="space-between" padding={2} key={request.sender._id} boxShadow="0px 2px 4px rgba(0,0,0,0.1)" bgcolor="#fff" >
                                    <Stack direction="row" alignItems="center" gap={2} >
                                        <img style={{ borderRadius: "50%" }} width={40} src={`${baseURL}/images/${request.sender.picture}`} />
                                        <Typography fontSize={18} fontWeight="700" >{request.sender.name}</Typography>
                                    </Stack>
                                    <Button onClick={() => { acceptFriendRequestHandler(request._id) }} >Accept friend request</Button>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Stack>
        </>
    )
}