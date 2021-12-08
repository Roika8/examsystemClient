import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

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
    useEffect(() => {
        const getTest = async () => {
            const test = await testService.getTestByID(testID);
            setTest(test);
            console.log(test);
        }
        getTest();
    }, [])
    const handleTestResults = async (testResults) => {
        const testResult = await testService.sumbitTestRusults(testResults, studentEmail, testID)
        setPassTest(testResult.grade > test.passingGrade);
        setGrade(testResult.grade);
        setNumberOfCorrectAnswers(testResult.correctAnswersCount);
        setFinishTest(true);
    }
    return (
        <div>
            Test : {testID}
            {
                test !== undefined ?
                    !finishTest
                        ?
                        <QuestionsStepper questions={test.questions} isEnglish={test.isEnglish} setResults={(testResults => handleTestResults(testResults))} />
                        :
                        <div className='testResults'>
                            {
                                passTest ?
                                    <div>{parse(test.successMessage)}</div>
                                    :
                                    <div>{parse(test.failMessage)}</div>
                            }
                            <span>Correct answers {numberOfCorrectAnswers}/{test.questions.length}</span>
                            <span>Grade: {grade}</span>
                        </div>
                    :
                    <div>LoAD TESTR</div>
            }
        </div>
    )
}
export default Test;