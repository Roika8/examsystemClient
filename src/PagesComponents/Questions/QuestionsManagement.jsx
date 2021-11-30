import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";

//Design
import { Button } from '@mui/material';
//Components
import QuestionsList from '../../UIComponents/QuestionsList';
//Services
import questionsService from '../../ApiServices/questionsService';
import './QuestionsManagement.css'
const QuestionsManagement = () => {
    let { topicID } = useParams();
    const [allQuestions, setAllQuestions] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
            const allQuestions = await questionsService.getAllQuestionsByTopicID(topicID);
            setAllQuestions(allQuestions);
        }
        getQuestions();
    }, [])
    return (
        <div>
            <h1>Questions list </h1>
            {<QuestionsList questionsList={allQuestions} topicID={topicID} />}

            <div className="buttons">
                <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                <Button className="childBtn" component={Link} to={{ pathname: `/questions/new/${topicID}` }} color="success" variant="contained">New question</Button>
            </div>
        </div>
    )
}
export default QuestionsManagement;
