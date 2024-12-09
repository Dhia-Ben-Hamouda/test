import React, { RefObject, useState } from "react";
import { AuthForm, AuthStatus } from "../../typings/types";
import { checkObject } from "../checkObject";
import validateForm from "../validateForm";
import { signIn } from "../../api/auth/signIn";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth/signUp";
import useAuth from "./useAuth";

export default function useForm(buttonRef: RefObject<HTMLButtonElement>) {
    const [authForm, setAuthForm] = useState<AuthForm>({ name: "", phone: "", email: "", password: "", picture: null });
    const [errors, setErrors] = useState({ name: "", phone: "", email: "", password: "" });
    const [authStatus, setAuthStatus] = useState<AuthStatus>("Sign in");
    const [isHidden, setIsHidden] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useAuth();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!checkObject(validateForm(authForm, authStatus))) {
            setErrors(validateForm(authForm, authStatus));
            return;
        }

        if (authStatus === "Sign in") {
            signIn(authForm, buttonRef.current!, navigate, setUser);
        } else {
            signUp(authForm, buttonRef.current!);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) setAuthForm({ ...authForm, picture: e.target.files[0] });
    }

    return { authForm, setAuthForm, authStatus, setAuthStatus, handleSubmit, handleChange, handleFile, isHidden, setIsHidden, errors }
}