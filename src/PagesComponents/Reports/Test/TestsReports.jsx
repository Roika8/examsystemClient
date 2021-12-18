import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import reportService from '../../../ApiServices/reportService';
import './TestsReports.css';
import StudentsDataGrid from '../../../UIComponents/Reports/TestReports/StudentsDataGrid';
import QuestionsDataGrid from '../../../UIComponents/Reports/TestReports/QuestionsDataGrid';
import testService from '../../../ApiServices/testService';

const TestsReports = () => {
    const { testID, fromDate, toDate } = useParams();
    const [studentsData, setStudentsData] = useState([]);
    const [questionsData, setQuestionsData] = useState([]);
    const [test, setTest] = useState();

    useEffect(() => {
        const getStudentsReport = async () => {
            const res = await reportService.getTestReportByDates(testID, fromDate, toDate);
            setStudentsData(res);
        }
        const getQuestionsReport = async () => {
            const res = await reportService.getQuestionsReport(testID, fromDate, toDate);
            setQuestionsData(res);
        }
        const getTest = async () => {
            const res = await testService.getTestByID(testID);
            setTest(res);
        }
        getStudentsReport();
        getQuestionsReport();
        getTest();
    }, [])



    return (
        <div>
            <div className="testSummeryContainer">
                Summery
                {testID}
                Test report

                From:   {fromDate}
                To:  {toDate}

            </div>
            <div className="studentsContainer">
                {studentsData.length > 0 ?
                    <StudentsDataGrid studentsData={studentsData} test={test} />
                    :
                    <div>Load students data</div>
                }
            </div>
            <div className="questionsStatisticsContainer">
                {questionsData.length > 0 ?
                    <QuestionsDataGrid questionsData={questionsData} />
                    :
                    <div>Load question data</div>
                }
            </div>
        </div>
    )
}
export default TestsReports;
