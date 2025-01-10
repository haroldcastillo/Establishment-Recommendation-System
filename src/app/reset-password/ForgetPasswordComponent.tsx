import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
import { resend } from "@/store/apis/auth";
export default function ForgetPasswordComponent() {
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            if (email) {
                const response = await resend({ email });
                if (response) {
                    alert("Email sent successfully");
                    handleClose();
                }
            } else {
                alert("Email is required");
                handleClose();
            }
        } catch (error: any) {
            alert(error.response.data.message);
            console.log("error", error);
            handleClose();
        }
        setEmail("");
    };
    return (
        <>
            <Box
                sx={{
                    cursor: "pointer",
                    opacity: 0.6,
                    ":hover": {
                        opacity: 1,
                    },
                    transition: "opacity 0.3s",
                    fontSize: "12px",
                    color: "#000000",
                }}
                onClick={handleOpen}
            >
                Forgot Password
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Typography
                        variant="body1"
                        color="primary"
                        sx={{
                            fontSize: "25px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        Forgot Password
                    </Typography>

                    <p id="child-modal-description">
                        Enter your email address and we will send you a link to
                        reset your password.
                    </p>

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        sx={{
                            marginTop: "20px",
                        }}
                    />

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        Send Email
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
