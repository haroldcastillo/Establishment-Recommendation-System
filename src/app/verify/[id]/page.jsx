"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { verify } from "@/store/apis/auth";

export default function Page({ params }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isVerified, setIsVerified] = React.useState(false);

    React.useEffect(() => {
        verify(params.id)
            .then((response) => {
                if (response.status === 200) {
                    setIsVerified(true);
                } else if (response.status === 400) {
                    alert("Invalid verification link");
                    router.push("/");
                }
            })
            .catch((error) => {
                console.error("Verification failed:", error);
                alert("An error occurred during verification.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.id, router]);

    return (
        <div className="bg-[#ececec] w-full min-h-screen flex flex-col items-center justify-center">
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className="p-7 rounded-xl bg-white w-11/12 max-w-md">
                    {isVerified ? (
                        <>
                            <h1 className="text-2xl font-semibold text-center">
                                Your account <br /> has been verified!
                            </h1>
                            <p className="text-center text-gray-500 mt-2">
                                Kindly proceed in logging in
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
                        <h1 className="text-xl text-center text-red-500">
                            Verification failed.
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
}
