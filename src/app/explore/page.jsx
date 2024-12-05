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
                <OpenStreetMapWithRouting
                    locationOne={
                        Formik.values.locationOne + " marikina, Philippines"
                    }
                    locationTwo={
                        Formik.values.locationTwo + " marikina, Philippines"
                    }
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
