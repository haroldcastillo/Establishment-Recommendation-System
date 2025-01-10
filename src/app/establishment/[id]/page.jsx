"use client";
import React, { useEffect, useId } from "react";
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
import ReviewModal from "./ReviewModal";
import { getReviewsByEstablishment } from "@/store/apis/reviews";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Rating from "@mui/material/Rating";
import BucketListComponent from "./BucketListComponent";
import AddBucketListComponent from "../../bucketlist/AddBucketListComponent";

import { addRecentViewed } from "@/store/apis/user";

export default function Establishment({ params }) {
    const { handleClick, handleClose, PopperComponent } = usePopover();
    const dispatch = useDispatch();
    const view = useSelector((state) => state.establishments.view);
    const userId = useSelector((state) => state.auth.utils.userId);
    const router = useRouter();
    const [isLoadingFetchRatings, setIsLoadingFetchRatings] =
        React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const [rating, setRating] = React.useState(0);
    const isOwner = view.data?.creatorId === userId;
    const isReviewed = reviews.find((review) => review?.user?._id === userId);
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

    useEffect(() => {
        if (view.data) {
            handleGetEstablishmentReviews();
        }
    }, [view.data]);

    useEffect(() => {
        if (view.data._id && userId) {
            addRecentViewed({
                id: userId,
                establishmentId: view.data._id,
            });
            console.log(view.data._id, userId);
        }
    }, [userId, view.data]);

    const handleGetEstablishmentReviews = async () => {
        setIsLoadingFetchRatings(true);
        const response = await getReviewsByEstablishment(params.id);
        setReviews(response.data.reviews);
        setRating(response.data.rating);
        setIsLoadingFetchRatings(false);
    };
    console.warn(isReviewed);
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

            <div className="flex mb-4 items-center">
                <div style={{ flexGrow: "1" }}>
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
                        <BucketListComponent
                            userId={userId}
                            establishmentId={view.data._id}
                            type={view.data.barangay}
                        />
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
                        {isLoadingFetchRatings ? null : (
                            <ReviewModal
                                establishmentId={view?.data?._id}
                                refresh={handleGetEstablishmentReviews}
                                isReviewed={isReviewed? isReviewed : false}
                            />
                        )}

                        {view.data._id && (
                            <>
                                <AddBucketListComponent
                                    establishmentId={view.data._id}
                                    userId={userId}
                                />
                                <FavoriteComponent id={view.data._id} />
                            </>
                        )}
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
                            {view.data.facebook ? (
                                <a
                                    href={view.data.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconButton
                                        aria-label=""
                                        onClick={() => {}}
                                    >
                                        <FacebookIcon sx={{ color: "black" }} />
                                    </IconButton>
                                </a>
                            ) : null}
                        </div>
                        <div className="flex justify-between items-center"></div>
                    </div>
                </Paper>
            </div>
            {/* Reviews */}
            {reviews?.length > 0 ? (
                <div className="mt-4">
                    <h2 className="text-[18px] font-bold">
                        Reviews{" "}
                        <span style={{ fontWeight: "300" }}>
                            ({reviews.length} Results)
                        </span>
                    </h2>
                    <Typography
                        variant="body1"
                        color="initial"
                        sx={{
                            color: "#faaf00",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        {rating.toFixed(1)}{" "}
                        <Rating
                            name="read-only"
                            value={rating}
                            readOnly
                            precision={0.5}
                        />
                    </Typography>
                    {reviews.map((review) => (
                        <Paper
                            variant="elevation"
                            elevation="1"
                            className="p-4 mt-4"
                            key={review._id}
                            sx={{
                                opacity: 0.8,
                                transition: "all 0.3s ease-in-out",
                                ":hover": {
                                    opacity: 1,
                                    transform: "scale(1.02)",
                                },
                            }}
                        >
                            <Box
                                display="flex"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    <Avatar
                                        variant="circular"
                                        src={review?.user?.image}
                                        alt={review?.user?.name}
                                    />
                                    <Box>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            sx={{
                                                lineHeight: "1",
                                            }}
                                        >
                                            {review?.user?.first_name}{" "}
                                            {review?.user?.last_name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="initial"
                                            sx={{
                                                lineHeight: "1",
                                            }}
                                        >
                                            {dayjs(review?.createdAt).format(
                                                "MMMM DD, YYYY h:mm A"
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Rating
                                    name="read-only"
                                    value={review?.rating}
                                    precision={0.5}
                                    readOnly
                                />
                            </Box>
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{ mt: "1em", opacity: 0.7 }}
                            >
                                {review.comment}
                            </Typography>

                            {review?.photo.length > 0 && (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(200px, 1fr))",
                                        gap: "1rem",
                                        mt: "1em",
                                    }}
                                >
                                    {review?.photo.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={review?.user?.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Paper>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
