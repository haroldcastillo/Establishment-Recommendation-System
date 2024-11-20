import React from "react";
import Container from "@mui/material/Container";
import BaseLayout from "@/layout/baseLayout";
import Paper from "@mui/material/Paper";
function About() {
    return (
        <BaseLayout>
            <div className="max-w-screen-lg mx-auto p-4 mt-10">
                <div className="mt-[1em]">
                    <video
                        src={"/images/vid-1.mp4"}
                        autoPlay
                        loop
                        muted
                        style={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "auto",
                            marginBottom: "1em",
                        }}
                    />
                    <h5 className="text-[25px] font-semibold opacity-90 mb-2">
                        Welcome to Marikina City
                    </h5>
                    <p className="text-justify">
                        Nestled in the heart of Metro Manila, Marikina City is a
                        vibrant and dynamic city known for its rich cultural
                        heritage, booming shoe industry, and commitment to
                        cleanliness and environmental sustainability. Often
                        referred to as the &quot; Shoe Capital of the
                        Philippines,&quot; Marikina has transformed from a
                        quiet, agricultural town into a bustling urban center
                        that seamlessly blends tradition with modernity.
                    </p>
                </div>
                <div>
                    <h5 className="text-[25px] font-semibold opacity-90 mb-2">
                        A Legacy of Quality and Craftsmanship
                    </h5>
                    <p className="text-justify">
                        Nestled in the heart of Metro Manila, Marikina City is a
                        vibrant and dynamic city known for its rich cultural
                        heritage, booming shoe industry, and commitment to
                        cleanliness and environmental sustainability. Often
                        referred to as the &quot; Shoe Capital of the
                        Philippines,&quot; Marikina has transformed from a
                        quiet, agricultural town into a bustling urban center
                        that seamlessly blends tradition with modernity.
                    </p>
                </div>
                <div>
                    <h5 className="text-[25px] font-semibold opacity-90 mb-2">
                        Cultural Heritage and Festivities
                    </h5>
                    <p className="text-justify">
                        Nestled in the heart of Metro Manila, Marikina City is a
                        vibrant and dynamic city known for its rich cultural
                        heritage, booming shoe industry, and commitment to
                        cleanliness and environmental sustainability. Often
                        referred to as the &quot; Shoe Capital of the
                        Philippines,&quot; Marikina has transformed from a
                        quiet, agricultural town into a bustling urban center
                        that seamlessly blends tradition with modernity.
                    </p>
                </div>
                <div style={{ display: "flex", marginTop: "1em" }}>
                    <Paper
                        variant="elevation"
                        elevation={3}
                        sx={{
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5em",
                                fontWeight: "bold",
                            }}
                        >
                            Contact Us
                        </h3>
                        <p
                            style={{
                                fontSize: "1em",
                                opacity: "0.8",
                                marginBottom: ".4em",
                            }}
                        >
                            For inquiries, please contact us at:{" "}
                        </p>
                        <strong>atmarikinahelpdesk@gmail.com</strong>
                    </Paper>
                </div>
            </div>
        </BaseLayout>
    );
}

export default About;
