import React, { useState, useRef } from "react";

import useFirebase from "@/hooks/useFirebase";
export default function FileUploadComponent() {
    const fileInput = useRef(null);
    const { uploadFile } = useFirebase();
    const handleUploadClick = async (e) => {
        const file = await uploadFile(e.target.files[0],"establisment_images");
        console.log(file);
    };
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        fileInput.current.click();
                    }}
                >
                    Upload
                </button>
            </div>
            <input
                type="file"
                style={{
                    display: "none",
                }}
                ref={fileInput}
                onChange={handleUploadClick}
            />
        </>
    );
}
