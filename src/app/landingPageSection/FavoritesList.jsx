import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyFavorites } from "@/store/actions/favorite";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function FavoritesList() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth?.utils?.userId);
    const myFavorites = useSelector(
        (state) => state.favorite?.myFavorites?.data
    );
    React.useEffect(() => {
        if (userId) {
            dispatch(fetchMyFavorites({ userId }));
        }
    }, [userId]);
    return (
        <>
            {myFavorites.length > 0 && (
                <Box
                    sx={{
                        width: "300px",
                        px: 2,
                        ml: 4,
                        borderLeft: "1px solid rgba(0,0,0,0.1)",
                    }}
                >
                    <h1 className="text-[20px] font-semibold opacity-80 mb-4">
                        My Favorites
                    </h1>
                    {myFavorites?.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                border: "1px solid rgba(0,0,0,0.1)",
                                padding: ".5em",
                                borderRadius: "12px",
                                cursor: "pointer",
                                "&:hover": {
                                    background: "rgba(0,0,0,0.1)",
                                },
                            }}
                            onClick={() => {
                                router.push(`/establishment/${item._id}`);
                            }}
                        >
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2">
                                {item.barangay}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
}
