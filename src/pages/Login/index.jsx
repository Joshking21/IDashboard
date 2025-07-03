import styles from "./main.module.css"
import waterMark from "@assets/watermark/login.svg"
import logo from "@assets/icon/logo.svg"
import SvgIcon from "../../../components/SvgIcon/svgIcon"
import { motion } from "framer-motion"
import { Field, Form, Formik } from "formik"
import { loginSchema} from "@schemas/loginSchema"
import RoundedInput from "../../../components/RoundedInput"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel } from "@mui/material"
import useAuthStore from "@/stores/useAuth"
import { useNavigate } from "react-router-dom"
import useLogin from "@/hooks/useLogin"

const formInputs = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter Email Address"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Password"
    }
]

export default function Login() {
    const setUser = useAuthStore((state)=> state.setUser)
    const navigate = useNavigate()
    const { mutateAsync: sendLogin } = useLogin()
    
    function handleLogin(values){
        sendLogin(values).then((data)=> {
            console.log(data)
            localStorage.setItem("accessToken", data.data.accessToken)
            setUser(data.data.user)
            navigate("/dashboard")
        }).catch(err=>{
            alert(err.message)
        })
    }

    const handleSubmit = (values, actions) => {
        handleLogin(values)
        actions.setSubmitting(false)
    }

    function handleForgotPassword(){}

    return (
        <section className={styles.container}>
            <section className={styles.section1}>
                <motion.div 
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.8}}
                    className={styles.main}
                >
                    <SvgIcon src={logo} height={"90px"} width={"90px"} />
                    <p className={styles.caption}>Login to your Admin Account</p>
                    <p className={styles.subheading}>Welcome back! So glad to have you back again.</p>

                    <div className={styles.form}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            validationSchema={loginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, isSubmitting}) => (
                                <Form onSubmit={handleSubmit} className={styles.mainForm}>
                                    {formInputs && formInputs.map((value, index)=>(
                                        <RoundedInput
                                            key={index}
                                            name={value.name}
                                            label={value.label}
                                            placeholder={value.placeholder}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                        />
                                    ))}

                                    <Box className={styles.rememberContainer}>
                                        <Field name="rememberMe">
                                            {({ field, form }) => (
                                            <FormControlLabel
                                                control={
                                                <Checkbox
                                                    checked={field.value || false}
                                                    onChange={(e) =>
                                                        form.setFieldValue(field.name, e.target.checked)
                                                    }
                                                    color="primary"
                                                    className={styles.checkbox}
                                                />
                                                }
                                                label="Remember me"
                                                className={styles.rememberLabel}
                                            />
                                            )}
                                        </Field>

                                        <Button
                                            className={styles.forgotPasswordButton}
                                            onClick={handleForgotPassword}
                                        >
                                            Forgot password
                                        </Button>
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={styles.loginButton}
                                        disabled={!values.email || !values.password || !isValid || isSubmitting }
                                        startIcon={
                                            isSubmitting && <CircularProgress size={"20px"} sx={{color: "#fff"}} />
                                        }
                                    >
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </motion.div>
            </section>

            <section className={styles.section2}>
                <img src={waterMark} />
            </section>
        </section>
    )
}
