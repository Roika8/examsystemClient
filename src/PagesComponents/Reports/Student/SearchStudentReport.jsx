import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';
//Style
import './SearchStudentReport.css'
import { Button, TextField } from '@mui/material';
//Services
import studentTestService from '../../../ApiServices/studentTestService';
import reportService from '../../../ApiServices/reportService';
//Components
import StudentsTable from '../../../UIComponents/Reports/StudentReports/StudentsTable';
import StudentTestsData from '../../../UIComponents/Reports/StudentReports/StudentTestsData';
const SearchStudentReport = () => {
    const history = useHistory();
    const { topicID } = useParams();
    const [allStudents, setAllStudents] = useState();
    const [filteredStudents, setFilteredStudents] = useState();
    const [selectedStudentEmail, setSelectedStudentEmail] = useState();
    const [selectedStudentData, setSelectedStudentData] = useState();

    useEffect(() => {
        const getAllStudents = async () => {
            const allStudents = await studentTestService.getAllStudents();
            setAllStudents(allStudents)
            setFilteredStudents(allStudents)
        }
        getAllStudents();
    }, [])
    useEffect(() => {
        const getStudentTests = async () => {
            const res = await reportService.getStudentTests(selectedStudentEmail);
            setSelectedStudentData(res);
        }
        getStudentTests();
    }, [selectedStudentEmail])
    const handleStudentFilter = (data) => {
        let firstNameFilter = [];
        let lastNameFilter = [];

        firstNameFilter = allStudents.filter(student => student.firstName.toLowerCase().includes(data.toLowerCase()));
        lastNameFilter = allStudents.filter(student => student.lastName.toLowerCase().includes(data.toLowerCase()));
        const filterdResults = [...new Set([...firstNameFilter, ...lastNameFilter])];
        setFilteredStudents(filterdResults);
        if (!data) {
            setFilteredStudents(allStudents)
        }
    }
    const handleStudentTestData = (testData) => {
        const testStudentData = selectedStudentData.find(data => data.testID == testData.testID);
        history.push({
            pathname: `/reports/testStudentReport/${testStudentData.studentEmail}`,
            state: {
                studentData: testStudentData,
                test: testData
            }
        })
    }
    return (
        <div className='studentsReportContainer'>
            <div className="searchStudent">
                <TextField onChange={(e) => handleStudentFilter(e.target.value)} id="standard-basic" label="Search student by name" variant="standard" className="styleInput" />
            </div>
            <div className='studentsTableContainer'>
                {/* //Get all students */}
                {
                    allStudents ?
                        <StudentsTable studentsList={filteredStudents} selectedStudentEmail={studentEmail => setSelectedStudentEmail(studentEmail)} />
                        :
                        <div>Loading students</div>
                }
                {/* //Get all selected student tests */}
                {
                    selectedStudentData ?
                        <StudentTestsData studentData={selectedStudentData} selectedStudentTest={handleStudentTestData} />
                        :
                        <div>Loading tests</div>
                }

                <Button component={Link} to={{ pathname: `/reports/${topicID}` }} color="warning" variant="contained">Back</Button>
            </div>
        </div>
    )
}
export default SearchStudentReport;