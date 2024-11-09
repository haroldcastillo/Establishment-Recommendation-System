"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import FavoritesList from "@/app/landingPageSection/FavoritesList";
import BaseLayout from "@/layout/baseLayout";
import Recommendation from "@/app/landingPageSection/Recommendation";
export default function Home() {
    return (
        <BaseLayout>
            <section className="">
                <div
                    className="min-h-[70vh] relative flex items-center justify-center "
                    style={{
                        background: "url(/images/backDrop.jpg) no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className=" z-[1] text-center flex flex-col items-center">
                        <h1 className="text-[white] text-[70px] font-bold mt-20">
                            @MARIKINA{" "}
                        </h1>
                        <p className="text-[white] text-[30px]">
                            Travel Aid Website
                        </p>
                    </div>
                </div>
                <div
                    className="max-w-screen-xl mx-auto p-4"
                    style={{ display: "flex" }}
                >
                    <Recommendation />
                    <FavoritesList />
                </div>
            </section>
        </BaseLayout>
    );
}
