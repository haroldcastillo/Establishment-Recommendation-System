"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import { resetPassword } from "@/store/apis/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
export default function page({ params }) {
    const router = useRouter();
    const isExpired = params && params.expiryDate < Date.now();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = "Required Password";
            } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Required Confirm Password";
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords do not match";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await resetPassword(values, params.id);
                alert(response.message);
                router.push("/login");
                // console.log("Response", response);
            } catch (error) {
                alert("Something went wrong");
                router.push("/");
            }
        },
    });
    return (
        <>
            <Box
                display="flex"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Paper
                    variant="elevation"
                    elevation={3}
                    sx={{
                        borderRadius: "10px",
                        padding: "20px",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                >
                    {isExpired && (
                        <>
                            <Typography
                                variant="body1"
                                color="error"
                                sx={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Link is Expired
                            </Typography>
                        </>
                    )}

                    {!isExpired && (
                        <>
                            <Box>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Reset Your Password
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="initial"
                                    sx={{
                                        opacity: 0.7,
                                    }}
                                >
                                    Please enter your new password
                                </Typography>
                            </Box>

                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    formik.errors.password !== undefined
                                }
                                helperText={formik.errors.password}
                            />

                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword !== undefined
                                }
                                helperText={formik.errors.confirmPassword}
                            />

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={formik.handleSubmit}
                                disabled={formik.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Paper>
            </Box>
        </>
    );
}
