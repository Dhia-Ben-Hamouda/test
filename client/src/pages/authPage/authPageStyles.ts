import { Stack, Typography, styled } from "@mui/material";

export const AuthSection = styled(Stack)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row"
}))

export const IllustrationContainer = styled(Stack)(({ theme }) => ({
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.primary.main
}))

export const IllustrationImage = styled("img")(({ theme }) => ({
    width: "600px",
}))

export const LogoImage = styled("img")(({ theme }) => ({
    width: "75px"
}))

export const FormContainer = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    gap: "1rem"
}))

export const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: "900"
}))

export const TitleSpan = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main
}))