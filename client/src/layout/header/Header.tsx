import React, { useState } from "react";
import { Stack } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import baseURL from "../../api/baseURL";
import { FaSignInAlt } from "react-icons/fa";
import { ActionContainer, ItemText, LogoImage, MenuContainer, MenuItem, ProfileImage, SearchContainer, SearchIconContainer, SearchInput, Header as StyledHeader, Title, TitleContainer, TitleSpan } from "./headerStyles";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useAuth();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    function searchHandler() {
        navigate(`/search?query=${query}`);
    }

    function signOutHandler() {
        localStorage.removeItem("user");
        setUser(null);

        navigate("/");
    }

    function toggleMenu(e: React.MouseEvent<HTMLDivElement>) {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <StyledHeader>
                <TitleContainer>
                    <LogoImage src={logo} alt="logo-img" />
                    <Title>Messa<TitleSpan>ging </TitleSpan> Appli<TitleSpan>cation</TitleSpan> </Title>
                </TitleContainer>
                <ActionContainer>
                    <Stack position="relative" >
                        <ProfileImage onClick={toggleMenu} src={`${baseURL}/images/${user?.picture}`} alt="profile-img" />
                        <MenuContainer isOpen={isOpen} >
                            <MenuItem onClick={signOutHandler} >
                                <FaSignInAlt color="#777" />
                                <ItemText>Sign out</ItemText>
                            </MenuItem>
                        </MenuContainer>
                    </Stack>
                </ActionContainer>
            </StyledHeader>
        </>
    )
}