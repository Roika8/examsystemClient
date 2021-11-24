import axios from 'axios';
import config from '../ApiConfig.json';
const addQuestion = async (question) => {
    try {
        console.log(question);
        return await axios.post(`${config.questionPath}/addQuestion`, question);
    }
    catch (e) {
        console.log(e);
    }
}
export default { addQuestion };