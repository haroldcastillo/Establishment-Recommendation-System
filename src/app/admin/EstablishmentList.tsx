import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstablishments } from "@/store/actions/establishments";
import EstablishmentFavorites from "./EstablishmentFavorites";
import Button from "@mui/material/Button";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { verifyEstablishment } from "@/store/actions/establishments";

export default function EstablishmentList() {
    const dispatch = useDispatch();
    const establishments = useSelector(
        (state: any) => state.establishments.establishments
    );

    const router = useRouter();
    React.useEffect(() => {
        dispatch(fetchAllEstablishments());
    }, []);

    function establishmentView(id: string) {
        router.push(`/establishment/${id}`);
    }

    if (establishments.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography variant="body1" color="initial">
                Establishment
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"30%"}>Name</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Views</TableCell>
                            <TableCell align="left">Favorties</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {establishments.data.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    onClick={() => {
                                        establishmentView(row._id);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: ".5em",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: "14px",
                                            }}
                                        >
                                            {row.name}
                                        </Typography>
                                        {row.isVerified ? (
                                            <VerifiedIcon
                                                color="primary"
                                                sx={{ width: "20px" }}
                                            />
                                        ) : null}
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    onClick={() => {
                                        establishmentView(row._id);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {row.address}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    onClick={() => {
                                        establishmentView(row._id);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {row.views}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    onClick={() => {
                                        establishmentView(row._id);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <EstablishmentFavorites id={row._id} />
                                </TableCell>
                                <TableCell align="left">
                                    <div
                                        style={{ gap: "1em", display: "flex" }}
                                    >
                                        <Button variant="text" color="primary">
                                            Remove
                                        </Button>
                                        {!row.isVerified && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    dispatch(
                                                        verifyEstablishment(
                                                            row._id
                                                        )
                                                    );
                                                }}
                                            >
                                                Verify
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
