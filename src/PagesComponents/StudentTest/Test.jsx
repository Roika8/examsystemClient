import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button } from '@mui/material';

import './Test.css'
//services
import testService from '../../ApiServices/testService';
//Components
import QuestionsStepper from '../../UIComponents/QuestionsStepper';
const Test = () => {
    const { testID, studentEmail } = useParams();
    const [test, setTest] = useState();
    const [passTest, setPassTest] = useState();
    const [finishTest, setFinishTest] = useState(false);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState();
    const [grade, setGrade] = useState();
    const [showTestResults, setShowTestResults] = useState();

    //User answers
    const [userSelectedAnswers, setUserSelectedAnswers] = useState();
    useEffect(() => {
        const getTest = async () => {
            const test = await testService.getTestByID(testID);
            setTest(test);
            console.log(test);
        }
        getTest();
    }, [])
    const handleTestResults = async (testResults) => {
        setUserSelectedAnswers(testResults)
        const testResult = await testService.sumbitTestRusults(testResults, studentEmail, testID)
        setPassTest(testResult.grade > test.passingGrade);
        setGrade(testResult.grade);
        setNumberOfCorrectAnswers(testResult.correctAnswersCount);
        setFinishTest(true);
    }
    return (
        <>
            Test : {testID}
            {
                test !== undefined && !showTestResults
                    ?
                    //Test is loaded and and didnt finish test
                    (!finishTest)
                        ?
                        //Show questions
                        <QuestionsStepper questions={test.questions} isEnglish={test.isEnglish} setResults={(testResults => handleTestResults(testResults))} />
                        :
                        //Show results
                        <div className='testResults'>
                            {
                                passTest ?
                                    <div>{parse(test.successMessage)}</div>
                                    :
                                    <div>{parse(test.failMessage)}</div>
                            }
                            <div>Correct answers {numberOfCorrectAnswers}/{test.questions.length}</div>
                            <div>Grade: {grade}</div>

                            {/* //If test enable show result */}
                            {test.showResults &&
                                <div>
                                    <Button color="success" variant="contained" onClick={() => setShowTestResults(true)}>Show results </Button>
                                </div>
                            }
                        </div>
                    :
                    //Test is finish and see test results
                    showTestResults &&
                    <QuestionsStepper questions={test.questions} isEnglish={test.isEnglish} userResults={userSelectedAnswers} />

            }
        </>
    )
}
export default Test;