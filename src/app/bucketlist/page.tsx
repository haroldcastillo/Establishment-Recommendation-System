"use client";
import React from "react";
import {
    getJourney,
    deleteJourney,
    updateJourney,
} from "../../store/apis/journey";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import BucketListComponent from "./BucketListComponent";
export default function Page() {
    const userId = useSelector((state: any) => state?.auth?.utils.userId);
    const [bucketList, setBucketList] = React.useState([]);
    React.useEffect(() => {
        if (userId) {
            getJourneys();
        }
    }, [userId]);

    async function getJourneys() {
        const response = await getJourney(userId);
        if (response) {
            setBucketList(response);
        }
    }
    React.useEffect(() => {
        console.log("WEWE", bucketList);
    }, [bucketList]);

    async function deleteJourneys(id: string) {
        await deleteJourney(id);
        setBucketList(bucketList.filter((item: any) => item._id !== id));
    }

    async function updateJourneys(data: any) {
        const response = await updateJourney(data);
        if (response) {
            getJourneys();
        }
    }

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" mx-auto max-w-screen-lg px-4 pt-[20px] pb-4 mt-[2em]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-[24px] font-semibold">Bucket List</h1>
            </div>
            <hr className="mb-4" />
            {bucketList.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {bucketList.map((bucket: any, index: number) => (
                            <BucketListComponent
                                key={index}
                                data={bucket}
                                index={index}
                                deleteJourneys={deleteJourneys}
                                updateJourneys={updateJourneys}
                                refresh={(id: any) => {
                                    window.location.reload();
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
