import { NavigateFunction } from "react-router-dom";
import { AuthForm, User } from "../../typings/types";
import toast from "react-hot-toast";
import api from "../axios";
import { encryptPassword } from "../../utils/encryptPassword";

export async function signIn(authForm: AuthForm, button: HTMLButtonElement, navigate: NavigateFunction, setUser: React.Dispatch<User | null>) {
    try {
        toast.loading("signing in...", { id: "authToast" });
        button.disabled = true;

        const encryptedPassword = encryptPassword(authForm.password);
        await new Promise(r => setTimeout(r, 500));

        const response = await api.post("/api/auth/signIn", {
            email: authForm.email,
            encryptedPassword
        });

        const data = response.data;
        button.disabled = false;

        switch (data.msg) {
            case "user with the given email doesn't exist":
                toast.error(data.msg, { id: "authToast" });
                break;
            case "wrong password":
                toast.error(data.msg, { id: "authToast" });
                break;
            case "signed in successfully":
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                navigate("/home");
                toast.success(`Welcome back ${data.user.name} !`, { id: "authToast" });
                break;
            case "error while signing in":
                toast.error(data.msg, { id: "authToast" });
                break;
            default:
                break;
        }
    } catch (err) {
        console.log(err);
    }
}