import React, { useState, useEffect } from 'react'
//Packages
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Style
import { List, Button, ListItem, FormControlLabel, Checkbox } from '@mui/material';
import './AnswersSelection.css';
const AnswersSelection = ({ singleChoice,selectedAnswers, existAnswers }) => {
    const [answers, setAnswers] = useState([]);

    //Init answers
    useEffect(() => {
        let answersArray = [];
        //Already have answers (Edit mode)
        if (existAnswers !== undefined) {
            existAnswers.map(ans => {
                answersArray.push({ content: ans.content, correct: ans.correct });
            })
        }
        //New fields (Create mode)
        else {
            answersArray = new Array(4).fill({ content: '', correct: false });
        }
        setAnswers(answersArray);
    }, [])

    //Disable all correct answers checked when changing to single choice
    useEffect(() => {
        if (singleChoice && answers.filter(ans => ans.correct === true).length > 1) {
            let answersArray = [...answers];
            answersArray.map(ans => ans.correct = false);
            setAnswers(answersArray);
        }
    }, [singleChoice])


    const removeAnswer = (index) => {
        //Bug here if content is not empty
        const answersArray = [...answers];
        const newarray = answersArray.filter((ans, ansIndex) => ansIndex !== index);
        console.log(newarray);
        selectedAnswers(newarray);
        setAnswers(newarray);
    }

    const editAnswer = (editor, index) => {
        const data = editor.getData();
        let answersArray = [...answers];
        let ans = { ...answersArray[index] };
        ans.content = data;
        //If answer is empty, uncheck the correct
        ans.correct = data.trim() === '' && false;
        answersArray[index] = ans;
        selectedAnswers(answersArray);
        setAnswers(answersArray);
    }
    //Validate single answer can have only 1 correct
    //answer and can be correct if field is not empty
    const correctAnswerHandler = (event, index) => {
        let answersArray = [...answers];
        let selectedAnswer = { ...answersArray[index] };
        //Empty answers get removed correct
        if (selectedAnswer.content.trim() === '') {
            selectedAnswer.correct = false;
        }
        //Cannot check more then 1 correct answer if single choice
        else if (singleChoice && answersArray.filter(e => e.correct === true).length > 0) {
            selectedAnswer.correct = false;
        }
        else {
            selectedAnswer.correct = !selectedAnswer.correct;
        }
        answersArray[index] = selectedAnswer;
        selectedAnswers(answersArray);
        setAnswers(answersArray);
    }
    const addAnswer = () => {
        const answersArray = [...answers];
        answersArray.push({ content: '', correct: false });
        setAnswers(answersArray);
        selectedAnswers(answersArray);
    }

    return (
        <>
            <span className="answersHeader">Possible answers</span>
            <List>
                {answers && answers.map((value, index) => (
                    <ListItem key={index} disableGutters>
                        <div className="answerBlock">
                            <span>Answer {index + 1}:</span>
                            <CKEditor editor={ClassicEditor}
                                config={{
                                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                                }}
                                data={answers[index].content}
                                onChange={(event, editor) => {
                                    editAnswer(editor, index);
                                }}
                                maxWidth={'200px'}
                            />
                            <div className="answerOptions">
                                <Button color="error" onClick={() => removeAnswer(index)}>Remove</Button>
                                <FormControlLabel className="checkBox" control={<Checkbox color="success" checked={answers[index].correct} />} label="Correct" onChange={(e) => { correctAnswerHandler(e, index) }} />
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
            <Button onClick={() => addAnswer()}>Add answer</Button>
        </>
    )
}
export default AnswersSelection;
