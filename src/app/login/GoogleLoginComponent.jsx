import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { googleLoginStart } from "../../store/actions/auth";

export default function GoogleLoginComponent() {
    const dispatch = useDispatch();
    const handleSuccess = (credentialResponse) => {
        try {
            if (typeof window !== "undefined") {
                const decodedCredential = decodeJwt(
                    credentialResponse.credential
                );
                console.log("Decoded Credential:", decodedCredential.email);

                dispatch(
                    googleLoginStart({
                        email: decodedCredential.email,
                    })
                );
            }
        } catch (error) {
            console.error("Error decoding JWT:", error);
        }
    };

    const handleError = () => {
        console.error("Google Login Failed");
    };
    const decodeJwt = (token) => {
        try {
            const base64Url = token.split(".")[1]; // Get the payload part
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(
                        (c) =>
                            `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
                    )
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{
                marginTop: 4,
            }}
        >
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </Box>
    );
}
