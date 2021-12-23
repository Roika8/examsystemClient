import axios from 'axios';
import config from '../ApiConfig.json';
const addTest = async (test) => {
    try {
        return await axios.post(`${config.testPath}/addTest`, test);
    }
    catch (e) {
        throw new Error(e);
    }
}
const getAllTestsByTopic = async (topicID) => {
    try {
        const data = await (await axios.get(`${config.testPath}/getAllTestsByTopic/${topicID}`)).data;
        return data;
    }
    catch (e) {
        throw new Error(e);
    }
}
const getTestByID = async (testID) => {
    try {
        const data = await (await axios.get(`${config.testPath}/getTestByID/${testID}`)).data;
        console.log(data);
        return data;
    }
    catch (e) {
        throw new Error(e);
    }
}
const editTest = async (test) => {
    try {
        return await axios.put(`${config.testPath}/editTest`, test);

    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
const sumbitTestRusults = async (testResults, studentEmail, testID) => {
    try {
        console.log(testResults);
        const testResult = await (await axios.post(`${config.testPath}/submitTest/${testID}/${studentEmail}`, testResults)).data;
        return testResult;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export default { addTest, getAllTestsByTopic, getTestByID, editTest, sumbitTestRusults };