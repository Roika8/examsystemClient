import React, { useState, useEffect } from 'react'
import { Pagination, Stack, Button, Typography, Box, Paper, MobileStepper } from '@mui/material';

import './QuestionsStepper.css'
import QuestionInTest from './QuestionInTest';
const QuestionsStepper = ({ questions, isEnglish, setResults, userResults }) => {
    const maxSteps = questions.length;
    const [activeStep, setActiveStep] = useState(0);
    const [correntQuestion, setCorrentQuestion] = useState();
    const [answersSelected, setAnswersSelected] = useState([]);
    const [correntQuestionAnswered, setCorrentQuestionAnswered] = useState();
    //Inilize the first question to the first.
    useEffect(() => {
        // Load first question data
        setCorrentQuestion(questions[0]);
        userResults && setCorrentQuestionAnswered(userResults[0]);
        const selectedAnswersquestions = [];
        questions.map(question => {
            selectedAnswersquestions.push({ questionID: question.ID, selectedAnswers: [] })
        })
        setAnswersSelected(selectedAnswersquestions);
    }, [])

    //Show crrent question by step
    useEffect(() => {
        setCorrentQuestion(questions[activeStep]);
        userResults && setCorrentQuestionAnswered(userResults[activeStep]);
    }, [activeStep])

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
            const questionIndex = answersSelected.findIndex(obj => obj.questionID === correntQuestion.ID);
            const ansSelected = [...answersSelected];
            ansSelected[questionIndex].selectedAnswers = selectedAnswers;
            setAnswersSelected(ansSelected);
        }
    }
    const handleSubmit = () => {
        !userResults && setResults(answersSelected);
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
                                    userSelectedAnswers={correntQuestionAnswered}
                                    isEnglish={true}
                                />
                                :
                                //Show questions mode
                                <QuestionInTest
                                    question={correntQuestion}
                                    index={activeStep + 1}
                                    setAnswers={(selectedAnswers) => handleSelectedAnswers(selectedAnswers)}
                                    isEnglish={isEnglish}
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
                                    <Button size="small" onClick={handleSubmit} variant="contained" color="success">
                                        {isEnglish ? `Submit` : `שלח מבחן`}
                                    </Button>
                                    :
                                    <Button size="small" onClick={handleNext} variant="contained" color="secondary">
                                        {isEnglish ? 'Next' : 'הבא'}
                                    </Button>

                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="warning" variant="contained" >
                                    {isEnglish ? 'Back' : 'הקודם'}
                                </Button>
                            }
                        />
                        <Stack spacing={2}>
                            <Pagination count={10} showFirstButton showLastButton />
                        </Stack>
                    </div>



                </div >
            }

        </>
    )
}
export default QuestionsStepper;
