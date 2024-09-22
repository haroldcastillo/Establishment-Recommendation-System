"use client";
import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextFieldComponent from "./TextFieldComponent";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updatePassword } from "@/store/actions/user";

export default function UpdatePassword({ userId }) {
    const dispatch = useDispatch();
    const [onChange, setOnChange] = useState(false);

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.currentPassword) {
                errors.currentPassword = "Required";
            }
            if (!values.newPassword) {
                errors.newPassword = "Required";
            }
            return errors;
        },
        onSubmit: (values) => {
            // Dispatch the update password action with the new password

            dispatch(
                updatePassword({
                    password: values.currentPassword,
                    id: userId,
                    newPassword: values.newPassword,
                })
            );
            setOnChange(false); // Reset the state to hide the form
        },
    });

    return (
        <Box display="flex" sx={{ gap: "1em" }}>
            {onChange ? (
                <>
                    <TextFieldComponent
                        label="Current Password"
                        onUpdate={(value) =>
                            formik.setFieldValue("currentPassword", value)
                        }
                        disabled={false}
                    />
                    <TextFieldComponent
                        label="New Password"
                        onUpdate={(value) =>
                            formik.setFieldValue("newPassword", value)
                        }
                        disabled={false}
                    />
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => {
                            setOnChange(false); // Cancel and hide the form
                            formik.resetForm(); // Reset the form values
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={formik.handleSubmit} // Trigger form submission
                        type="submit"
                    >
                        Update Password
                    </Button>
                </>
            ) : (
                <Chip
                    variant="outlined"
                    color="default"
                    label="Change Password"
                    onClick={() => setOnChange(true)} // Show the form
                />
            )}
        </Box>
    );
}
