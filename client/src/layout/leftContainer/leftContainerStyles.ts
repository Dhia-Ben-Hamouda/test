import { styled, Modal as MuiModal, Stack, Typography } from "@mui/material";

export const Modal = styled(MuiModal)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))

export const ModalContainer = styled(Stack)(({ theme }) => ({
    width: "350px",
    minHeight: "250px",
    justifyContent: "space-between",
    borderRadius: ".5rem",
    gap: ".5rem",
    padding: "1rem",
    background: "#fff"
}))

export const UserContainer = styled(Stack)(({ theme }) => ({
    flex: 1,
    gap: ".5rem",
    maxHeight: "200px",
    overflow: "scroll"
}))

export const UserWrapper = styled(Stack)(({ theme }) => ({
    padding: ".5rem",
    borderRadius: ".5rem",
    alignItems: "center",
    gap: "1rem",
    flexDirection: "row",
    cursor: "pointer",
    transition: ".5s"
}))

export const UserImage = styled("img")(({ theme }) => ({
    width: "40px",
    height: "40px",
    borderRadius: "50%"
}))