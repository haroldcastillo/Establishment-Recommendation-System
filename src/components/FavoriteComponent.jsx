"use client";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFavoriteUsers,
    addFavorite,
    removeFavorite,
    fetchMyFavorites,
} from "@/store/actions/favorite";
import { useFormik } from "formik";
export default function FavoriteComponent({ id }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth?.utils?.userId);
    const myFavorites = useSelector((state) => state.favorite?.users?.data);
    const isFavorite = myFavorites?.find((fav) => fav?.establishmentId === id);
    const user = useSelector((state) => state.user.user.data);

    const formik = useFormik({
        initialValues: {
            userId,
            establishmentId: id,
            type: "establishment",
        },
        onSubmit: (values) => {
            if (isFavorite) {
                dispatch(removeFavorite({ id: isFavorite._id }));
            } else {
                dispatch(addFavorite(values));
                dispatch(fetchMyFavorites({ userId }));
                console.warn(values);
            }
        },
    });

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoriteUsers({ userId }));
        }
    }, [userId]);

    if (!userId) {
        return null;
    }
    return (
        <>
            {user.role !== "admin" ? (
                <Tooltip title="Favorite">
                    <IconButton type="submit" onClick={formik.handleSubmit}>
                        {isFavorite ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorderIcon color="error" />
                        )}
                    </IconButton>
                </Tooltip>
            ) : null}
        </>
    );
}
