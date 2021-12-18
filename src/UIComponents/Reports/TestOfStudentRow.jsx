import React, { useState } from 'react'
import { TableRow, TableCell, IconButton, Table, TableBody, Collapse, TableHead, Box, Typography } from '@mui/material';
import parse from 'html-react-parser';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const TestOfStudentRow = ({ question, answers }) => {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell> {question.ID}</TableCell>
                <TableCell>{parse(question.title)}</TableCell>
                <TableCell>correct</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                results
                            </Typography>
                            {answers && answers.map(ans => {
                                return (
                                    <div key={ans.ID} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'} ${ans.selected == true ? 'selected' : ''}`}>
                                        {parse(ans.content)}
                                    </div>
                                )
                            })}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default TestOfStudentRow;
