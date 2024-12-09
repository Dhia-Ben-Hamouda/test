import { Components, Theme } from "@mui/material";

export const components: Components<Omit<Theme, "components">> = {
    MuiButton: {
        defaultProps: {
            variant: "contained",
            disableElevation: true
        },
        styleOverrides:{
            root:{
                textTransform:"none"
            }
        }
    },
    MuiTypography: {
        defaultProps: {
            color: "#777",
            fontWeight: "500",
        }
    }
}