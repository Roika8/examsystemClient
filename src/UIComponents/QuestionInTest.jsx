import React, { useState, useEffect } from 'react'
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionInTest.css';
import '../StyleSheet/AnswersDisplay.css';
const QuestionInTest = ({ question, selectedAnswersIDs, userSelectedAnswers, setAnswers, isEnglish }) => {
    // const [aligenClassName, setAligenClassName] = useState();
    const [answersOfQuestion, setAnswersOfQuestion] = useState(question.answers)
    //Inilize here the what i selected
    const [selectedAnswersIds, setSelectedAnswersIds] = useState([]);

    //Every question showup
    useEffect(() => {
        console.log(question.isHorizontal);
        // setAligenClassName(question.isHorizontal ? 'horizontalAnswers' : 'verticalAnswers');
        //Load selected answers on show mode, if not show mode, test mode selected answers
        if (userSelectedAnswers) {
            //Multi answers
            if (Array.isArray(userSelectedAnswers)) {
                userSelectedAnswers.map(userAnswer => {
                    const foundAns = answersOfQuestion.find(ans => ans.ID == userAnswer);
                    foundAns.selected = true;
                })
            }
            //Single answer
            else {
                const foundAns = answersOfQuestion.find(ans => ans.ID == userSelectedAnswers);

            }
        }
        //Test mode
        else {
            setSelectedAnswersIds([])
        }
    }, [question])


    //Give to the parent component the selected answers
    useEffect(() => {
        //Doesnt on show mode
        !userSelectedAnswers &&
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
            <div className={`questionHeader ${isEnglish ? 'english' : 'hebrew'}`}>
                <div>{parse(question.title)}</div>
                <div>{parse(question.textBelowTitle)}</div>
            </div>
            <div className={`questionContent ${question.isHorizontal ? 'showHorizontal' : 'showVertical'} ${isEnglish ? 'english' : 'hebrew'}`}>
                {
                    //show results mode
                    userSelectedAnswers
                        ?
                        question.answers && question.answers.map(((ans, index) => {
                            return (
                                <div key={index} className={`answer  ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'} ${ans.selected && 'selected'}`}>{parse(ans.content)}</div>
                            )
                        }))


                        //Test mode
                        :
                        /* //Change the horizonal option */
                        //If single choice, radio btn, if muilt choice, checkbox
                        question.isSingleChoice
                            ?
                            <RadioGroup value={selectedAnswersIds} row={question.isHorizontal==true ? true : false} onChange={(e) => handleSelectedSingleAnswer(e.target.value)}>
                                {question.answers && question.answers.map(((ans, index) => {
                                    return (
                                        <FormControlLabel key={index} value={ans.ID} control={<Radio />}
                                            label={parse(ans.content)}
                                            labelPlacement={isEnglish ? 'end' : 'start'} />
                                    )
                                }))}
                            </RadioGroup>
                            :
                            question.answers && question.answers.map(((ans, index) => {
                                return (
                                    <div className='answer'>
                                        <FormControlLabel value={ans.ID} control={<Checkbox color="success" />} label={parse(ans.content)}
                                            onChange={(e) => handleSelectedMultiAnswer(e.target)}
                                            labelPlacement={isEnglish ? 'end' : 'start'} />
                                    </div>

                                )
                            }))
                }
            </div>
        </div>

    )
}
export default QuestionInTest;
