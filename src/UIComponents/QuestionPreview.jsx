import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionPreview.css'
const QuestionPreview = ({ question, isDialogOpened, handleCloseDialog, lastChange }) => {
    const [aligenClassName, setAligenClassName] = useState('horizontalAnswers');
    useEffect(() => {
        console.log(question);
        setAligenClassName(prevState => prevState !== 'verticalAnswers' ? 'verticalAnswers' : 'horizontalAnswers');
    }, [question])
    return (
        <div>
            <Dialog className="dialog" fullWidth={true} maxWidth={'md'} open={isDialogOpened} onClose={() => { handleCloseDialog(false) }}>

                <DialogTitle>
                    <div className="wrapper">
                        <div className="first">questionID: <span className="bold">{question.ID}</span></div>
                        <div className="second">Last Changed: <span className="bold">{lastChange}</span> </div>
                        <div>Tags: {question.tags}</div>
                        <div>Last update: {new Date().toLocaleTimeString()}</div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="questionHeader">
                        <div>{parse(question.title)}</div>
                        <div>{parse(question.textBelowTitle)}</div>
                    </div>
                    <div className={aligenClassName}>
                        {question.answers ? question.answers.map(((ans, index) => {
                            return (
                                <div key={index} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'}`}>{parse(ans.content)}</div>
                            )
                        })) : <span>s</span>}
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}
export default QuestionPreview;
