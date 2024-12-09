import * as yup from "yup";

export const initialValues = {
    email: "",
    password: ""
}

export const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter a valid email adress"),
    password: yup.string().required().min(6)
})