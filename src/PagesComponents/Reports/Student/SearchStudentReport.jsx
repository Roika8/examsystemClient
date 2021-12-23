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
import topicService from '../../../ApiServices/topicService';
import ErrorPage from '../../ErrorPages/ErrorPage';
const SearchStudentReport = () => {
    const history = useHistory();
    const { topicID } = useParams();
    const [allStudents, setAllStudents] = useState();
    const [filteredStudents, setFilteredStudents] = useState();
    // const [selectedStudentEmail, setSelectedStudentEmail] = useState();
    const [selectedStudentTestData, setSelectedStudentTestData] = useState();
    const [selectedStudentData, setSelectedStudentData] = useState();
    const [error, setError] = useState({ isError: false, message: '' });

    useEffect(() => {
        const getAllStudents = async () => {
            try {
                const allStudents = await studentTestService.getAllStudents();
                setAllStudents(allStudents)
                setFilteredStudents(allStudents)
            }
            catch (e) {
                setError({ isError: true, message: e.message });
            }

        }
        getAllStudents();
    }, [])
    useEffect(() => {
        const getStudentTests = async () => {
            try {
                const res = await reportService.getStudentTests(selectedStudentData.email);
                setSelectedStudentTestData(res);
            }
            catch (e) {
                setError({ isError: true, message: e.message });
            }

        }
        if (selectedStudentData)
            getStudentTests();

        console.log(selectedStudentData);
    }, [selectedStudentData])

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

    const handleStudentTestData = async (testData) => {
        const studentTestData = await reportService.getStudentTestReport(testData.testID, selectedStudentData.email)
        const topicObj = await topicService.getTopicByID(testData.topicID);
        testData.topicName = topicObj.content;
        studentTestData.details = selectedStudentData;
        history.push({
            pathname: `/reports/testStudentReport/${selectedStudentData.email}`,
            state: {
                studentData: studentTestData,
                test: testData
            }
        })
    }
    return (
        <>
            {
                error.isError ?
                    <ErrorPage errorMsg={error.message} location={'Search student report Question'} />
                    :
                    <div className='studentsReportContainer'>
                        <div className="searchStudent">
                            <TextField onChange={(e) => handleStudentFilter(e.target.value)} id="standard-basic" label="Search student by name" variant="standard" className="styleInput" />
                        </div>
                        <div className='studentsTableContainer'>
                            {/* //Get all students */}
                            {
                                allStudents ?
                                    <StudentsTable studentsList={filteredStudents} selectedStudentData={(studentData) => setSelectedStudentData(studentData)} />
                                    :
                                    <div>Loading students</div>
                            }
                        </div>
                        {/* //Get all selected student tests */}
                        {selectedStudentData &&
                            <div className='studentsTableContainer'>
                                <div className='selectedStudentDataContainer'>
                                    <div><strong> Selected student: </strong></div>
                                    <div>First name: <strong>{selectedStudentData.firstName}</strong></div>
                                    <div>Last name: <strong>{selectedStudentData.lastName}</strong></div>
                                </div>
                                <div className='studentTestsDataContainer'>
                                    {
                                        selectedStudentData ?
                                            <StudentTestsData studentTestData={selectedStudentTestData} selectedStudentTest={handleStudentTestData} />
                                            :
                                            <div>Loading tests</div>
                                    }
                                </div>

                            </div>

                        }
                        <div>
                            <Button component={Link} to={{ pathname: `/reports/${topicID}` }} color="warning" variant="contained">Back</Button>
                        </div>
                    </div >
            }
        </>

    )
}
export default SearchStudentReport;