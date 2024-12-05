"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { verify } from "@/store/apis/auth";

export default function VerificationPage({ params }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(null); // null: initial state, true: success, false: failure

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await verify(params.id);
                if (response.status === 200) {
                    setIsVerified(true);
                } else if (response.status === 400) {
                    alert("Invalid verification link");
                    router.push("/");
                } else {
                    setIsVerified(false);
                }
            } catch (error) {
                console.error("Verification failed:", error);
                alert("An error occurred during verification.");
                setIsVerified(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAccount();
    }, [params.id, router]);

    if (isLoading) {
        return (
            <div className="bg-[#ececec] w-full min-h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="bg-[#ececec] w-full min-h-screen flex items-center justify-center">
            <div className="p-7 rounded-xl bg-white w-11/12 max-w-md">
                {isVerified ? (
                    <>
                        <h1 className="text-2xl font-semibold text-center">
                            Your account <br /> has been verified!
                        </h1>
                        <p className="text-center text-gray-500 mt-2">
                            Kindly proceed to log in.
                        </p>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "2em" }}
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-semibold text-center text-red-500">
                            Verification failed.
                        </h1>
                        <p className="text-center text-gray-500 mt-2">
                            Please try again or contact support if the issue
                            persists.
                        </p>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "2em" }}
                            onClick={() => router.push("/")}
                        >
                            Go to Homepage
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
