"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EstablishmentList from "./EstablishmentList";
import UserLists from "./UserLists";
import { fetchAllUsers } from "@/store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstablishments } from "@/store/actions/establishments";

export default function Page() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state?.user?.users);
    const establishments = useSelector(
        (state: any) => state?.establishments?.establishments
    );
    const [open, setOpen] = React.useState(1);

    React.useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchAllEstablishments());
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto p-4 mt-[2em]">
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                }}
            >
                Analytics
            </Typography>
            <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
                <AnalyticsCard
                    title="Users"
                    subtitle={users?.data?.length}
                    onClick={() => {
                        setOpen(1);
                    }}
                    isActive={open === 1}
                />
                <AnalyticsCard
                    title="Establishments"
                    subtitle={establishments?.data?.length}
                    onClick={() => {
                        setOpen(2);
                    }}
                    isActive={open === 2}
                />
            </div>

            <div style={{ marginTop: "1em" }}>
                {open === 1 && <UserLists />}
                {open === 2 && <EstablishmentList />}
            </div>
        </div>
    );
}

function AnalyticsCard({
    title,
    subtitle,
    onClick,
    isActive,
}: {
    title?: string;
    subtitle?: string;
    onClick?: () => void;
    isActive?: boolean;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                borderRadius: 1,
                bgcolor: "background.paper",
                aspectRatio: "16/9",
                width: "300px",
                boxShadow: 1,
            }}
            onClick={onClick}
        >
            <Box sx={{ flexGrow: "1" }}>
                <h3
                    style={{
                        fontSize: "1rem",
                        margin: "0",
                        color: "black",
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: "3.5rem",
                        lineHeight: "1",
                        fontWeight: "600",
                        margin: "0",
                        color: "black",
                    }}
                >
                    {subtitle}
                </p>
            </Box>
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    cursor: "pointer",
                    opacity: `${isActive ? "1" : ".5"}`,
                    transition: "opacity 0.3s",
                    textDecoration: isActive ? "underline" : "none",
                    ":hover": {
                        opacity: "1",
                    },
                }}
            >
                view more
            </Typography>
        </Box>
    );
}
