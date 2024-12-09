// import React from "react";
// import AuthProvider from "./context/AuthContext";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import AuthForm from "./components/auth/AuthForm";
// import ForgetPasswordForm from "./components/auth/ForgetPasswordForm";
// import PasswordResetForm from "./components/auth/PasswordResetForm";
// import PrivateRoutes from "./components/PrivateRoutes";
// import HomePage from "./pages/HomePage";
// import { Toaster } from "react-hot-toast";

// export default function App() {
//     return (
//         <>
//             <AuthProvider>
//                 <Routes>
//                     <Route path="/" element={<Navigate to="/auth" replace />} />
//                     <Route path="/auth" element={<AuthPage />} >
//                         <Route path="" element={<AuthForm />} />
//                         <Route path="forgetPassword" element={<ForgetPasswordForm />} />
//                         <Route path="resetPassword/:userId" element={<PasswordResetForm />} />
//                     </Route>
//                     <Route element={<PrivateRoutes />} >
//                         <Route path="/home" element={<HomePage />} />
//                     </Route>
//                 </Routes>
//                 <Toaster position="bottom-center" />
//             </AuthProvider>
//         </>
//     )
// }

import AppRoutes from "./app/AppRoutes";
import AuthProvider from "./app/context/AuthContext";
import { Toaster } from "react-hot-toast";
import AuthHandler from "./components/AuthHandler";
import SocketProvider from "./app/context/SocketContext";

export default function App(){
    return(
        <>
            <AuthProvider>
                <SocketProvider>
                    <AppRoutes />
                    <Toaster position="bottom-center" />
                    <AuthHandler />
                </SocketProvider>
            </AuthProvider>
        </>
    )
}

// v1

// new routing                                  done
// integrate react query                        done
// integrate formik                             done
// add layout folder                            done
// only one error toast                         done
// use status codes instead of messages         done
// context inside app directory                 done
// add theme folder                             done
// form control                                 
// handle token refresh                         done

// v2

// refactor react query code / use queryClient       in progress
// change 'theme creation code's location            done
// move hooks to utils folder                        done
// move privateRoutes to app folder                  done
// use private routes in router                      done
// rename components folder to modules               
// refactor theme                                    done
// home page                                         done
// refactor code with styled components              in progress

// import React from "react";
// import styled from "@emotion/styled";
// import { css } from "@emotion/react";

// const Button = styled.button`
//     background:${props => props.color ? props.color : "red"};
//     border:none;
//     padding: 1rem;
//     border-radius: 50px;
// `

// export default function App() {
//     return (
//         <>
//             <Button color="green" >this is a button</Button>
//         </>
//     )
// }
