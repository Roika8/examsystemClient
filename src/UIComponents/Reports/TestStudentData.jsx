import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import './TestStudentData.css'
import { TableRow, TableCell, Table, TableBody, TableHead, TableContainer } from '@mui/material';
import TestOfStudentRow from '../Reports/TestOfStudentRow';

const TestStudentData = () => {
    const { studentData } = useLocation().state;
    const { test } = useLocation().state;
    console.log(useLocation().state);
    const [modifiedQuestions, setModifiedQuestion] = useState([]);
    useEffect(() => {
        if (test && studentData) {
            //Sort the questions and user answers array by ID
            test.questions.sort((a, b) => a.ID - b.ID);
            studentData.testResults.sort((a, b) => a.questionID - b.questionID);
            const questionsAnswerArrayObj = [];

            for (let i = 0; i < test.questions.length; i++) {
                const question = test.questions[i];
                const userAnswers = studentData.testResults[i].selectedAnswers;
                const modifiedAnswers = modifyAnswersArray(question.answers, userAnswers);
                question.correct = isQuestionCorrect(modifiedAnswers)
                questionsAnswerArrayObj.push({ question, modifiedAnswers });
            }
            setModifiedQuestion(questionsAnswerArrayObj);
        }
    }, [])
    const isQuestionCorrect = (answersArray) => {
        let isCorrect = true;
        for (let i = 0; i < answersArray.length; i++) {
            if ((answersArray[i].selected == true && answersArray[i].correct == false)
                || (answersArray[i].selected == false && answersArray[i].correct == true))
                isCorrect = false;
            break;
        }
        return isCorrect
    }
    //Adding state to each answer if the answer were selected
    const modifyAnswersArray = (answersArray, studentResults) => {
        answersArray.map(ans => {
            ans.selected = false;
        })
        if (Array.isArray(studentResults)) {
            studentResults.map(userAnswer => {
                answersArray.map(ans => {
                    if (ans.ID == userAnswer)
                        ans.selected = true
                })
            })
        }
        //Single answer
        else {
            answersArray.map(ans => {
                if (ans.ID == studentResults) {
                    ans.selected = true
                }
            })

        }
        console.log(answersArray);
        return answersArray;
    }
    return (
        <div className='testsDataContainer'>
            <div className='studentHeader'>Test results for: <div className='data'>  {test.title} </div></div>
            <div className='studentSubHeader'>Respondent: <div className='data'>  {studentData.details.firstName} {studentData.details.lastName}</div></div>

            <div className='testStudentContainer'>
                <div className='summeryHeader'>Summary</div>
                <div></div>
                <div>Test Name <strong>{test.title}</strong></div>
                <div>Last submitted: <strong>{studentData.examDate}</strong></div>
                <div>Test ID: <strong>{test.testID}</strong></div>
                <div>Number of questions submitted: <strong>{studentData.numOfQuestionsAnswered}</strong></div>
                <div>Test topic: <strong>{test.topicName}</strong></div>
                <div>Number of correct answers: <strong>{studentData.testScore.correctAnswersCount}</strong></div>
                <div>Number of questions: <strong>{test.questions.length}</strong></div>
                <div>Final grade: <strong>{studentData.testScore.grade}</strong></div>
                <div>Passing grade: <strong>{test.passingGrade}</strong></div>
                <div>Status: <strong>{studentData.testScore.grade > test.passingGrade ? 'Pass' : 'Fail'}</strong></div>

            </div>
            <TableContainer sx={{ maxHeight: 400 }} className='studentsQuestionsContainer'>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Correct</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modifiedQuestions && modifiedQuestions.map((questionAns, index) => (
                            <TestOfStudentRow key={index} question={questionAns.question} answers={questionAns.modifiedAnswers} />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default TestStudentData;