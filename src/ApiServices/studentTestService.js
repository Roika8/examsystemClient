import axios from 'axios';
import config from '../ApiConfig.json';

const addStudent = async (student) => {
    try {
        return await axios.post(`${config.studentPath}/addStudent`, student);
    }
    catch (e) {
        console.log(e);
    }
}
export default { addStudent };