"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    maxHeight: "400px",
    maxWidth: "700px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function ImagesEstablishment({ images }) {
    const [activeImage, setActiveImage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleClick = (num) => {
        setActiveImage(num);
        setOpen(!open);
    };
    if (!images) {
        return "loading...";
    }

    return (
        <>
            <div className="flex min-h-[350px] overflow-hidden rounded-xl gap-2 relative">
                <div
                    className="grow scale-100 hover:scale-[102%] cursor-pointer"
                    style={{
                        backgroundImage: `url(${images[0]})`,
                        backgroundSize: "cover",
                        transition: "all .3s ease-in-out",
                    }}
                    onClick={() => {
                        handleClick(0);
                    }}
                />
                <div
                    className="w-[300px] hidden md:grid gap-2"
                    style={{ gridTemplateRows: "1fr 1fr" }}
                >
                    <div
                        className="scale-100 hover:scale-[102%] cursor-pointer"
                        style={{
                            backgroundImage: `url(${images[1]})`,
                            backgroundSize: "cover",
                            transition: "all .3s ease-in-out",
                        }}
                        onClick={() => {
                            handleClick(1);
                        }}
                    />
                    <div
                        className="scale-100 hover:scale-[102%] cursor-pointer"
                        style={{
                            backgroundImage: `url(${images[2]})`,
                            backgroundSize: "cover",
                            transition: "all .3s ease-in-out",
                        }}
                        onClick={() => {
                            handleClick(2);
                        }}
                    />
                </div>
                <div
                    className="absolute bottom-[10px] right-[10px] py-2 px-4 rounded-md opacity-60 hover:opacity-100 scale-100 hover:scale-105 bg-[black]/70 text-[white] cursor-pointer"
                    style={{ transition: "all .3s ease-in-out" }}
                    onClick={() => {
                        handleClick(0);
                    }}
                >
                    {images.length} Photos
                </div>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ outline: "none" }}
                >
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4  w-[100vw] h-[100vh] max-h-[400px]  max-w-[800px] flex justify-center items-center outline-none">
                        <IconButton
                            aria-label=""
                            onClick={() => {
                                if (activeImage > 0) {
                                    setActiveImage(activeImage - 1);
                                } else {
                                    setActiveImage(images.length - 1);
                                }
                            }}
                        >
                            <div className="flex justify-center items-center w-[40px] h-[40px] bg-[white] rounded-full">
                                <NavigateBeforeIcon />
                            </div>
                        </IconButton>
                        <div className="bg-[white] rounded-xl grow h-[100%] p-2">
                            <div
                                className="h-[100%] w-[100%] rounded-lg"
                                style={{
                                    backgroundImage: `url(${images[activeImage]})`,
                                    backgroundSize: "cover",
                                }}
                            />
                        </div>
                        <IconButton
                            aria-label=""
                            onClick={() => {
                                if (activeImage < images.length - 1) {
                                    setActiveImage(activeImage + 1);
                                } else {
                                    setActiveImage(0);
                                }
                            }}
                        >
                            <div className="flex justify-center items-center w-[40px] h-[40px] bg-[white] rounded-full">
                                <NavigateNextIcon />
                            </div>
                        </IconButton>
                    </div>
                </Modal>
            </div>
        </>
    );
}
