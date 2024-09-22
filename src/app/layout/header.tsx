"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Avatar, MenuItem, Divider, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/actions/auth";
import usePopover from "@/hooks/usePopover";
import { fetchUserLogin } from "@/store/actions/user";

export default function Header() {
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.auth.utils.userId);
    const { handleClick, PopperComponent, handleClose } = usePopover();
    const router = useRouter();

    const user = useSelector((state: any) => state.user.user.data);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserLogin(userId));
        }
    }, [userId]);

    return (
        <div className="fixed top-0 w-[100vw] z-[40] h-[70px]">
            <div className="bg-[#ADD8E6] px-4 py-3 flex justify-between items-center  pr-7">
                <div className="w-[400px]">
                    <Link href={"/"}>
                        <Image
                            src={"/images/Websitelogo.png"}
                            alt="logo"
                            width={150}
                            height={150}
                        />
                    </Link>
                </div>

                <div className=" gap-4 translate-x-[-60px] hidden sm:flex">
                    <NavLink label="About" location="/about" />
                    <NavLink label="News" location="/news" />
                    <NavLink label="Contact" location="/contact" />
                </div>
                <div className="flex gap-2 items-center">
                    {userId ? (
                        <>
                            <p className="hidden sm:block">{user.name}</p>
                            <IconButton aria-label="" onClick={handleClick}>
                                <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    src={user.image}
                                    alt={user.name}
                                />
                            </IconButton>
                            <PopperComponent>
                                <div className="w-[100vw] max-w-[250px] mb-2">
                                    <div>
                                        {user && (
                                            <Box
                                                sx={{
                                                    cursor: "pointer",
                                                    ":hover": {
                                                        backgroundColor:
                                                            "#ADD8E6",
                                                    },
                                                    p: 2,
                                                }}
                                                onClick={() => {
                                                    router.push("/profile");
                                                    handleClose();
                                                }}
                                            >
                                                <p className="text-[14px] font-semibold">
                                                    {user.name}
                                                </p>
                                                <p
                                                    className="text-[14px] opacity-85 "
                                                    style={{
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {user.email}
                                                </p>
                                            </Box>
                                        )}
                                    </div>
                                    <div className="sm:hidden">
                                        <Divider
                                            variant="fullWidth"
                                            orientation="horizontal"
                                            className="mb-2"
                                        />
                                        <MenuItem
                                            onClick={() => {
                                                router.push("/about");
                                            }}
                                        >
                                            About
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                router.push("/news");
                                            }}
                                        >
                                            News
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                router.push("/contact");
                                            }}
                                        >
                                            Contact
                                        </MenuItem>
                                    </div>
                                    <Divider
                                        variant="fullWidth"
                                        orientation="horizontal"
                                        className="mb-2"
                                    />
                                    <MenuItem
                                        onClick={() => {
                                            router.push("/my-favorites");
                                        }}
                                    >
                                        My Favorites
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            router.push(
                                                "/establishment/my-list"
                                            );
                                        }}
                                    >
                                        My Establisments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(logoutUser());
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </div>
                            </PopperComponent>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => {
                                    router.push("/login");
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    router.push("/signup");
                                }}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {/* {openSearch && <div className='bg-[#ADD8E6] p-4 flex justify-center items-center gap-4 pr-7'>
        <input type="text" placeholder="Search..." className='bg-[white] outline-none w-full p-2 rounded-lg'/>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </div>} */}
        </div>
    );
}
function NavLink({ label, location }: { label: string; location: string }) {
    return (
        <>
            <Link href={location}>
                <p className="text-[14px] opacity-85 hover:opacity-100">
                    {label}
                </p>
            </Link>
        </>
    );
}
