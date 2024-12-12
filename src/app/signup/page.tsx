"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import Textfield from "@/components/Textfield";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import { registerUser } from "@/store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
const RegisterPage = () => {
    const registerStatus = useSelector((state: any) => state.auth.register);
    const dispatch = useDispatch();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            middle_name: "",
            email: "",
            password: "",
            role: "user",
            confirmPassword: "",
            contactNumber: "",
        },
        validate: (values) => {
            let errors: {
                first_name?: string;
                last_name?: string;
                middle_name?: string;
                password?: string;
                confirmPassword?: string;
                contactNumber?: string;
                email?: string;
            } = {};

            if (!values.first_name) {
                errors.first_name = "Required First Name";
            }
            if (!values.last_name) {
                errors.last_name = "Required Last Name";
            }
            if (!values.middle_name) {
                errors.middle_name = "Required Middle Name";
            }
            if (!values.contactNumber) {
                errors.contactNumber = "Required Contact Number";
            }
            if (!values.email) {
                errors.email = "Required Email";
            }
            if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    values.email
                )
            ) {
                errors.email = "Invalid Email";
            }
            if (!values.password) {
                errors.password = "Required Password";
            }

            if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = "Required Confirm Password";
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password does not match";
            }
            return errors;
        },
        onSubmit: async (values) => {
            dispatch(
                registerUser({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    middle_name: values.middle_name,
                    email: values.email,
                    password: values.password,
                    role: values.role,
                    contactNumber: values.contactNumber,
                })
            );
        },
    });

    return (
        <div className="bg-[#ececec] w-[100%] min-h-[100vh] flex flex-col items-center justify-center">
            <div className="p-7 rounded-xl bg-[white] w-[95%] max-w-[550px]">
                {registerStatus.data.userId ? (
                    <>
                        <h2 className="text-center text-[20px] font-bold text-primary mt-4">
                            🎉 You have successfully registered 🎉
                        </h2>
                        <p className="text-center text-[14px] font-semibold opacity-60">
                            kindly check your email for verification
                        </p>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            sx={{ marginTop: "4em" }}
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            Go to Login
                        </Button>
                    </>
                ) : (
                    <>
                        <Chip
                            label="Go Back"
                            onClick={() => {
                                router.back();
                            }}
                        />
                        <h2 className="text-center text-[25px] font-bold text-primary mt-4">
                            SIGN UP
                        </h2>
                        <p className="text-center text-[14px] font-semibold opacity-60">
                            🎊 Register & Be Part of Us 🎊
                        </p>
                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-4 mt-5"
                        >
                            <Box
                                display="grid"
                                sx={{
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "1em",
                                }}
                            >
                                <Textfield
                                    label="First Name"
                                    type="text"
                                    placeholder=""
                                    value={formik.values.first_name}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(
                                            /[^a-zA-Z]/g,
                                            ""
                                        ); // Remove any non-letter characters (including numbers)
                                        formik.setFieldValue(
                                            "first_name",
                                            value
                                        ); // Update the form value with the filtered string
                                    }}
                                    name="first_name"
                                    error={
                                        formik.touched.first_name &&
                                        formik.errors.first_name !== undefined
                                    }
                                    errorMessages={formik.errors.first_name}
                                />
                                <Textfield
                                    label="Middle Name"
                                    type="text"
                                    placeholder=""
                                    value={formik.values.middle_name}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(
                                            /[^a-zA-Z]/g,
                                            ""
                                        ); // Remove any non-letter characters (including numbers)
                                        formik.setFieldValue(
                                            "middle_name",
                                            value
                                        ); // Update the form value with the filtered string
                                    }}
                                    name="middle_name"
                                    error={
                                        formik.touched.middle_name &&
                                        formik.errors.middle_name !== undefined
                                    }
                                    errorMessages={formik.errors.middle_name}
                                />
                                <Textfield
                                    label="Last Name"
                                    type="text"
                                    placeholder=""
                                    value={formik.values.last_name}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(
                                            /[^a-zA-Z]/g,
                                            ""
                                        ); // Remove any non-letter characters (including numbers)
                                        formik.setFieldValue(
                                            "last_name",
                                            value
                                        ); // Update the form value with the filtered string
                                    }}
                                    name="last_name"
                                    error={
                                        formik.touched.last_name &&
                                        formik.errors.last_name !== undefined
                                    }
                                    errorMessages={formik.errors.last_name}
                                />
                            </Box>
                            <Textfield
                                label="Contact Number"
                                type="tel"
                                placeholder=""
                                value={formik.values.contactNumber}
                                name="contactNumber"
                                onChange={(e) => {
                                    // Remove all non-numeric characters
                                    let value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                    // Ensure the phone number doesn't exceed 11 digits
                                    if (value.length > 11) {
                                        return;
                                    }

                                    // Add dashes after every 4 digits (e.g., 0908-265-7587)
                                    if (value.length > 3 && value.length <= 7) {
                                        value = value.replace(
                                            /(\d{4})(\d{1,3})/,
                                            "$1-$2"
                                        );
                                    } else if (value.length > 7) {
                                        value = value.replace(
                                            /(\d{4})(\d{3})(\d{1,4})/,
                                            "$1-$2-$3"
                                        );
                                    }

                                    // Update the value in Formik
                                    formik.setFieldValue(
                                        "contactNumber",
                                        value
                                    );
                                }}
                                error={
                                    formik.touched.contactNumber &&
                                    formik.errors.contactNumber !== undefined
                                }
                                errorMessages={formik.errors.contactNumber}
                            />
                            <Textfield
                                label="Email"
                                type="text"
                                placeholder=""
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name="email"
                                error={
                                    formik.touched.email &&
                                    formik.errors.email !== undefined
                                }
                                errorMessages={formik.errors.email}
                            />
                            <Textfield
                                label="Password"
                                type="password"
                                placeholder=""
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                name="password"
                                error={
                                    formik.touched.password &&
                                    formik.errors.password !== undefined
                                }
                                errorMessages={formik.errors.password}
                            />
                            <Textfield
                                label="Confirm Password"
                                type="password"
                                placeholder=""
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                name="confirmPassword"
                                error={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword !== undefined
                                }
                                errorMessages={formik.errors.confirmPassword}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-4"
                            >
                                Sign Up
                            </Button>
                            <p className="text-center text-[13px] mt-[-5px] text-[black]/50">
                                Have an account?{" "}
                                <span
                                    className="underline text-[black]/80 font-semibold cursor-pointer hover:text-[black]/100"
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    Login
                                </span>
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
