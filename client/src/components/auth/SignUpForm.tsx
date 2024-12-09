import React from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { validationSchema, initialValues } from "../../utils/auth/signUp";
import { AuthForm } from "../../typings/types";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function SignUpForm() {
    const navigate = useNavigate();
    const formik = useFormik({ initialValues, onSubmit, validationSchema })
    
    async function signUp(values: AuthForm) {
        const formData = new FormData();
    
        toast.loading("creating your account...", { id: "authToast" });
        await new Promise(r => setTimeout(r, 250));
    
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("picture", values.picture as File);
    
        const response = await api.post("/api/auth/signUp", formData);
        return response.data;
    }

    const signUpMutation = useMutation(() => signUp(formik.values), {
        onSuccess: (data) => {
            toast.success("user has been created successfully", { id: "authToast" });
        },
        onError: (error: AxiosError) => {
            const { msg } = error.response?.data as Record<string, string>;
            toast.error(msg, { id: "authToast" });
        }
    });

    function onSubmit() {
        signUpMutation.mutate();
    }

    function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) formik.setFieldValue("picture", e.target.files[0]);
    }

    return (
        <>
            <form autoComplete="off" onSubmit={formik.handleSubmit} >
                <Stack
                    bgcolor="#fff"
                    padding="1rem"
                    borderRadius=".5rem"
                    width="350px"
                    boxShadow="0px 2px 4px rgba(0,0,0,0.1)"
                    gap=".5rem"
                >
                    <TextField
                        placeholder="Enter name..."
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="name"
                        error={!!(formik.errors.name && formik.touched.name)}
                        helperText={formik.errors.name}
                    />
                    <TextField
                        placeholder="Enter phone..."
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="phone"
                        error={!!(formik.errors.phone && formik.touched.phone)}
                        helperText={formik.errors.phone}
                    />
                    <TextField
                        placeholder="Enter email..."
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="email"
                        error={!!(formik.errors.email && formik.touched.email)}
                        helperText={formik.errors.email}
                    />
                    <TextField
                        placeholder="Enter password..."
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="password"
                        error={!!(formik.errors.password && formik.touched.password)}
                        helperText={formik.errors.password}
                    />
                    <input id="picture" type="file" onChange={handlePicture} />
                    <Button type="submit" >Sign up</Button>
                    <Typography fontSize={14} textAlign="center" >Already have an account ? <span onClick={() => { navigate("/auth/signIn") }} style={{ color: "#427FD1", fontWeight: "700", cursor: "pointer" }} >sign in !</span></Typography>
                </Stack>
            </form>
        </>
    )
}