"use client";
import React, { useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TextFieldComponent from "./TextFieldComponent";
import UpdatePassword from "./UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/actions/user";
import useFirebase from "@/hooks/useFirebase";

export default function Page() {
    const profilePicRef = useRef(null);
    const { uploadFile } = useFirebase();
    const user = useSelector((state) => state?.user?.user?.data);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            contactNumber: user?.contactNumber || "",
            email: user?.email || "",
            image: user?.image || "",
            id: user?._id || "",
        },
        enableReinitialize: true, // Reinitialize when user data changes
        validate: (values) => {
            const errors = {};
            if (!values.name) errors.name = "Required";
            if (!values.contactNumber) errors.contactNumber = "Required";
            if (!values.email) errors.email = "Required";
            if (!values.id) errors.id = "Required";
            return errors;
        },
        onSubmit: (values) => {
            console.log("Form Values:", values);
        },
    });

    // Debounce form submission when formik values change and the form is dirty
    useEffect(() => {
        if (formik.dirty) {
            const timeoutId = setTimeout(() => {
                dispatch(updateUser(formik.values));
            }, 500); // Wait for 500ms after changes before dispatching updateUser
            return () => clearTimeout(timeoutId); // Cleanup debounce timeout
        }
    }, [formik.values, formik.dirty, dispatch]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedFileURL = await uploadFile(file, "profile_pictures");
            formik.setFieldValue("image", uploadedFileURL); // Set the uploaded image URL
        }
    };

    return (
        <div className="mt-[90px] p-4">
            <div className="max-w-screen-lg mx-auto p-4">
                <Paper
                    variant="elevation"
                    elevation={3}
                    sx={{
                        padding: "20px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    <Box
                        display={"flex"}
                        justifyContent={"start"}
                        alignItems={"center"}
                    >
                        <Box
                            sx={{
                                background: "#ececec",
                                padding: "1em",
                                borderRadius: "1em",
                                display: "flex",
                                alignItems: "center",
                                gap: "1em",
                                width: "50%",
                            }}
                        >
                            <Avatar
                                alt="Profile Picture"
                                src={formik.values.image}
                                sx={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "50%",
                                }}
                            />
                            <Box>
                                <Typography variant="body1" color="initial">
                                    Profile Picture
                                </Typography>
                                <Chip
                                    label="Change"
                                    variant="outlined"
                                    onClick={() => {
                                        profilePicRef.current.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    ref={profilePicRef}
                                    onChange={handleImageChange}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="body1" color="initial">
                        User Details
                    </Typography>

                    <TextFieldComponent
                        label="Full Name"
                        onUpdate={(value) =>
                            formik.setFieldValue("name", value)
                        }
                        initialValue={formik.values.name}
                    />
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: "1em",
                        }}
                    >
                        <TextFieldComponent
                            label="Contact Number"
                            onUpdate={(value) =>
                                formik.setFieldValue("contactNumber", value)
                            }
                            initialValue={formik.values.contactNumber}
                        />
                        <TextFieldComponent
                            label="Email Address"
                            disabled={true}
                            initialValue={formik.values.email}
                            onUpdate={(value) =>
                                formik.setFieldValue("email", value)
                            }
                        />
                    </Box>

                    <Typography variant="body1" color="initial">
                        Password
                    </Typography>
                    <UpdatePassword userId={user?._id} />
                </Paper>
            </div>
        </div>
    );
}