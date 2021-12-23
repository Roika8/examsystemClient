import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import reportService from '../../../ApiServices/reportService';
import './TestsReports.css';
import StudentsDataGrid from '../../../UIComponents/Reports/TestReports/StudentsDataGrid';
import QuestionsDataGrid from '../../../UIComponents/Reports/TestReports/QuestionsDataGrid';

//Service
import testService from '../../../ApiServices/testService';
import topicService from '../../../ApiServices/topicService';
import ErrorPage from '../../ErrorPages/ErrorPage';
const TestsReports = () => {
    const { testID, fromDate, toDate, topicID } = useParams();
    const [studentsData, setStudentsData] = useState([]);
    const [questionsData, setQuestionsData] = useState([]);
    const [test, setTest] = useState();
    const [error, setError] = useState({ isError: false, message: '' });

    useEffect(() => {
        const getStudentsReport = async () => {
            try {
                const res = await reportService.getTestReportByDates(testID, fromDate, toDate);
                setStudentsData(res);
            }
            catch (e) {
                setError({ isError: true, message: e.message });
            }

        }
        const getQuestionsReport = async () => {
            try {
                const res = await reportService.getQuestionsReport(testID, fromDate, toDate);
                setQuestionsData(res);
            }
            catch (e) {
                setError({ isError: true, message: e.message });

            }

        }
        const getTest = async () => {
            try {
                const testDetails = await testService.getTestByID(testID);
                const topic = await topicService.getTopicByID(topicID);
                testDetails.topicName = topic.content;
                setTest(testDetails);
            }
            catch (e) {
                setError({ isError: true, message: e.message });

            }

        }

        getStudentsReport();
        getQuestionsReport();
        getTest();
    }, [])



    return (
        <>
            {
                error.isError ?
                    <ErrorPage errorMsg={error.message} location={'Test report'} />
                    :
                    <>
                        <div className="testSummeryContainer">
                            {
                                test ?
                                    <>
                                        <div>Title:  <strong>{test.title}</strong></div>
                                        <div>Test ID: <strong>{test.testID}</strong></div>
                                        <div>Number of questions: <strong>{test.questions.length}</strong></div>
                                        <div>Passing grade: <strong>{test.passingGrade}</strong></div>
                                        <div>Topic: <strong>{test.topicName}</strong></div>
                                        <div>Average grade: <strong>{Math.round(test.gradeAverage)}</strong></div>
                                        <div>From date: <strong>{fromDate}</strong></div>
                                        <div>To date: <strong>{toDate}</strong></div>
                                        <div>Number of submissions:<strong> {test.submissions}</strong></div>
                                    </>
                                    :
                                    <div>Load data</div>
                            }
                        </div>
                        <div className="dataGridsContainer">
                            <div className="testDataContainer">
                                <div className='containerHeader'>Students list </div>
                                {studentsData && studentsData.length > 0 ?
                                    <StudentsDataGrid studentsData={studentsData} test={test} />
                                    :
                                    <div>Load students data</div>
                                }
                            </div>
                            <div className="testDataContainer">
                                <div className='containerHeader'>Questions list </div>
                                {questionsData && questionsData.length > 0 ?
                                    <QuestionsDataGrid questionsData={questionsData} />
                                    :
                                    <div>Load question data</div>
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
export default TestsReports;
