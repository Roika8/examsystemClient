import axios from 'axios';
import config from '../ApiConfig.json';
const addQuestion = async (question) => {
    try {
        return await axios.post(`${config.questionPath}/addQuestion`, question);
    }
    catch (e) {
        throw new Error(e.message);
    }
}
const getAllQuestionsByTopicID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionsByTopicID/${id}`)).data;
        return data;
    }
    catch (e) {
        throw new Error(e.message);
    }
}
const getAnswersByQuestionID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionAnswers/${id}`)).data;
        return data;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
const getQuestionByID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionByID/${id}`)).data;
        return data;
    }
    catch (e) {
        throw new Error(e);
    }
}
const editQuestion = async (question, id) => {
    try {
        return await axios.put(`${config.questionPath}/editQuestion/${id}`, question);
    }
    catch (e) {
        console.log(e);
    }
}
export default { addQuestion, getAllQuestionsByTopicID, getAnswersByQuestionID, editQuestion, getQuestionByID };