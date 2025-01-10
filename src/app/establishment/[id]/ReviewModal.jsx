"use client";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { createReview, updateReview, deleteReview } from "@/store/apis/reviews";
import useFirebase from "@/hooks/useFirebase";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const labels = {
    0.5: "Terrible",
    1: "Bad",
    1.5: "Poor",
    2: "Fair",
    2.5: "Average",
    3: "Good",
    3.5: "Very Good",
    4: "Great",
    4.5: "Excellent",
    5: "Outstanding",
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function ReviewModal({ establishmentId, refresh, isReviewed }) {
    const [loadingImages, setLoadingImages] = React.useState(0);
    const fileInput = useRef(null);
    const userId = useSelector((state) => state?.user?.user?.data?._id);
    const user = useSelector((state) => state?.user?.user?.data);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [hover, setHover] = React.useState(-1);
    const { uploadFile } = useFirebase();
    const formik = useFormik({
        initialValues: isReviewed
            ? isReviewed
            : {
                  userId: "",
                  establishmentId: "",
                  rating: 0,
                  photo: [],
                  comment: "",
              },
        validate: (values) => {
            const errors = {};
            if (!values.rating) {
                errors.rating = "Please rate this establishment";
            }
            return errors;
        },
        onSubmit: async (values) => {
            const response = isReviewed
                ? await updateReview(isReviewed._id, values)
                : await createReview(values);

            if (response.status !== 500) {
                console.log("Review created successfully", response);
                refresh();
            } else {
                alert("Something went wrong.");
            }
            handleClose();
        },
    });

    const handleUpload = async (e) => {
        let uploadedFiles = [];
        const files = e.target.files;
        setLoadingImages(loadingImages + files.length);

        try {
            for (let i = 0; i < (files.length > 3 ? 3 : files.length); i++) {
                const file = await uploadFile(files[i], "reviews_images");
                if (file) uploadedFiles.push(file);
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
        setLoadingImages(0); // Decrement loading state per file
        let updatedImages = [...(formik.values.photo || []), ...uploadedFiles];
        formik.setFieldValue("photo", updatedImages); // Update Formik state with the new images
        console.log("Images uploaded:", uploadedFiles);
        e.target.value = null; // Reset the input after handling the files
    };

    useEffect(() => {
        formik.setFieldValue("userId", userId);
        formik.setFieldValue("establishmentId", establishmentId);
    }, [userId, establishmentId]);

    if (!establishmentId || !userId) return null;

    return (
        <>
            <Tooltip
                title={
                    isReviewed
                        ? "Edit your review"
                        : "Review this establishment"
                }
            >
                <IconButton aria-label="" onClick={handleOpen}>
                    <RateReviewIcon />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Box
                        sx={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Paper
                            variant="elevation"
                            elevation={3}
                            sx={{
                                width: "95vw",
                                maxWidth: "450px",
                                padding: "1rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                display="flex"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                    color={"primary"}
                                >
                                    Review this Establishment
                                </Typography>
                                <Tooltip title="Close">
                                    <IconButton
                                        aria-label=""
                                        onClick={handleClose}
                                    >
                                        <Box
                                            sx={{
                                                width: "50px",
                                                height: "50px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#f5f5f5",
                                                padding: "0.5rem",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <CloseIcon />
                                        </Box>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box
                                display="flex"
                                sx={{
                                    flexDirection: "column",
                                    gap: "1rem",
                                    alignItems: "center",
                                    py: "1rem",
                                }}
                            >
                                <Rating
                                    name="hover-feedback"
                                    value={formik.values.rating}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue(
                                            "rating",
                                            newValue
                                        );
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={
                                        <StarIcon
                                            style={{ opacity: 0.55 }}
                                            fontSize="inherit"
                                        />
                                    }
                                    size="large"
                                />

                                <Box
                                    sx={{
                                        height: "40px",
                                    }}
                                >
                                    {
                                        labels[
                                            hover !== -1
                                                ? hover
                                                : formik.values.rating
                                        ]
                                    }
                                </Box>
                            </Box>
                            <TextField
                                multiline
                                name="comment"
                                id="comment"
                                rows={4}
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                            />
                            <Box
                                display="grid"
                                sx={{
                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(100px, 1fr))",
                                    gap: "1rem",
                                }}
                            >
                                {formik.values.photo.map((image, index) => (
                                    <>
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={image}
                                                alt="review"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "10px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    let updatedImages =
                                                        formik.values.photo.filter(
                                                            (img) =>
                                                                img !== image
                                                        );
                                                    formik.setFieldValue(
                                                        "photo",
                                                        updatedImages
                                                    );
                                                }}
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            >
                                                <CloseIcon
                                                    sx={{ color: "white" }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </>
                                ))}
                            </Box>

                            <input
                                type="file"
                                style={{
                                    display: "none",
                                }}
                                ref={fileInput}
                                onChange={handleUpload}
                                multiple
                                accept="image/*"
                            />
                            {formik.values.photo.length < 3 && (
                                <Paper
                                    variant="elevation"
                                    elevation={2}
                                    sx={{
                                        width: "150px",
                                        aspectRatio: "9/7",
                                        cursor: "pointer",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px",
                                        opacity: ".5",
                                        ":hover": {
                                            opacity: "1",
                                        },
                                        transition: "opacity .3s",
                                    }}
                                    onClick={() => fileInput.current.click()}
                                >
                                    <UploadFileIcon
                                        sx={{ fontSize: "20px", opacity: ".7" }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="initial"
                                        sx={{
                                            fontSize: "12px",
                                        }}
                                    >
                                        Click here to upload image
                                    </Typography>
                                </Paper>
                            )}
                            <Box display="flex" gap={"1rem"}>
                                {isReviewed && (
                                    <Button
                                        variant="contained"
                                        onClick={async () => {
                                            await deleteReview(isReviewed._id);
                                            refresh();
                                            handleClose();
                                        }}
                                        sx={{
                                            mt: "1rem",
                                            backgroundColor: "red",
                                            color: "white",
                                            flexGrow: 1,
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        mt: "1rem",
                                        flexGrow: 1,
                                    }}
                                >
                                    {isReviewed ? "Update" : "Submit"}
                                </Button>
                            </Box>
                            {formik.touched.rating && formik.errors.rating ? (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "red",
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.rating}
                                </Typography>
                            ) : null}
                        </Paper>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
