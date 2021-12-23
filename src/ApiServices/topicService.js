import axios from 'axios';
import config from '../ApiConfig.json';

const getTopics = async () => {
    try {
        return await (await axios.get(`${config.topicPath}/getTopics`)).data;
    }
    catch (e) {
        throw new Error(e);

    }
}
const getTopicByID = async (id) => {
    try {
        return await (await axios.get(`${config.topicPath}/getTopic/${id}`)).data;
    }
    catch (e) {
        throw new Error(e);
    }
}
export default { getTopics, getTopicByID };