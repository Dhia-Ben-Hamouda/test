import React, { useState } from "react";
import { AuthContextType, ProviderProps } from "../../typings/types";

export const AuthContext = React.createContext([
  null,
  () => {},
] as AuthContextType);

export default function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") as string)
  );

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
}
