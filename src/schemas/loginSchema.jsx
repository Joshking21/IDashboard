import * as Yup from "yup"

export const loginSchema = Yup.object({
    email: Yup.string().email("Please input a valid email").required("Email field is required"),
    password: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean().required()
})