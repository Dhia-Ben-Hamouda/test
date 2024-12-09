import React from "react";
import { AuthContext } from "../../app/context/AuthContext";

export default function useAuth(){
    return React.useContext(AuthContext);
}