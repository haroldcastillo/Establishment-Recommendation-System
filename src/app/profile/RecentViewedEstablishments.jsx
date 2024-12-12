"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CardComponent from "@/components/CardComponent";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { getEstablishment } from "@/store/apis/establishments";
import { useRouter } from "next/navigation";
export default function RecentViewedEstablishments() {
    const router = useRouter();
    const [loading, setIsLoading] = React.useState(true);
    const user = useSelector((state) => state?.user?.user?.data);
    useEffect(() => {
        if (user.lastViewed) {
            const fetchEstablishments = async () => {
                setIsLoading(true);
                const establishments = await Promise.all(
                    user.lastViewed.map((lastViewed) =>
                        getEstablishment(lastViewed.establishmentId)
                    )
                );
                setEstablishments(establishments);
                setIsLoading(false);
            };
            fetchEstablishments();
        }
    }, [user]);
    const [establishments, setEstablishments] = React.useState([]);
    if (loading) return <div></div>;
    if (establishments.length === 0) return <div></div>;
    return (
        <>
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    fontWeight: "bold",
                    my: "2em",
                    fontSize: "1.2em",
                }}
            >
                Recent Viewed Establishments
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: "1fr",
                    md: "1fr 1fr 1fr",
                }}
                gap="1em"
            >
                {establishments.map((item, index) => (
                    <CardComponent
                        id={item._id}
                        key={index}
                        title={item.name}
                        creatorId={item.creatorId}
                        img={item.picture[0]}
                        description={item.barangay}
                        ratingValue={item.rating}
                        onClick={() => {
                            router.push(`/establishment/${item._id}`);
                        }}
                    />
                ))}
            </Box>
        </>
    );
}
