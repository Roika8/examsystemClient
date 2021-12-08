import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import parse from 'html-react-parser';
//Design
import { Button, TextField } from '@mui/material';
//Components
import QuestionsList from '../../UIComponents/QuestionsList';
//Services
import questionsService from '../../ApiServices/questionsService';
import './QuestionsManagement.css'

const QuestionsManagement = () => {
    let { topicID } = useParams();
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
            const allQuestions = await questionsService.getAllQuestionsByTopicID(topicID);
            setAllQuestions(allQuestions);
            setFilteredQuestions(allQuestions);
        }
        getQuestions();
    }, [])



    const handleQuestionsFilter = (value) => {
        let namesFilter = [];
        let tagsFilter = [];
        namesFilter = allQuestions.filter(data => {
            return parse(data.title).props.children.includes(value);
        });
        tagsFilter = allQuestions.filter(question => {
            const tags = question.tags.split(',');
            return tags.some(tag => tag.includes(value)) && question;
        })
        const filterdResults = [...new Set([...namesFilter, ...tagsFilter])];
        setFilteredQuestions(filterdResults);
        if (!value)
            setFilteredQuestions(allQuestions);

    }

    return (
        <div>
            <div className="managementHeader">Questions list </div>
            <div className="searchBar">
                <TextField onChange={(e) => handleQuestionsFilter(e.target.value)} id="standard-basic" label="Search question by tags or name" variant="standard" className="styleInput" />
            </div>
            {<QuestionsList questionsList={filteredQuestions} topicID={topicID} test={false} />}

            <div className="buttons">
                <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                <Button className="childBtn" component={Link} to={{ pathname: `/questions/new/${topicID}` }} color="success" variant="contained">New question</Button>
            </div>
        </div>
    )
}
export default QuestionsManagement;
