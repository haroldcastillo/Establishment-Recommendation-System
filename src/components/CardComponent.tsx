"use client";
import React from "react";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteComponent from "./FavoriteComponent";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
type Props = {
    ratingValue?: number;
    title: string;
    description: string;
    img: string;
    id: string;
    creatorId: string;
    onClick?: () => void;
};
export default function CardComponent({
    title,
    description,
    img,
    onClick,
    id,
    ratingValue,
    creatorId,
}: Props) {
    const user = useSelector((state: any) => state.auth?.utils.userId);
    return (
        <div className="rounded-xl shadow-md overflow-hidden flex flex-col">
            <div
                className=" w-[100%] h-[250px] flex justify-end items-start"
                style={{
                    background: `url(${img})`,
                    backgroundSize: "cover",
                }}
            >
                {creatorId !== user && <FavoriteComponent id={id} />}
            </div>
            <div
                className="p-4"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <Box sx={{ flexGrow: "1" }}>
                    <p className="grow text-[17px] font-semibold first-letter:uppercase">
                        {title}
                    </p>
                    <p className="text-black text-[14px]  opacity-55">
                        <LocationOnIcon sx={{ fontSize: "17px" }} />
                        {description}
                    </p>
                </Box>
                {ratingValue && (
                    <Rating
                        name="half-rating-read"
                        defaultValue={ratingValue}
                        precision={0.5}
                        readOnly
                    />
                )}
                <Button
                    fullWidth
                    variant="contained"
                    className="mt-5"
                    color="primary"
                    onClick={onClick}
                >
                    Visit
                </Button>
            </div>
        </div>
    );
}
