import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { List, Button, ListItem, FormControlLabel, Checkbox } from '@mui/material';

import './AnswersSelection.css';
const AnswersSelection = ({ questionID, singleChoice, answersFromComp }) => {
    const [answers, setAnswers] = useState(new Array(4).fill({ content: '', correct: false }));

    //Disable all checked correct answers if single choice is selected
    useEffect(() => {
        if (singleChoice && answers.filter(ans => ans.correct === true).length > 1) {
            console.log('here');
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
        answersFromComp(newarray);
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
        answersFromComp(answersArray);
        setAnswers(answersArray);
    }
    //Validate single answer can have only 1 correct
    //answer and can be correct if field is not empty
    const correctAnswerHandler = (event, index) => {
        let answersArray = [...answers];
        let selectedAnswer = { ...answersArray[index] };
        if (selectedAnswer.content.trim() === '') {
            selectedAnswer.correct = false;
        }
        else if (singleChoice && answersArray.filter(e => e.correct === true).length > 0) {
            selectedAnswer.correct = false;
        }
        else {
            selectedAnswer.correct = !answersArray.correct;
        }
        answersArray[index] = selectedAnswer;
        answersFromComp(answersArray);
        setAnswers(answersArray);
    }
    const addAnswer = () => {
        const answersArray = [...answers];
        answersArray.push({ content: '', correct: false });
        setAnswers(answersArray);
        answersFromComp(answersArray);
    }

    return (
        <React.Fragment>
            <span className="answersHeader">Possible answers</span>
            <List>
                {answers && answers.map((value, index) => (
                    <ListItem key={index} disableGutters>
                        <div className="inputBlock">
                            <span>Answer {index + 1}:</span>
                            <CKEditor editor={ClassicEditor}
                                config={{
                                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                                }}
                                data={answers[index].content}
                                onChange={(event, editor) => {
                                    editAnswer(editor, index);
                                }}
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
        </React.Fragment>
    )
}
export default AnswersSelection;
