"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { verify } from "@/store/apis/auth";
export default function page({ params }) {
    const router = useRouter();

    const [isVerified, setIsVerified] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function verifyAccount() {
            const response = await verify(params.id);
            if (response.status === 200) {
                setIsVerified(true);
            }

            if (response.status === 400) {
                alert("Invalid verification link");
                router.push("/");
            }

            setIsLoading(false);
        }
        verifyAccount();
    }, []);

    return (
        <div className="bg-[#ececec] w-[100%] min-h-[100vh] flex flex-col items-center justify-center">
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className="p-7 rounded-xl bg-[white] w-[95%] max-w-[400px]">
                    <h1 className="text-2xl font-semibold text-center">
                        Your account <br /> has been verified!
                    </h1>
                    <p className="text-center text-gray-500 mt-2">
                        Kindly proceed in loging in
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "2em" }}
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        Login
                    </Button>
                </div>
            )}
        </div>
    );
}
