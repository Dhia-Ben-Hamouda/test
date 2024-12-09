import React from "react";
import ReactDom from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import "./styles/index.css";
import App from "./App";
import { theme } from "./theme/theme";

const root = ReactDom.createRoot(document.getElementById("root") as HTMLElement);
const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

root.render(
    <QueryClientProvider client={client} >
        <ThemeProvider theme={theme} >
            <App />
        </ThemeProvider>
    </QueryClientProvider>
)