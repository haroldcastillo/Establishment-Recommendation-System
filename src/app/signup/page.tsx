"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import Textfield from "@/components/Textfield";
import { Button } from "@mui/material";
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
            name: "",
            email: "",
            password: "",
            role: "user",
            confirmPassword: "",
            contactNumber: "",
        },
        validate: (values) => {
            let errors: {
                name?: string;
                password?: string;
                confirmPassword?: string;
                contactNumber?: string;
                email?: string;
            } = {};
            if (!values.name) {
                errors.name = "Required Full Name";
            }
            if (!values.contactNumber) {
                errors.contactNumber = "Required Contact Number";
            }
            if (!/^\d{11}$/.test(values.contactNumber)) {
                errors.contactNumber = "Invalid Contact Number";
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
                    name: values.name,
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
            <div className="p-7 rounded-xl bg-[white] w-[95%] max-w-[450px]">
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
                            <Textfield
                                label="Full Name"
                                type="text"
                                placeholder=""
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                error={
                                    formik.touched.name &&
                                    formik.errors.name !== undefined
                                }
                                errorMessages={formik.errors.name}
                            />
                            <Textfield
                                label="Contact Number"
                                type="tel"
                                placeholder=""
                                value={formik.values.contactNumber}
                                name="contactNumber"
                                onChange={formik.handleChange}
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
