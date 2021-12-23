import axios from 'axios';
import config from '../ApiConfig.json';
const getTestReportByDates = async (testID, fromDate, toDate) => {
    try {
        return await (await axios.get(`${config.reportPath}/getStudentsReport/${testID}/${fromDate}/${toDate}`)).data;
    }
    catch (e) {
        console.log(e);
    }
}
const getQuestionsReport = async (testID, fromDate, toDate) => {
    try {
        return await (await axios.get(`${config.reportPath}/getQuestionsReport/${testID}/${fromDate}/${toDate}`)).data;
    }
    catch (e) {
        console.log(e);
    }
}
const getStudentTests = async (studentEmail) => {
    try {
        return await (await axios.get(`${config.reportPath}/getStudentTests/${studentEmail}`)).data;
    }
    catch (e) {
        console.log(e);
    }
}
const getStudentTestReport = async (testID, studentEmail) => {
    try {
        return await (await axios.get(`${config.reportPath}/getStudentTestReport/${testID}/${studentEmail}`)).data;
    }
    catch (e) {
        console.log(e);
    }
}

export default { getTestReportByDates, getQuestionsReport, getStudentTests, getStudentTestReport };