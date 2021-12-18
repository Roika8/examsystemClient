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
            console.log(questions);
            setCorrentQuestion(questions[0]);
        }
        //Load answers data
        initSelectedAnswersArray();

        //Load user answers - show mode
        if (userResults) {
            userResults.sort((a, b) => a.questionID - b.questionID);
            console.log(userResults);
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
            const questionIndex = answersSelection.findIndex(obj => obj.questionID === correntQuestion.ID);
            const ansSelected = [...answersSelection];
            ansSelected[questionIndex].selectedAnswers = selectedAnswers;
            setAnswersSelection(ansSelected);
        }
    }
    const handleSubmit = () => {
        !userResults && setResults(answersSelection);
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
                                    isEnglish={true}
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
