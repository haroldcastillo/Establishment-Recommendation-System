"use client";
import React, { use, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyFavorites } from "@/store/actions/favorite";
import CardComponent from "@/components/CardComponent";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth?.utils?.userId);
    const myFavorites = useSelector(
        (state) => state.favorite?.myFavorites?.data
    );
    useEffect(() => {
        if (userId) {
            dispatch(fetchMyFavorites({ userId }));
        }
    }, [userId]);

    return (
        <div className="mx-auto max-w-screen-lg px-4 pt-[40px] pb-4">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-[20px] font-semibold opacity-80">
                    My Favorites
                </h1>
            </div>
            <hr className="mb-4" />
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                }}
            >
                {myFavorites &&
                    myFavorites?.map((item, index) => (
                        <CardComponent
                            id={item._id}
                            key={index}
                            title={item.name}
                            creatorId={item.creatorId}
                            img={item.picture[0]}
                            description={item.barangay}
                            onClick={() => {
                                router.push(`/establishment/${item._id}`);
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}
