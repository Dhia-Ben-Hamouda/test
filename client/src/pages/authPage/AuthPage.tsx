import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import illustration from "../../assets/images/illustration.png";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import logo from "../../assets/images/logo.png";
import { AuthSection, FormContainer, IllustrationContainer, IllustrationImage, LogoImage, Title, TitleSpan } from "./authPageStyles";

export default function AuthPage() {
    const [user, setUser] = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/home" />

    useEffect(() => {
        navigate("/auth/signIn");
    }, [])

    return (
        <>
            <AuthSection>
                <IllustrationContainer>
                    <IllustrationImage src={illustration} alt="illustation" />
                </IllustrationContainer>
                <FormContainer>
                    <LogoImage src={logo} alt="logo" />
                    <Title>Messa <TitleSpan>ging</TitleSpan> Appli<TitleSpan>cation</TitleSpan> </Title>
                    <Outlet />
                </FormContainer>
            </AuthSection>
        </>
    )
}