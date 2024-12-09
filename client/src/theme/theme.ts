import { ThemeOptions, createTheme } from "@mui/material";
import { palette } from "./palette";
import { breakpoints } from "./breakpoints";
import { typography } from "./typography";
import { components } from "./components";

export const myTheme: ThemeOptions = {
    palette,
    breakpoints,
    typography,
    components
}

export const theme = createTheme(myTheme);