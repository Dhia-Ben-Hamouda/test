import * as yup from "yup";

export const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    picture: null
}

export const validationSchema = yup.object().shape({
    name: yup.string().required().min(2),
    phone: yup.string().required().matches(/^[0-9]{8}$/, "phone must be composed of 8 number"),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    picture: yup.mixed().nullable()
})