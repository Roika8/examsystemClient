import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';

import './StudentsDataGrid.css'

const StudentsDataGrid = ({ studentsData, test }) => {
    const history = useHistory();
    const [studentsDataRows, setStudentsDataRows] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState();

    //Load data as rows to data grid
    useEffect(() => {
        const rowsFromData = [];
        studentsData && studentsData.length > 0 &&
            studentsData.map(report => {
                const rowObject = {
                    id: report.studentEmail,
                    'Name': `${report.details.firstName} ${report.details.lastName}`,
                    'Exam Date': new Date(report.examDate).toLocaleDateString(),
                    'Number of questions answered': report.numOfQuestionsAnswered,
                    'Final grade': report.testScore.grade
                }
                rowsFromData.push(rowObject);
            });
        setStudentsDataRows(rowsFromData);
    }, [])
    const columns = [
        { field: 'Name', minWidth: 200, headerAlign: 'center', align: 'center' },
        { field: 'Exam Date', minWidth: 200, headerAlign: 'center', align: 'center' },
        { field: 'Number of questions answered', minWidth: 250, headerAlign: 'center', align: 'center' },
        { field: 'Final grade', minWidth: 200, headerAlign: 'center', align: 'center' },
    ];
    const handleCellClick = (params) => {
        const selectedStudent = studentsData.filter(student => student.studentEmail == params.id)[0];
        setSelectedStudent(selectedStudent);
    }
    useEffect(() => {
        if (selectedStudent) {
            console.log(selectedStudent);
            history.push({
                pathname: `/reports/testStudentReport/${selectedStudent.studentEmail}`,
                state: {
                    studentData: selectedStudent,
                    test: test
                }
            })
        }

    }, [selectedStudent])
    return (
        <>
            <DataGrid   pagination pageSize={5} rows={studentsDataRows} columns={columns} onCellClick={handleCellClick} className='studentsData' />
        </>

    )
}
export default StudentsDataGrid;
