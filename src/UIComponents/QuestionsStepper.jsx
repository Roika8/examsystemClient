import React, { useState, useEffect } from 'react'
import { Pagination, Stack, Button, Typography, Box, Paper, MobileStepper } from '@mui/material';

import './QuestionsStepper.css'
import QuestionInTest from './QuestionInTest';
const QuestionsStepper = ({ questions, isEnglish, setResults }) => {
    const maxSteps = questions.length;
    const [activeStep, setActiveStep] = useState(0);
    const [correntQuestion, setCorrentQuestion] = useState();
    const [answersSelected, setAnswersSelected] = useState([]);

    //Inilize the first question to the first.
    useEffect(() => {
        setCorrentQuestion(questions[0])
        const selectedAnswersquestions = [];
        questions.map(question => {
            selectedAnswersquestions.push({ questionID: question.ID, selectedAnswers: [] })
        })
        setAnswersSelected(selectedAnswersquestions);
    }, [])

    //Show crrent questin by step
    useEffect(() => {
        setCorrentQuestion(questions[activeStep])
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
        setResults(answersSelected)
    }
    return (
        <>
            {
                <div className='testContainer'>
                    Question #{activeStep + 1}
                    {correntQuestion && <QuestionInTest question={correntQuestion} index={activeStep + 1} setAnswers={(selectedAnswers) => handleSelectedAnswers(selectedAnswers)} />}
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            activeStep === maxSteps - 1 ?
                                <Button size="small" onClick={handleSubmit} variant="contained" color="success">
                                    Submit
                                </Button>
                                :
                                <Button size="small" onClick={handleNext} variant="contained" color="secondary">
                                    Next
                                </Button>

                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="warning" variant="contained" >
                                Back
                            </Button>
                        }
                    />
                    <Stack spacing={2}>
                        <Pagination count={10} showFirstButton showLastButton />
                    </Stack>


                </div >
            }

        </>
    )
}
export default QuestionsStepper;
