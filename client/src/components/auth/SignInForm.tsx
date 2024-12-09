import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../utils/auth/signIn";
import { useMutation } from "@tanstack/react-query";
import { AuthForm } from "../../typings/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "../../api/axios";
import useAuth from "../../utils/hooks/useAuth";

export default function SignInForm() {
    const [isHidden, setIsHidden] = useState(true);
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const [user, setUser] = useAuth();
    const navigate = useNavigate();
    const { isSuccess, data, mutate, isError, error } = useMutation({ mutationFn: () => signIn(formik.values) });

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

            toast.success(`Welcome back ${data.user.name}`, { id: "authToast" });
            navigate("/");
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error("an error occured", { id: "authToast" });
        }
    }, [isError])


    async function signIn(values: Pick<AuthForm, "email" | "password">) {
        toast.loading("signing in...", { id: "authToast" });
        await new Promise(r => setTimeout(r, 250));

        const response = await api.post("/api/auth/signIn", {
            email: values.email,
            password: values.password
        });
        return response.data;
    }

    function onSubmit() {
        mutate();
    }

    return (
        <>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
                        value={formik.values.email}
                        id="email"
                        onChange={formik.handleChange}
                        placeholder="Enter email..."
                        error={!!(formik.errors.email)}
                        helperText={formik.errors.email}
                    />
                    <TextField
                        value={formik.values.password}
                        id="password"
                        onChange={formik.handleChange}
                        placeholder="Enter password..."
                        error={!!(formik.errors.password)}
                        helperText={formik.errors.password}
                        type={isHidden ? "password" : "text"}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" >
                                {
                                    isHidden ? <FaEye onClick={() => { setIsHidden(!isHidden) }} size="1.5rem" style={{ cursor: "pointer" }} /> : <FaEyeSlash onClick={() => { setIsHidden(!isHidden) }} size="1.5rem" style={{ cursor: "pointer" }} />
                                }
                            </InputAdornment>
                        }}
                    />
                    <Link style={{ textAlign: "end", color: "#777", fontSize: 14, fontWeight: "600" }} to="/auth/forgetPassword" >Forget password ?</Link>
                    <Button type="submit" variant="contained" >Sign in</Button>
                    <Typography color="#777" fontWeight="500" fontSize={14} textAlign="center" >Don't have an account ? <span onClick={() => { navigate("/auth/signUp") }} style={{ color: "#427FD1", fontWeight: "700", cursor: "pointer" }} >sign up !</span></Typography>
                </Box>
            </form>
        </>
    )
}