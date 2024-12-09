import React from "react";
import { SocketContext } from "../../app/context/SocketContext";

export default function useSocket(){
    return React.useContext(SocketContext);
}