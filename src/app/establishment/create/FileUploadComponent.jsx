import React, { useState, useRef } from "react";
import useFirebase from "@/hooks/useFirebase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Skeleton from "@mui/material/Skeleton";
export default function FileUploadComponent({ formik }) {
    const fileInput = useRef(null);
    const [loadingImages, setLoadingImages] = useState(0);
    const { uploadFile } = useFirebase();

    const handleUpload = async (e) => {
        let uploadedFiles = [];
        const files = e.target.files;
        setLoadingImages(loadingImages + files.length);

        try {
            for (let i = 0; i < files.length; i++) {
                const file = await uploadFile(files[i], "establisment_images");
                if (file) uploadedFiles.push(file);
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
        setLoadingImages(0); // Decrement loading state per file
        let updatedImages = [
            ...(formik.values.picture || []),
            ...uploadedFiles,
        ];
        formik.setFieldValue("picture", updatedImages); // Update Formik state with the new images
        console.log("Images uploaded:", uploadedFiles);
        e.target.value = null; // Reset the input after handling the files
    };

    return (
        <>
            <input
                type="file"
                style={{
                    display: "none",
                }}
                ref={fileInput}
                onChange={handleUpload}
                multiple
                accept="image/*"
            />
            <Box
                display="grid"
                gridTemplateColumns={"repeat(auto-fill, minmax(200px, 1fr))"}
                sx={{ marginTop: "20px", gap: "20px" }}
            >
                {formik.values.picture.length > 0 &&
                    formik.values.picture.map((image, index) => (
                        <Paper
                            elevation={2}
                            key={index}
                            sx={{
                                aspectRatio: "9/7",
                                borderRadius: "10px",
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></Paper>
                    ))}

                {loadingImages > 0 &&
                    Array.from({ length: loadingImages }).map((_, index) => (
                        <Skeleton
                            key={index}
                            animation="wave"
                            delay={index * 0.3}
                            variant="rectangular"
                            sx={{
                                borderRadius: "10px",
                                aspectRatio: "9/7",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    ))}

                <Paper
                    variant="elevation"
                    elevation={2}
                    sx={{
                        aspectRatio: "9/7",
                        cursor: "pointer",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px",
                        opacity: ".5",
                        ":hover": {
                            opacity: "1",
                        },
                        transition: "opacity .3s",
                    }}
                    onClick={() => fileInput.current.click()}
                >
                    <UploadFileIcon sx={{ fontSize: "40px", opacity: ".7" }} />
                    <Typography variant="body1" color="initial">
                        Click here to upload image
                    </Typography>
                </Paper>
            </Box>
        </>
    );
}
