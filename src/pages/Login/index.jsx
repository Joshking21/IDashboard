import styles from "./main.module.css";
import waterMark from "@assets/watermark/login.svg";
import logo from "@assets/icon/logo.svg";
import SvgIcon from "../../../components/SvgIcon/svgIcon";
import { motion } from "framer-motion";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@schemas/loginSchema";
import RoundedInput from "../../../components/RoundedInput";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import useAuthStore from "@/stores/useAuth";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { useState, useEffect } from "react";

const formInputs = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email Address",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
  },
];

export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const { mutateAsync: sendLogin, isPending, isError, error } = useLogin();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogin(values) {
    sendLogin(values)
      .then((data) => {
        console.log(data);
        localStorage.setItem("accessToken", data.data.accessToken);
        setUser(data.data.user);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const handleSubmit = (values, actions) => {
    handleLogin(values);
    actions.setSubmitting(false);
  };

  function handleForgotPassword() {}

  const getMainStyle = () => {
    if (windowWidth < 375) {
      return { padding: "20px 16px" };
    } else if (windowWidth < 768) {
      return { padding: "30px 24px" };
    } else {
      return { padding: "40px 32px" };
    }
  };

  const getLogoSize = () => {
    if (windowWidth < 375) {
      return { height: "70px", width: "70px" };
    } else if (windowWidth < 768) {
      return { height: "80px", width: "80px" };
    } else {
      return { height: "90px", width: "90px" };
    }
  };

  isError && alert(error);

  return (
    <section className={styles.container}>
      <section className={styles.section1}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className={styles.main}
          style={getMainStyle()}
        >
          <SvgIcon src={logo} {...getLogoSize()} />
          <p
            className={styles.caption}
            style={{ fontSize: windowWidth < 768 ? "20px" : "24px" }}
          >
            Login to your Admin Account
          </p>
          <p
            className={styles.subheading}
            style={{ fontSize: windowWidth < 768 ? "14px" : "16px" }}
          >
            Welcome back! So glad to have you back again.
          </p>

          <div className={styles.form}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className={styles.mainForm}>
                  {formInputs &&
                    formInputs.map((value, index) => (
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
                        windowWidth={windowWidth}
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
                              size={windowWidth < 768 ? "small" : "medium"}
                            />
                          }
                          label="Remember me"
                          className={styles.rememberLabel}
                          style={{
                            fontSize: windowWidth < 768 ? "12px" : "14px",
                          }}
                        />
                      )}
                    </Field>

                    <Button
                      className={styles.forgotPasswordButton}
                      onClick={handleForgotPassword}
                      style={{ fontSize: windowWidth < 768 ? "12px" : "14px" }}
                    >
                      Forgot password
                    </Button>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.loginButton}
                    disabled={
                      !values.email ||
                      !values.password ||
                      !isValid ||
                      isSubmitting
                    }
                    style={{
                      padding: windowWidth < 768 ? "10px 16px" : "12px 24px",
                      fontSize: windowWidth < 768 ? "14px" : "16px",
                    }}
                    startIcon={
                      isSubmitting ||
                      (isPending && (
                        <CircularProgress
                          size={windowWidth < 768 ? "16px" : "20px"}
                          sx={{ color: "#fff" }}
                        />
                      ))
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

      <section className=" bg-[var(--green-500)] lg:grid hidden">
        <img
          src={waterMark}
          style={{
            width: windowWidth < 768 ? "80%" : "100%",
            maxWidth: "100%",
          }}
        />
      </section>
    </section>
  );
}
