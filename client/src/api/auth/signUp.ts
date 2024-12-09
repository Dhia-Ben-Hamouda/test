import toast from "react-hot-toast";
import { AuthForm } from "../../typings/types";
import api from "../axios";

export async function signUp(authForm: AuthForm, button: HTMLButtonElement) {
    try {
        button.disabled = true;
        toast.loading("creating your account...", { id: "authToast" });

        await new Promise(r => setTimeout(r, 500));
        const formData = new FormData();

        formData.append("name", authForm.name);
        formData.append("phone", authForm.phone);
        formData.append("email", authForm.email);
        formData.append("password", authForm.password);
        formData.append("picture", authForm.picture as File);

        const response = await api.post("/api/auth/signUp", formData);
        const data = response.data;

        button.disabled = false;

        switch (data.msg) {
            case "user with the given email already exists":
                toast.error(data.msg, { id: "authToast" });
                break;
            case "user has been created successfully":
                toast.success(data.msg, { id: "authToast" });
                break;
            case "error while signing up":
                toast.error(data.msg, { id: "authToast" });
                break;
            default:
                break;
        }
    } catch (err) {
        console.error(err);
    }
}