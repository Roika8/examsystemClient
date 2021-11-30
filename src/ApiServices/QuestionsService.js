import axios from 'axios';
import config from '../ApiConfig.json';
const addQuestion = async (question) => {
    try {
        return await axios.post(`${config.questionPath}/addQuestion`, question);
    }
    catch (e) {
        console.log(e);
    }
}
const getAllQuestionsByTopicID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionsByTopicID/${id}`)).data;
        return data;
    }
    catch (e) {
        console.log(e.message);
    }
}
const getAnswersByQuestionID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionAnswers/${id}`)).data;
        return data;
    }
    catch (e) {
        console.log(e);
    }
}
const getQuestionByID = async (id) => {
    try {
        const data = (await axios.get(`${config.questionPath}/getQuestionByID/${id}`)).data;
        return data[0];
    }
    catch (e) {
        console.log(e);
    }
}
const editQuestion = async (id) => {

}
export default { addQuestion, getAllQuestionsByTopicID, getAnswersByQuestionID, editQuestion,getQuestionByID };