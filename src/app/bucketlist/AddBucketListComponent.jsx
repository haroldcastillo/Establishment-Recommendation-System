import React from "react";
import { createJourney } from "@/store/apis/journey";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useRouter } from "next/navigation";
export default function AddBucketListComponent({ establishmentId, userId }) {
    const router = useRouter();
    async function handleAddToBucketList() {
        const response = await createJourney({
            establishmentId,
            userId,
        });
        if (response.data) {
            alert("Added to Bucket List");
            router.push("/bucketlist");
        } else {
            alert("Failed to add to Bucket List");
        }
    }
    return (
        <Tooltip title="Add to Bucket List">
            <IconButton aria-label="" onClick={handleAddToBucketList}>
                <ChecklistIcon />
            </IconButton>
        </Tooltip>
    );
}
