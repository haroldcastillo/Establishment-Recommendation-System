import React from "react";
import { useRouter } from "next/navigation";
import CardComponent from "@/components/CardComponent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { deleteJourney } from "../../store/apis/journey";

export default function BucketListComponent({
    data,
    index,
    deleteJourneys,
    updateJourneys,
    refresh,
}) {
    const router = useRouter();

    const [bucket, setBucket] = React.useState(data);

    return (
        <div>
            <CardComponent
                id={bucket.establishment._id}
                key={index}
                title={bucket.establishment.name}
                creatorId={bucket.establishment.creatorId}
                img={bucket.establishment.picture[0]}
                description={bucket.establishment.barangay}
                ratingValue={Math.round(bucket.establishment.rating * 10) / 10}
                onClick={() => {
                    router.push(`/establishment/${bucket.establishment._id}`);
                }}
                totalRating={bucket.establishment?.totalReviews}
            />
            <div className="flex justify-between items-center mt-4 mb-2">
                <p>Note</p>
                <Tooltip title="Delete">
                    <IconButton
                        aria-label=""
                        onClick={async () => {
                            await deleteJourney(bucket._id);
                            refresh(bucket._id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <TextField
                id="outlined-multiline-static"
                label=""
                value={bucket.comment}
                onChange={(e) => {
                    setBucket({
                        ...bucket,
                        comment: e.target.value,
                    });
                }}
                onBlur={(e) => {
                    updateJourneys({
                        ...bucket,
                        comment: e.target.value,
                    });
                }}
                multiline
                fullWidth
                rows={4}
            />
        </div>
    );
}
