import { Box, Typography, styled } from "@mui/material";
import { Stack } from "@mui/material";
import { typography } from "../../theme/typography";

type MenuContainerProp = {
    isOpen: boolean
}

export const Header = styled(Stack)(({ theme }) => ({
    background: "#fff",
    padding: "1rem",
    maxWidth: "1200px",
    marginInline: "auto",
    marginBlock: "1rem",
    borderRadius: "1rem",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    justifyContent: "space-between",
    flexDirection: "row"
}))

export const TitleContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: ".75rem"
}))

export const LogoImage = styled("img")(({ theme }) => ({
    width: "40px",
    height: "40px"
}))

export const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.25rem",
    fontWeight: "900",
    userSelect: "none"
}))

export const TitleSpan = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main
}))

export const ActionContainer = styled(Stack)(({ theme }) => ({
    gap: "1rem",
    alignItems: "center",
    flexDirection: "row"
}))

export const SearchContainer = styled(Stack)(({ theme }) => ({
    width: "225px",
    boxShadow: "0px 0px 1px rgba(0,0,0,0.1)",
    gap: "1rem",
    borderRadius: "50px",
    padding: ".5rem",
    background: "#f4f4f4",
    flexDirection: "row"
}))

export const SearchInput = styled("input")(({ theme }) => ({
    background: "#f4f4f4",
    border: "none",
    outline: "none"
}))

export const SearchIconContainer = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.primary.main,
    width: "30px",
    height: "30px"
}))

export const ProfileImage = styled("img")(({ theme }) => ({
    cursor: "pointer",
    borderRadius: "50%",
    width: "40px",
    height: "40px"
}))

export const ConversationContainer = styled(Stack)(({ theme }) => ({
    padding: "1.5rem",
    background: "#fff",
    width: "35%",
    borderRadius: "1rem",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    gap: "1.5rem"
}))

export const TopWrapper = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}))

export const WrapperText = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: "800"
}))

export const MenuContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isOpen"
})<MenuContainerProp>(({ theme, isOpen }) => ({
    background: "#fff",
    padding: ".5rem",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    borderRadius: ".5rem",
    position: "absolute",
    width: "125px",
    alignItems: "center",
    right: "-30px",
    top: "50px",
    opacity: isOpen ? "1" : "0",
    visibility: isOpen ? "visible" : "hidden",
    transition: ".5s"
}))

export const MenuItem = styled(Stack)(({ theme }) => ({
    gap: ".5rem",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer"
}))

export const ItemText = styled(Stack)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: "700"
}))