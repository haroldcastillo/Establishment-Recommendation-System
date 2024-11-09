"use client";
import React from "react";
import { getFavoritesEstablishment } from "@/store/apis/favorite";
export default function EstablishmentFavorites({ id }: { id: string }) {
    const [favorites, setFavorites] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            const response = await getFavoritesEstablishment(id);
            setFavorites(response.data);
        }
        fetchData();
    }, [id]);
    return <div>{favorites.length}</div>;
}
