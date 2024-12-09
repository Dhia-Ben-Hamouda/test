import React, { useEffect } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import ForgetPasswordForm from "../components/auth/ForgetPasswordForm";
import PrivateRoutes from "./PrivateRoutes";
import SearchPage from "../pages/searchPage/SearchPage";
import ReceivedFriendRequests from "../pages/receivedFriendRequestsPage/ReceivedFriendRequests";
import useSocket from "../utils/hooks/useSocket";
import useAuth from "../utils/hooks/useAuth";

const AuthPage = React.lazy(() => import("../pages/authPage/AuthPage"));
const HomePage = React.lazy(() => import("../pages/homePage/HomePage"));

export default function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: "/auth",
            element: <AuthPage />,
            children: [
                {
                    path: "signIn",
                    element: <SignInForm />,
                    index: true
                },
                {
                    path: "signUp",
                    element: <SignUpForm />
                },
                {
                    path: "forgetPassword",
                    element: <ForgetPasswordForm />
                }
            ]
        },
        {
            path: "",
            element: <PrivateRoutes />,
            children: [
                {
                    path: "/:conversationId",
                    element: <HomePage />
                },
                {
                    path: "",
                    element: <HomePage />
                },
                {
                    path: "/search",
                    element: <SearchPage />
                },
                {
                    path: "/receivedRequests",
                    element: <ReceivedFriendRequests />
                }
            ]
        },
    ]);

    return <RouterProvider router={router} fallbackElement={null} />
}