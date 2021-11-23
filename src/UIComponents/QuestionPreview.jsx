import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionPreview.css'
const QuestionPreview = ({ isDialogOpened, handleCloseDialog, questionText, textBelowQuestion, answers, tags, questionID, isHorizontal }) => {
    const [aligenClassName, setAligenClassName] = useState('horizontalAnswers');
    console.log(answers);
    useEffect(() => {
        setAligenClassName(prevState => prevState !== 'verticalAnswers' ? 'verticalAnswers' : 'horizontalAnswers');
    }, [isHorizontal])
    return (
        <div>
            <Dialog className="dialog" fullWidth={true} maxWidth={'md'} open={isDialogOpened} onClose={() => { handleCloseDialog(false) }}>
                <DialogTitle>
                    <div className="wrapper">
                        <div className="first">questionID: <span className="bold">{questionID}</span></div>
                        <div className="second">Last answered: <span className="bold">{new Date().toLocaleTimeString()}</span> </div>
                        <div>Tags: {tags}</div>
                        <div>Last update: {new Date().toLocaleTimeString()}</div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="questionHeader">
                        <div>{parse(questionText)}</div>
                        <div>{parse(textBelowQuestion)}</div>
                    </div>
                    <div className={aligenClassName}>
                        {answers && answers.map(((ans, index) => {
                            return (
                                <div key={index} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'}`}>{parse(ans.content)}</div>
                            )
                        }))}
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}
export default QuestionPreview;
