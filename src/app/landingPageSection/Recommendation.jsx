"use client";
import React, { useEffect } from "react";
import LandingSearchInput from "@/components/LandingSearchInput";
import CardComponent from "@/components/CardComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchEstablishments } from "@/store/actions/establishments";
import LandingFilter from "@/components/LandingFilter";
import { useRouter } from "next/navigation";
import { getTotalReviewsByEstablishment } from "@/store/apis/reviews";
export default function Recommendation() {
    const dispatch = useDispatch();
    const establishments = useSelector(
        (state) => state.establishments.recommendations
    );
    const utils = useSelector((state) => state.establishments.utils);
    const router = useRouter();
    useEffect(() => {
        dispatch(
            fetchEstablishments({
                type: utils.type || [],
                barangay: utils.barangay || [],
                search: utils.search || "",
                currentPage: utils.currentPage || 1,
            })
        );
    }, [utils.type, utils.barangay, utils.search, utils.currentPage]);

    if (establishments.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div style={{ flexGrow: "1" }}>
                <div className="flex justify-between items-end mb-5 flex-wrap">
                    <h1 className="text-[20px] font-semibold opacity-80">
                        Recommendations
                    </h1>
                    <div className="flex justify-center gap-2 items-center">
                        <LandingSearchInput />
                        <LandingFilter />
                    </div>
                </div>
                {establishments &&
                establishments.data &&
                establishments.data.length > 0 ? (
                    <div
                        className="grid gap-4"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(250px, 1fr))",
                        }}
                    >
                        {establishments.data.map((item, index) => {
                            return (
                                <CardComponent
                                    id={item._id}
                                    key={index}
                                    title={item.name}
                                    creatorId={item.creatorId}
                                    img={item.picture[0]}
                                    description={item.barangay}
                                    ratingValue={
                                        Math.round(item.rating * 10) / 10
                                    }
                                    onClick={() => {
                                        router.push(
                                            `/establishment/${item._id}`
                                        );
                                    }}
                                    totalRating={item?.totalReviews}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[400px]">
                        No results found.
                    </div>
                )}
            </div>
        </>
    );
}
