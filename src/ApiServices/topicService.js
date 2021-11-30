import axios from 'axios';
import config from '../ApiConfig.json';

const getTopics = async () => {
    try {
        return await (await axios.get(`${config.topicPath}/getTopics`)).data;
    }
    catch (e) {
        console.log(e);
    }
}
const getTopicByID = async (id) => {
    try {
        return await (await axios.get(`${config.topicPath}/getTopic/${id}`)).data;
    }
    catch (e) {
        console.log(e);
        return { ID: -1, content: 'invalid topic ID' };
    }
}
export default { getTopics, getTopicByID };