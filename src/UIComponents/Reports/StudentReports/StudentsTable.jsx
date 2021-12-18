import React from 'react'
import {  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const StudentsTable = ({studentsList,selectedStudentEmail}) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentsList && studentsList.map((row) => {
                            return (
                                <TableRow key={row.email} onClick={() => selectedStudentEmail(row.email)}>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default StudentsTable;
