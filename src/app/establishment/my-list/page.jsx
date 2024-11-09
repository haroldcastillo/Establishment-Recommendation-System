"use client";
import React, { useEffect } from "react";
import CardComponent from "@/components/CardComponent";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/navigation";
import {
    fetchOwnedEstablishments,
    RESET_CREATE_ESTABLISHMENT,
} from "@/store/actions/establishments";

function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const establishments = useSelector((state) => state.establishments.owned);
    const user = useSelector((state) => state.auth.utils);

    useEffect(() => {
        if (user) {
            if (user.userId) {
                dispatch(fetchOwnedEstablishments({ userId: user.userId }));
            }
        }
    }, [user]);
    if (establishments.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className=" p-4">
            <div className="max-w-screen-lg mx-auto p-4">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-[20px] font-semibold opacity-80">
                        My Establishments
                    </h1>
                    <Chip
                        label="Add Establishment"
                        onClick={() => {
                            router.push("/establishment/create");
                            dispatch({ type: RESET_CREATE_ESTABLISHMENT }); // Use the imported action type
                        }}
                        variant="outlined"
                        icon={<AddIcon />}
                    />
                </div>
                <hr className="mb-4" />
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                    }}
                >
                    {establishments &&
                        establishments?.data?.map((item, index) => (
                            <CardComponent
                                id={item._id}
                                creatorId={item.creatorId}
                                key={index}
                                title={item.name}
                                img={item.picture[0]}
                                description={item.barangay}
                                onClick={() => {
                                    router.push(`/establishment/${item._id}`);
                                }}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default page;
