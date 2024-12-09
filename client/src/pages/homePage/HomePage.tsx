import React, { useEffect } from "react";
import Header from "../../layout/header/Header";
import { Stack } from "@mui/material";
import LeftContainer from "../../layout/leftContainer/LeftContainer";
import RightContainer from "../../layout/rightContainer/RightContainer";
import useAuth from "../../utils/hooks/useAuth";
import useSocket from "../../utils/hooks/useSocket";
import { MainContainer } from "./homePageStyles";

export default function HomePage() {
    return (
        <>
            <Header />
            <MainContainer>
                <LeftContainer />
                <RightContainer />
            </MainContainer>
        </>
    )
}