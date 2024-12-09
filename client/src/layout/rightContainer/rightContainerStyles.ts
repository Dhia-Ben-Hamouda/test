import { Stack, Typography, styled } from "@mui/material";

export const MessagesContainer = styled(Stack)(({ theme }) => ({
    overflowY: "scroll",
    maxHeight: "400px",
    gap: ".5rem",
    borderRadius: "1rem",
    flex: 1,
    padding: "1rem",
    background: "#f4f4f4",

    "::-webkit-scrollbar": {
        width: "5px",
    },

    "::-webkit-scrollbar-thumb": {
        background: "#aaa",
        borderRadius: "50px",
    }
}))

export const MainContainer = styled(Stack)(({ theme }) => ({
    width: "65%",
    borderRadius: "1rem",
    gap: "1rem",
}))

export const EmptyConversationContainer = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "1rem",
    flex: 1,
}))

export const EmptyConversationText = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight:"800",
}))

export const ConversationContainer = styled(Stack)(({ theme }) => ({
    gap:"1rem",
    padding:"1.5rem",
    flex: 1,
    background:"#fff",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    borderRadius:"1rem",
}))

export const EmojiContainer = styled(Stack)(({ theme }) => ({
    maxHeight: "350px",
    position: "absolute",
    bottom: "55px",
    right: "0px",
}))

export const MessageSendingContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: "1rem",
}))

export const InputContainer = styled(Stack)(({ theme }) => ({
    background: "#fff",
    borderRadius: "1rem",
    position: "relative",
    flex: 1,
}))

export const TypingAnimation = styled("div")(({ theme }) => ({
    background: "#fff",
    padding: ".8rem 1rem",
    alignSelf: "flex-start",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "50px",
    display: "flex",
    gap: ".35rem",
}))

export const Dot = styled("div")(({ theme }) => ({
    width: "5px",
    height: "5px",
    background: "#999",
    borderRadius: "50%",
    animation: "1s bounce infinite",

    "&.a": {
        animationDelay: "100ms"
    },

    "&.b": {
        animationDelay: "150ms"
    },

    "&.c": {
        animationDelay: "200ms"
    },

    "@keyframes bounce": {
        "0%": {
            transform: "translateY(0px)"
        },

        "50%": {
            transform: "translateY(-5px)"
        },

        "100%": {
            transform: "translateY(0px)"
        }
    },
}))