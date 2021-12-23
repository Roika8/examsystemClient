import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Select, MenuItem, Button } from '@mui/material';
import './ManagerMainMenu.css'
import topicService from '../ApiServices/topicService';
import ErrorPage from './ErrorPages/ErrorPage';
const ManagerMainMenu = () => {
    const [topics, setTopic] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [error, setError] = useState({ isError: false, message: '' });

    useEffect(() => {
        const getTopics = async () => {
            try {
                const topics = await topicService.getTopics();
                if (topics) {
                    setTopic(topics);
                    setSelectedTopic(topics[0])
                }
            }
            catch (e) {
                setError({ isError: true, message: e.message })
            }
        }
        getTopics();
    }, [])
    return (
        error.isError ?
            <ErrorPage errorMsg={error.message} location={'Main page'} />
            :
            <div className="mainMenuContainer">
                <span className="mainHeader">Management page</span>

                <Select
                    value={selectedTopic}
                    displayEmpty
                    onChange={(e) => { setSelectedTopic(e.target.value); console.log(e.target.value); }}
                >
                    {
                        topics && topics.map((topic) => (
                            <MenuItem key={topic.ID} value={topic}>{topic.content}</MenuItem>
                        ))
                    }

                </Select>
                <div className="buttons">
                    <Button className="childBtn" component={Link} to={{ pathname: `/tests/${selectedTopic.ID}` }} color="secondary" variant="contained">Manage Tests</Button>
                    <Button className="childBtn" component={Link} to={{ pathname: `/questions/${selectedTopic.ID}` }} color="success" variant="contained">Manage questions</Button>
                    <Button className="childBtn" component={Link} to={{ pathname: `/reports/${selectedTopic.ID}` }} color="warning" variant="contained">Reports</Button>
                </div>

            </div >
    )
}
export default ManagerMainMenu;
