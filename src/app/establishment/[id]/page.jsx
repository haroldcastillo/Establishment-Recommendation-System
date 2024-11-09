"use client";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstablishment } from "@/store/actions/establishments";
import Paper from "@mui/material/Paper";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useRouter } from "next/navigation";
import ImagesEstablishment from "@/components/ImagesEstablishment";
import usePopover from "@/hooks/usePopover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import DeleteEstablishment from "@/components/DeleteEstablishment";
import Alert from "@mui/material/Alert";
import FavoriteComponent from "@/components/FavoriteComponent";

export default function Establishment({ params }) {
    const { handleClick, handleClose, PopperComponent } = usePopover();
    const dispatch = useDispatch();
    const view = useSelector((state) => state.establishments.view);
    const userId = useSelector((state) => state.auth.utils.userId);
    const router = useRouter();
    const isOwner = view.data?.creatorId === userId;
    function convertTo12Hour(time) {
        if (!time) {
            return ""; // Or handle the error as needed
        }

        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);

        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert hour 0 to 12

        return `${hours}:${minutes} ${ampm}`;
    }

    useEffect(() => {
        dispatch(fetchEstablishment(params.id));
    }, []);

    if (view.isLoading && view.data === null) {
        return <div>Loading...</div>;
    }
    return (
        <div className=" mx-auto max-w-screen-lg px-4 pt-[20px] pb-4 mt-[2em]">
            {/* title */}
            {!view.data?.isVerified ? (
                <Alert
                    variant="filled"
                    severity="warning"
                    sx={{ marginBottom: "1em" }}
                >
                    This is not verified by the admin. Please wait for the admin
                    to verify this establishment.
                </Alert>
            ) : null}

            <div className="flex justify-between mb-4 items-center">
                <div>
                    <h1 className="text-[20px] font-bold first-letter:uppercase">
                        {view.data.name}
                    </h1>
                    <h2 className="text-[14px] first-letter:uppercase">
                        <LocationOnIcon sx={{ fontSize: 15 }} />
                        {view.data.address}
                    </h2>
                </div>
                {isOwner ? (
                    <>
                        <Tooltip title="More Actions">
                            <IconButton aria-label="" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                        <PopperComponent>
                            <Paper
                                variant="elevation"
                                elevation="3"
                                className="p-4 w-[200px]"
                            >
                                <p className="font-semibold">Actions</p>
                                <hr className="my-2" />
                                <div className="flex flex-col gap-2">
                                    <MenuItem
                                        onClick={() => {
                                            router.push(
                                                `/establishment/edit/${view.data._id}`
                                            );
                                        }}
                                    >
                                        <p className="font-bold opacity-70 text-[12px]">
                                            Edit
                                        </p>
                                    </MenuItem>
                                    <DeleteEstablishment id={params.id} />
                                </div>
                            </Paper>
                        </PopperComponent>
                    </>
                ) : (
                    <>
                        <FavoriteComponent id={view.data._id} />
                    </>
                )}
            </div>
            {/* Image */}
            <ImagesEstablishment images={view?.data?.picture} />

            {/* Other Information */}
            <div
                className="flex flex-col md:flex-row mt-4 gap-4"
                style={{ alignItems: "start" }}
            >
                <div className=" grow">
                    <h2 className="text-[18px] font-bold">Description</h2>
                    <p className="text-[14px] text-justify">
                        {view.data.description}
                    </p>
                </div>
                <Paper
                    variant="elevation"
                    elevation="3"
                    className="p-4 w-[100%] md:max-w-[300px] shrink-0"
                >
                    <p className="font-semibold">More Information</p>
                    <hr className="my-2" />
                    <div className="flex flex-col gap-2">
                        <div className="">
                            <p className="font-bold opacity-70 text-[12px]">
                                Operation Hours
                            </p>
                            <p className="first-letter:uppercase">
                                {convertTo12Hour(view.data?.open)} to{" "}
                                {convertTo12Hour(view.data?.close)}
                            </p>
                        </div>
                        <div className="">
                            <p className="font-bold opacity-70 text-[12px]">
                                Location
                            </p>
                            <p className="first-letter:uppercase overflow-hidden">
                                {view.data.address}
                            </p>
                        </div>
                        <div className="">
                            <p className="font-bold opacity-70 text-[12px]">
                                Contact Number
                            </p>
                            <p className="first-letter:uppercase">
                                {view.data.phone}
                            </p>
                        </div>
                        <div className="">
                            <p className="font-bold opacity-70 text-[12px]">
                                Facebook
                            </p>
                            <IconButton
                                aria-label=""
                                onClick={() => {
                                    window.open(view.data.facebook, "_blank");
                                }}
                            >
                                <FacebookIcon sx={{ color: "black" }} />
                            </IconButton>
                        </div>
                        <div className="flex justify-between items-center"></div>
                    </div>
                </Paper>
            </div>
        </div>
    );
}
