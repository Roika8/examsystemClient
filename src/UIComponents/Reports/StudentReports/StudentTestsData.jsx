import React, { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import testService from '../../../ApiServices/testService';
const StudentTestsData = ({ studentTestData, selectedStudentTest }) => {
    const [testsList, setTestsList] = useState([]);
    //Load all tests data by test ID
    useEffect(async () => {
        if (studentTestData) {
            const tests = [];
            const testMapping = studentTestData.map(async (data) => {
                const testData = await testService.getTestByID(data.testID);
                testData.grade = data.testScore;
                tests.push(testData);
            });
            Promise.all(testMapping).then(() => {
                setTestsList(tests);
            });
        }

    }, [studentTestData])
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Test ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Correct answers</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testsList && testsList.map((testData, index) => {
                            return (
                                <TableRow key={testData.testID} onClick={() => selectedStudentTest(testsList[index])}>
                                    <TableCell>{testData.testID}</TableCell>
                                    <TableCell>{testData.title}</TableCell>
                                    <TableCell>{testData.grade.grade}</TableCell>
                                    <TableCell>{testData.grade.correctAnswersCount}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default StudentTestsData;
