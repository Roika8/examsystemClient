import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import './TestStudentData.css'
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import TestOfStudentRow from '../Reports/TestOfStudentRow';

const TestStudentData = () => {
    const { studentData } = useLocation().state;
    const { test } = useLocation().state;
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
                questionsAnswerArrayObj.push({ question, modifiedAnswers });
            }
            setModifiedQuestion(questionsAnswerArrayObj);
        }
    }, [])

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
            <Table >
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
        </div >
    )
}

export default TestStudentData;