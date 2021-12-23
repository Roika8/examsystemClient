import React, { useState, useEffect } from 'react'
import { Pagination, Stack, Button, MobileStepper } from '@mui/material';

import './QuestionsStepper.css'
import QuestionInTest from './QuestionInTest';
const QuestionsStepper = ({ questions, isEnglish, setResults, userResults }) => {
    const maxSteps = questions.length;
    const [activeStep, setActiveStep] = useState(0);
    const [correntQuestion, setCorrentQuestion] = useState();
    const [answersSelection, setAnswersSelection] = useState([]);
    //User result
    const [userAnswerSelected, setUserAnswerSelected] = useState();
    //Inilize the first question to the first.
    useEffect(() => {
        // Load first question data
        if (questions.length > 0) {
            questions.sort((a, b) => a.ID - b.ID);
            setCorrentQuestion(questions[0]);
        }
        //Load answers data
        initSelectedAnswersArray();

        //Load user answers - show mode
        if (userResults) {
            userResults.sort((a, b) => a.questionID - b.questionID);
            setUserAnswerSelected(userResults[0]);
        }
    }, [])

    //Show current question by step
    useEffect(() => {
        setCorrentQuestion(questions[activeStep]);
        //Show results- show mode
        userResults && setUserAnswerSelected(userResults[activeStep]);
    }, [activeStep])

    //Load answers data
    const initSelectedAnswersArray = () => {
        const selectedAnswersquestions = [];
        questions.map(question => {
            selectedAnswersquestions.push({ questionID: question.ID, selectedAnswers: [] })
        })
        setAnswersSelection(selectedAnswersquestions);
    }


    //Go forward
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    //Go back
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //Save answers of each question
    const handleSelectedAnswers = (selectedAnswers) => {
        if (selectedAnswers.length > 0) {
            let filteredSelectedAnswers;
            if (Array.isArray(selectedAnswers)) {
                filteredSelectedAnswers = getSelectedAnswerToByQuestion(correntQuestion, selectedAnswers);
            }
            else {
                filteredSelectedAnswers = correntQuestion.answers.filter(ans => ans.ID == selectedAnswers)[0].ID;
                console.log(filteredSelectedAnswers);
            }
            const questionIndex = answersSelection.findIndex(obj => obj.questionID === correntQuestion.ID);
            const ansSelected = [...answersSelection];
            ansSelected[questionIndex].selectedAnswers = filteredSelectedAnswers;
            console.log(ansSelected[questionIndex]);
            setAnswersSelection(ansSelected);
        }
    }
    const getSelectedAnswerToByQuestion = (correntQuestion, selectedAnswers) => {
        //Get the answers ID of the question
        const answersOfQuestionIDsArray = correntQuestion.answers.map(ans => { return ans.ID.toString() });
        //Filter the selected answers by the question answer
        return selectedAnswers.filter(ansID => answersOfQuestionIDsArray.includes(ansID.toString()));
    }
    const handleSubmit = () => {
        if(isEnglish){
            if (window.confirm('Are you sure you want to sumbit the test?'))
            !userResults && setResults(answersSelection);
        }
        else{
            if (window.confirm('את בטוח שאתה רוצה לשלוח את המבחן?'))
            !userResults && setResults(answersSelection);
        }

    }

    return (
        <>
            {
                <div className='testContainer'>
                    <div className='questionIndex'>
                        {isEnglish ? `Questions # ${activeStep + 1}` : `שאלה # ${activeStep + 1}`}
                    </div>
                    {
                        correntQuestion ?
                            //Show results mode
                            userResults
                                ?
                                <QuestionInTest
                                    question={correntQuestion}
                                    index={activeStep + 1}
                                    userSelectedAnswers={userAnswerSelected.selectedAnswers}
                                    isEnglish={isEnglish}
                                />
                                :
                                //Show questions mode
                                <QuestionInTest
                                    question={correntQuestion}
                                    index={activeStep + 1}
                                    setAnswers={(selectedAnswers) => handleSelectedAnswers(selectedAnswers)}
                                    isEnglish={isEnglish}
                                    currentSelectedAnswerID={answersSelection.filter(ans => ans.questionID == correntQuestion.ID)[0].selectedAnswers}
                                />
                            :
                            <div>Loading</div>
                    }
                    <div className='testNavigation'>
                        <MobileStepper
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                activeStep === maxSteps - 1 ?
                                    <Button disabled={userResults !== undefined} size="small" onClick={handleSubmit} variant="contained" color="success">
                                        {isEnglish ? `Submit` : `שלח מבחן`}
                                    </Button>
                                    :
                                    <Button disabled={activeStep === maxSteps} size="small" onClick={handleNext} variant="contained" color="secondary">
                                        {isEnglish ? 'Next' : 'הבא'}
                                    </Button>

                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="warning" variant="contained" >
                                    {isEnglish ? 'Back' : 'הקודם'}
                                </Button>
                            }
                        />
                        <div className="paginationContainer">
                            <Pagination count={maxSteps} onChange={(_, val) => { setActiveStep(val - 1); }}
                                color="primary" size="large"
                                showFirstButton showLastButton page={activeStep-1} />
                        </div>
                    </div>
                </div >
            }

        </>
    )
}
export default QuestionsStepper;
