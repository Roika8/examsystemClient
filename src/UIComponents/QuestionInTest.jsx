import React, { useState, useEffect } from 'react'
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionInTest.css'
const QuestionInTest = ({ question, selectedAnswersIDs, setAnswers }) => {
    const [aligenClassName, setAligenClassName] = useState('horizontalAnswers');
    const [aligenAnswers] = useState(question.isHorizontal);
    //Inilize here the what i selected
    const [selectedAnswersIds, setSelectedAnswersIds] = useState([]);


    //Every question showup
    useEffect(() => {
        setAligenClassName(prevState => prevState !== 'verticalAnswers' ? 'verticalAnswers' : 'horizontalAnswers');
        setSelectedAnswersIds([])
    }, [question])


    //Give to the parent component the selected answers
    useEffect(() => {
        selectedAnswersIds && setAnswers(selectedAnswersIds);
    }, [selectedAnswersIds])

    //Handle radio button selection
    const handleSelectedSingleAnswer = (value) => {
        setSelectedAnswersIds(value);
    }

    //Handle checkbox selection
    const handleSelectedMultiAnswer = (answer) => {
        answer.checked ?
            setSelectedAnswersIds(prevArray => [...prevArray, answer.value]) :
            setSelectedAnswersIds(selectedAnswersIds.filter(ansID => ansID != answer.value))
    }
    return (
        <div className='questionContainer'>
            <div >
                <div>
                    <div className="questionHeader">
                        <div>{parse(question.title)}</div>
                        <div>{parse(question.textBelowTitle)}</div>
                    </div>
                    {
                        /* //Change the horizonal option */
                        //If single choice, radio btn, if muilt choice, checkbox
                        question.isSingleChoice
                            ?
                            <RadioGroup value={selectedAnswersIds} row={true} onChange={(e) => handleSelectedSingleAnswer(e.target.value)}>
                                {question.answers && question.answers.map(((ans, index) => {
                                    return (
                                        <FormControlLabel key={index} value={ans.ID} control={<Radio />}
                                            label={parse(ans.content)} />
                                    )
                                }))}
                            </RadioGroup>
                            :
                            question.answers && question.answers.map(((ans, index) => {
                                return (
                                    <FormControlLabel value={ans.ID} control={<Checkbox color="success" />} label={parse(ans.content)}
                                        onChange={(e) => handleSelectedMultiAnswer(e.target)} />
                                )
                            }))
                    }


                </div>
            </div>
        </div>
    )
}
export default QuestionInTest;
