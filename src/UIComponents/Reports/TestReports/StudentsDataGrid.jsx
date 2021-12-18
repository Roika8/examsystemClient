import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';

import './StudentsDataGrid.css'
import QuestionsStepper from '../../QuestionsStepper';
import TestStudentData from '../TestStudentData';
const StudentsDataGrid = ({ studentsData, test }) => {
    const history = useHistory();
    const [studentsDataRows, setStudentsDataRows] = useState([]);
    const [openTestDialog, setOpenTestDialog] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();

    //Load data as rows to data grid
    useEffect(() => {
        const rowsFromData = [];
        studentsData && studentsData.length > 0 &&
            studentsData.map(report => {
                const rowObject = {
                    id: report.studentEmail,
                    'Name': `${report.details.firstName} ${report.details.lastName}`,
                    'Exam Date': report.examDate,
                    'Number of questions answered': report.numOfQuestionsAnswered,
                    'Final grade': report.testScore.grade
                }
                rowsFromData.push(rowObject);
            });
        setStudentsDataRows(rowsFromData);
    }, [])
    const columns = [
        { field: 'Name', minWidth: 130, headerAlign: 'center', align: 'center' },
        { field: 'Exam Date', minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'Number of questions answered', minWidth: 250, headerAlign: 'center', align: 'center' },
        { field: 'Final grade', minWidth: 100, headerAlign: 'center', align: 'center' },
    ];
    const handleCellClick = (params) => {
        const selectedStudent = studentsData.filter(student => student.studentEmail == params.id)[0];
        setSelectedStudent(selectedStudent);
    }
    useEffect(() => {
        if (selectedStudent)
            history.push({
                pathname: `/reports/testStudentReport/${selectedStudent.studentEmail}`,
                state: {
                    studentData: selectedStudent,
                    test: test
                }
            })

    }, [selectedStudent])
    return (
        <>
            <DataGrid rows={studentsDataRows} columns={columns} onCellClick={handleCellClick} />
            {/* <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} >
                <DialogContent>
                    <div className='testPreview'>
                        {selectedStudent &&
                            <TestStudentData test={test} userResults={selectedStudent.testResults} props={}/>
                        }
                    </div>
                </DialogContent>

            </Dialog> */}
        </>

    )
}
export default StudentsDataGrid;
