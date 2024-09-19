import React, { useState, useRef } from "react";

export default function FileUploadComponent() {
    const fileInput = useRef(null);

    const handleUploadClick = (e) => {};
    return (
        <>
            <div></div>
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
