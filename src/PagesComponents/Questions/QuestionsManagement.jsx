import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import parse from 'html-react-parser';
//Design
import { Button, TextField, Alert } from '@mui/material';
//Components
import QuestionsList from '../../UIComponents/Questions/QuestionsList';
//Services
import questionsService from '../../ApiServices/questionsService'
//Style
import '../../StyleSheet/ManagementDisplay.css';
import ErrorPage from '../ErrorPages/ErrorPage';
const QuestionsManagement = ({ inCreateTest, existTestQuestions, setSelectedQuestionsIDs }) => {
    let { topicID } = useParams();
    const [test] = useState(inCreateTest ? true : false)
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [error, setError] = useState({ isError: false, message: '' });
    useEffect(() => {
        const getQuestions = async () => {
            try {
                const allQuestions = await questionsService.getAllQuestionsByTopicID(topicID);
                setAllQuestions(allQuestions);
                setFilteredQuestions(allQuestions);

            }
            catch (e) {
                console.log(e);
                setError({ isError: true, message: e.message });
            }

        }
        getQuestions();
    }, [])



    const handleQuestionsFilter = (value) => {
        let namesFilter = [];
        let tagsFilter = [];
        namesFilter = allQuestions.filter(data => {
            //Get the parsed data
            let parsedTitle = parse(data.title).props.children;
            while (typeof (parsedTitle) === 'object') {
                parsedTitle = parsedTitle.props.children;
            }
            return parsedTitle.toLowerCase().includes(value.toLowerCase())
        }
        );
        tagsFilter = allQuestions.filter(question => {
            const tags = question.tags.split(',');
            if (tags.some(tag => tag.includes(value)))
                return question;
        })
        const filterdResults = [...new Set([...namesFilter, ...tagsFilter])];
        setFilteredQuestions(filterdResults);
        if (!value) setFilteredQuestions(allQuestions);


    }

    return (
        <div>
            {
                error.isError ?
                    <ErrorPage errorMsg={error.message} location={'Questions management'} />
                    :
                    <>
                        <div className="managementHeader">Questions list </div>
                        <div className="searchBar">
                            <TextField onChange={(e) => handleQuestionsFilter(e.target.value)} id="standard-basic" label="Search question by tags or name" variant="standard" className="styleInput" />
                        </div>

                        {
                            filteredQuestions ?
                                <QuestionsList questionsList={filteredQuestions} topicID={topicID} test={test}
                                    existTestQuestions={existTestQuestions}
                                    selectedQuestions={(questionsIds) => { setSelectedQuestionsIDs(questionsIds); }} />
                                : <div className='noDataDisplay'>No questions to display</div>
                        }
                        {
                            !inCreateTest &&
                            < div className="buttons">
                                <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                                <Button className="childBtn" component={Link} to={{ pathname: `/questions/new/${topicID}` }} color="success" variant="contained">New question</Button>
                            </div>
                        }
                    </>
            }
        </div >
    )
}
export default QuestionsManagement;
