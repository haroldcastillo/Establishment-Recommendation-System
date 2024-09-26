"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import Textfield from "@/components/Textfield";
import { Button, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/actions/auth";
const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate: (values) => {
            let errors: { username?: string; password?: string } = {};
            if (!values.username) {
                errors.username = "Required Username";
            }
            if (!values.password) {
                errors.password = "Required Password";
            }
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            dispatch(
                loginUser({ email: values.username, password: values.password })
            );
        },
    });

    const utils = useSelector((state: any) => state.auth.utils);
    useEffect(() => {
        if (utils.accessToken) {
            router.back();
        }
    }, [utils]);
    return (
        <div className="bg-[#ececec] w-[100%] min-h-[100vh] flex flex-col items-center justify-center">
            <div className="p-7 rounded-xl bg-[white] w-[95%] max-w-[400px]">
                <Chip
                    label="Go Back"
                    onClick={() => {
                        router.back();
                    }}
                />
                <h2 className="text-center text-[25px] font-bold text-primary mt-4">
                    LOGIN
                </h2>
                <p className="text-center font-semibold text-[14px] opacity-60">
                    Welcome Back!👋
                </p>
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4 mt-5"
                >
                    <Textfield
                        label="Email"
                        type="text"
                        placeholder=""
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        name="username"
                        error={
                            formik.touched.username &&
                            formik.errors.username !== undefined
                        }
                        errorMessages={formik.errors.username}
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-4"
                    >
                        Login
                    </Button>
                    <p className="text-center text-[13px] mt-[-5px] text-[black]/50">
                        Don&apos;t have an account?{" "}
                        <span
                            className="underline text-[black]/80 font-semibold cursor-pointer hover:text-[black]/100"
                            onClick={() => {
                                router.push("/signup");
                            }}
                        >
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
