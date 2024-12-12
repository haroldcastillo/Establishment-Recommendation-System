"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
// Dynamically import the map component with SSR disabled
import dynamic from "next/dynamic";
const OpenStreetMapWithRouting = dynamic(
    () => import("./OpenStreetMapWithRouting"),
    { ssr: false }
);
import SelectInput from "@/components/SelectInput";
import { BarangayList, BarangayActivitiesList } from "@/lib/constants";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

export default function Page() {
    const [locationOne, setLocationOne] = React.useState(BarangayList[0]);
    const [locationTwo, setLocationTwo] = React.useState(BarangayList[1]);
    const [activities, setActivities] = React.useState(
        BarangayActivitiesList[1].activities
    );
    const Formik = useFormik({
        initialValues: {
            locationOne: locationOne,
            locationTwo: locationTwo,
            distance: 0,
        },
        onSubmit: (values) => {
            setLocationOne(values.locationOne);
            setLocationTwo(values.locationTwo);
        },
    });

    useEffect(() => {
        BarangayActivitiesList.forEach((element) => {
            if (element.type === Formik.values.locationTwo) {
                setActivities(element.activities);
            }
        });
    }, [Formik.values.locationTwo]);
    // Function to format time in hours and minutes
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.round(minutes % 60);
        if (hours > 0) {
            return `${hours} hour${
                hours > 1 ? "s" : ""
            } ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
        }
        return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    };

    // Function to calculate walking time in a formatted string
    const calculateWalkingTime = (distanceKm) => {
        const walkingSpeed = 5; // Walking speed in km/h
        const timeInMinutes = (distanceKm / walkingSpeed) * 60;
        return formatTime(timeInMinutes);
    };

    // Function to calculate driving time in a formatted string
    const calculateDrivingTime = (distanceKm) => {
        const vehicleSpeed = 60; // Driving speed in km/h
        const timeInMinutes = (distanceKm / vehicleSpeed) * 60;
        return formatTime(timeInMinutes);
    };
    return (
        <>
            <div className=" mx-auto max-w-screen-lg px-4 pt-[20px] pb-4 mt-[2em]">
                <Box
                    display="flex"
                    mx="auto"
                    my="auto"
                    sx={{
                        mb: "1em",
                        gap: "1em",
                        alignItems: "end",
                    }}
                >
                    <Box
                        display="flex"
                        sx={{
                            gap: "1em",
                            flexGrow: "1",
                        }}
                    >
                        <SelectInput
                            label="Current Location"
                            value={Formik.values.locationOne}
                            name="locationOne"
                            onChange={Formik.handleChange}
                            options={BarangayList}
                        />
                        <SelectInput
                            label="Destination"
                            value={Formik.values.locationTwo}
                            name="locationTwo"
                            onChange={Formik.handleChange}
                            options={BarangayList}
                        />
                    </Box>

                    {Formik.values.distance > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                mb: ".4em",
                                gap: "1em",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body1" color="initial">
                                Distance: {Formik.values.distance} km
                            </Typography>
                            <Box
                                sx={{
                                    padding: ".2em .5em",
                                    borderRadius: ".3em",
                                    border: "1px solid #ececec",
                                    gap: ".5em",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <DirectionsWalkIcon
                                    sx={{
                                        fontSize: "1.2em",
                                        color: "#000",
                                    }}
                                />
                                {calculateWalkingTime(
                                    parseFloat(Formik.values.distance)
                                )}
                                <AirportShuttleIcon
                                    sx={{
                                        fontSize: "1.5em",
                                        color: "#000",
                                    }}
                                />
                                {calculateDrivingTime(
                                    parseFloat(Formik.values.distance)
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
                <OpenStreetMapWithRouting
                    locationOne={
                        Formik.values.locationOne + " marikina, Philippines"
                    }
                    locationTwo={
                        Formik.values.locationTwo + " marikina, Philippines"
                    }
                    setDistance={(distance) => {
                        Formik.setFieldValue("distance", distance);
                    }}
                />
                {activities.length !== 0 && (
                    <Box>
                        <Typography
                            variant="body1"
                            color="primary"
                            sx={{
                                fontWeight: "bold",
                                mt: "1em",
                                fontSize: "1.2em",
                            }}
                        >
                            Activities you can do in {Formik.values.locationTwo}
                        </Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                            {activities.map((activity, index) => {
                                return (
                                    <Paper
                                        key={index}
                                        sx={{
                                            p: "1em",
                                            m: "1em",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {activity.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                        >
                                            {activity.description}
                                        </Typography>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>
                )}
            </div>
        </>
    );
}
