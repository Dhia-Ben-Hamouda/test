import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ProviderProps, SocketContextType } from "../../typings/types";
import baseUrl from "../../api/baseURL";

export const SocketContext = React.createContext([null, () => { }] as SocketContextType);

export default function SocketProvider({ children }: ProviderProps) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(baseUrl);
        setSocket(newSocket);

        return () => { newSocket.close(); }
    }, [])

    return <SocketContext.Provider value={[socket, setSocket]} >{children}</SocketContext.Provider>
}