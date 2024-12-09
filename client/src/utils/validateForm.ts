// function to validate form fields before submission
import { AuthForm, AuthStatus } from "../typings/types";

export default function validateForm(authForm: AuthForm, action: AuthStatus) {
    const errors = { name: "", phone: "", email: "", password: "" };

    if (action === "Sign up") {
        if (!authForm.name) {
            errors.name = "name field is required";
        } else if (!/^[a-zA-Z\s]{2,}$/.test(authForm.name)) {
            errors.name = "name must be composed of at least 2 letters";
        }

        if (!authForm.phone) {
            errors.phone = "phone field is required";
        } else if (!/^[0-9]{8}$/.test(authForm.phone)) {
            errors.phone = "phone must be composed of 8 numbers";
        }
    }

    if (!authForm.email) {
        errors.email = "email field is required";
    } else if (!/^[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/.test(authForm.email)) {
        errors.email = "please enter a valid email adress";
    }

    if (!authForm.password) {
        errors.password = "password field is required";
    } else if (!/^.{6,}$/.test(authForm.password)) {
        errors.password = "password must be composed of at least 6 characters";
    }

    return errors;
}