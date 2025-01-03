import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
    checkEstablishmentBucketList,
    addBucketList,
    deleteBucketList,
} from "@/store/apis/bucketlist";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "10px",
};

export default function BucketListComponent({ userId, establishmentId, type }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [description, setDescription] = React.useState("");
    const [bucketlistID, setBucketlistID] = React.useState("");
    const [isInBucketList, setIsInBucketList] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    async function fetchData() {
        const response = await checkEstablishmentBucketList(
            establishmentId,
            type
        );
        if (response.status) {
            setIsInBucketList(true);
            setBucketlistID(response.data);
        } else {
            setIsInBucketList(false);
        }
    }
    React.useEffect(() => {
        fetchData();
    }, [establishmentId, type]);

    const handleAddToBucketList = async () => {
        setLoading(true);
        await addBucketList({ userId, establishmentId, type, description });
        alert("Added to Bucket List");
        handleClose();
        setIsInBucketList(true);
        setLoading(false);
        await fetchData();
        setDescription("");
    };

    return (
        <>
            {!isInBucketList ? (
                <Tooltip title="Add from Bucket List" arrow>
                    <IconButton
                        onClick={async () => {
                            handleOpen();
                            // handleAddToBucketList();
                        }}
                        disabled={loading}
                    >
                        <AddHomeWorkIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip
                    title="Delete to the Bucket List"
                    arrow
                    disabled={loading || !bucketlistID}
                >
                    <IconButton
                        onClick={async () => {
                            handleOpen();
                        }}
                    >
                        <CancelPresentationIcon />
                    </IconButton>
                </Tooltip>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {
                            // eslint-disable-next-line no-nested-ternary
                            isInBucketList
                                ? "Delete from Activities"
                                : "Add to Activities"
                        }
                    </Typography>
                    <Typography id="modal-modal-description">
                        {isInBucketList
                            ? "Are you sure you want to delete this?"
                            : "Add this to see in activities"}
                    </Typography>

                    {!isInBucketList && (
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ mt: 2 }}
                        />
                    )}

                    <Box
                        sx={{
                            mt: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1em",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                            fullWidth
                        >
                            Cancel
                        </Button>
                        {
                            // eslint-disable-next-line no-nested-ternary
                            isInBucketList ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        await deleteBucketList(bucketlistID);
                                        setIsInBucketList(false);
                                        handleClose();
                                    }}
                                    fullWidth
                                >
                                    Delete
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddToBucketList}
                                    fullWidth
                                >
                                    Add
                                </Button>
                            )
                        }
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
