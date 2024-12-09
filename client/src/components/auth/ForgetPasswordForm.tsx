import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgetPasswordForm(){
    const [isHidden, setIsHidden] = useState(true);

    function submitHandler(){
        
    }

    return(
        <>
            <form autoComplete="off">
                <Box
                    boxShadow="0px 2px 4px rgba(0,0,0,0.1)"
                    borderRadius=".5rem"
                    bgcolor="#fff"
                    padding="1rem"
                    width={350}
                    display="flex"
                    flexDirection="column"
                    gap=".5rem"
                >
                    <TextField
                        placeholder="Enter new password..."
                    />
                    <TextField
                        placeholder="Confirm password..."
                        type={isHidden ? "password" : "text"}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" >
                                {
                                    isHidden ? <FaEye onClick={() => { setIsHidden(!isHidden) }} size="1.5rem" style={{ cursor: "pointer" }} /> : <FaEyeSlash onClick={() => { setIsHidden(!isHidden) }} size="1.5rem" style={{ cursor: "pointer" }} />
                                }
                            </InputAdornment>
                        }}
                    />
                    <Button type="submit" variant="contained" >Send password reset link</Button>
                </Box>
            </form>
        </>
    )
}