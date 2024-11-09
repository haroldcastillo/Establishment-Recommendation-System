"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/store/actions/user";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export default function UserLists() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state?.user?.users);

    React.useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    React.useEffect(() => {
        if (users) {
            console.warn(users);
        }
    }, [users]);

    return (
        <div>
            <Typography variant="body1" color="initial">
                Users
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"30%"}>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Contact Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "1em",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            variant="circular"
                                            src={row.image}
                                            alt={row.name}
                                            sx={{
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        />
                                        {row.name}
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    {row.contactNumber}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
