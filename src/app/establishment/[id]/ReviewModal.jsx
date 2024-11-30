import React, { useEffect } from "react";
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
import { createReview } from "@/store/apis/reviews";

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
export default function ReviewModal({ establishmentId }) {
    const userId = useSelector((state) => state?.user?.user?.data?._id);
    const user = useSelector((state) => state?.user?.user?.data);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [hover, setHover] = React.useState(-1);
    const formik = useFormik({
        initialValues: {
            userId: "",
            establishmentId: "",
            rating: 0,
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
            const response = await createReview(values);

            if (response.status !== 500) {
                console.log("Review created successfully", response);
            } else {
                alert("Something went wrong.");
            }
            handleClose();
        },
    });

    useEffect(() => {
        formik.setFieldValue("userId", userId);
        formik.setFieldValue("establishmentId", establishmentId);
    }, [userId, establishmentId]);

    if (!establishmentId || !userId) return null;

    return (
        <>
            <Tooltip title="Add Review">
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
                            <Button
                                variant="contained"
                                onClick={formik.handleSubmit}
                                sx={{
                                    mt: "1rem",
                                }}
                            >
                                Submit
                            </Button>
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
