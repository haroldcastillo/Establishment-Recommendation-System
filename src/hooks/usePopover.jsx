"use client";
import React, { useState } from "react";
import Popover from "@mui/material/Popover";

export default function usePopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const PopperComponent = ({ children }) => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          onClick: (event) => {
            // Stop the click event from propagating to the parent, preventing the popover from closing
            event.stopPropagation();
          },
        }}
      >
        {children}
      </Popover>
    );
  };

  return { handleClick, handleClose, PopperComponent };
}
