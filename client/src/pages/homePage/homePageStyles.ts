import { Stack, styled } from "@mui/material";

export const MainContainer = styled(Stack)(({ theme }) => ({
    maxWidth: "1200px",
    marginInline: "auto",
    flexDirection: "row",
    gap: "1rem",
    minHeight: "570px"
}))