import React, { useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";

export default function TextFieldComponent({
    isContactNumber = false,
    label,
    onUpdate,
    initialValue = "",
    disabled = false,
}) {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [value, setValue] = React.useState(initialValue);

    // Update value when initialValue changes
    useEffect(() => {
        if (initialValue !== value) {
            setValue(initialValue);
        }
    }, [initialValue]);

    const handleUpdate = () => {
        if (
            (value !== "",
            value !== initialValue,
            value !== null,
            value !== " ")
        ) {
            onUpdate(value);
        }
    };

    return (
        <>
            <div
                style={{
                    background: "#ececec",
                    borderRadius: "15px",
                    padding: "10px",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: isFocused ? 1 : disabled ? 0.5 : 0.8,
                    transition: "all 0.3s ease-in-out",
                    flexGrow: "1",
                }}
                onClick={() => {
                    if (!disabled) inputRef.current.focus();
                }}
            >
                <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: "12px", fontWeight: "medium" }}
                >
                    {label}
                </Typography>
                <input
                    ref={inputRef}
                    type="text"
                    style={{
                        outline: "none",
                        width: "100%",
                        background: "transparent",
                        cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        handleUpdate(); // Send updated value to Formik
                    }}
                    disabled={disabled}
                    onChange={(e) => {
                        if (isContactNumber) {
                            let value = e.target.value.replace(/\D/g, "");

                            // Ensure the phone number doesn't exceed 11 digits
                            if (value.length > 11) {
                                return;
                            }

                            // Add dashes after every 4 digits (e.g., 0908-265-7587)
                            if (value.length > 3 && value.length <= 7) {
                                value = value.replace(
                                    /(\d{4})(\d{1,3})/,
                                    "$1-$2"
                                );
                            } else if (value.length > 7) {
                                value = value.replace(
                                    /(\d{4})(\d{3})(\d{1,4})/,
                                    "$1-$2-$3"
                                );
                            }
                            setValue(value);
                        } else {
                            let value = e.target.value.replace(
                              /[^a-zA-Z\s]/g,
                              ""
                            ); // Remove any non-letter characters (including numbers), but allow spaces
                            setValue(value);
                        }
                    }}
                    value={value}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (value) {
                                handleUpdate();
                            }
                            inputRef.current.blur(); // Blur the input after the update
                        }
                    }}
                />
            </div>
        </>
    );
}
