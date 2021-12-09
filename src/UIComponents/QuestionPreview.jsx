import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionPreview.css';
import '../StyleSheet/AnswersDisplay.css';
const QuestionPreview = ({ question, isDialogOpened, handleCloseDialog }) => {
    console.log(question);
    const [aligenClassName, setAligenClassName] = useState('horizontalAnswers');
    useEffect(() => {
        console.log(question);
        setAligenClassName(prevState => prevState !== 'verticalAnswers' ? 'verticalAnswers' : 'horizontalAnswers');
    }, [question])
    return (
        < >
            <Dialog fullWidth={false} open={isDialogOpened} onClose={() => { handleCloseDialog(false) }}>
                <div className="dialog">
                    <DialogTitle>
                        <div className="questionPropsWrapper">
                            <div id="questionID">Question ID: {question.ID}</div>
                            <div id="questionLastChange">Last Changed: {question.lastChange}  </div>
                            <div id="tags">Tags: {question.tags}</div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="detailsWrapper">
                            <div className="questionHeaders">
                                <div>{parse(question.title)}</div>
                                <div>{parse(question.textBelowTitle)}</div>
                            </div>
                            <div className={`content ${question.isHorizontal==true ? 'showHorizontal' : 'showVertical'}`}>
                                {question.answers && question.answers.map(((ans, index) => {
                                    return (
                                        <div key={index} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'}`}>{parse(ans.content)}</div>
                                    )
                                }))}
                            </div>
                        </div>
                    </DialogContent>

                </div>
            </Dialog>
        </>
    )
}
export default QuestionPreview;
