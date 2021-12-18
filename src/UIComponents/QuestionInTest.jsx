import React, { useState, useEffect } from 'react'
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import parse from 'html-react-parser';
import './QuestionInTest.css';
import '../StyleSheet/AnswersDisplay.css';
const QuestionInTest = ({ question, currentSelectedAnswerID, userSelectedAnswers, setAnswers, isEnglish }) => {
    const [answersOfQuestion, setAnswersOfQuestion] = useState()
    //Inilize here the what I selected
    const [selectedAnswersIds, setSelectedAnswersIds] = useState('');


    //Every question showup
    useEffect(() => {
        //Load selected answers on show mode, if not show mode, test mode selected answers
        if (userSelectedAnswers) {
            const modifiedAnswers = modifyAnswersArray(question.answers);
            setAnswersOfQuestion(modifiedAnswers)
        }
        else {
            //Test mode
            //TODO- fix the bug of multi answers (this is now current solution)
            question.isSingleChoice ?
                setSelectedAnswersIds(currentSelectedAnswerID)
                :
                setSelectedAnswersIds([]);
            setAnswersOfQuestion(question.answers)

        }
    }, [question])




    //Give to the parent component the selected answers
    useEffect(() => {
        //Doesnt on show mode
        !userSelectedAnswers &&
            selectedAnswersIds && setAnswers(selectedAnswersIds);
    }, [selectedAnswersIds])

    //Add to array to prop selected
    const modifyAnswersArray = (answersArray) => {
        answersArray.map(ans => {
            ans.selected = false;
        })
        if (Array.isArray(userSelectedAnswers)) {
            userSelectedAnswers.map(userAnswer => {
                answersArray.map(ans => {
                    if (ans.ID == userAnswer)
                        ans.selected = true
                })
            })
        }
        //Single answer
        else {
            answersArray.map(ans => {
                if (ans.ID == userSelectedAnswers) {
                    ans.selected = true
                }
            })

        }
        return answersArray;
    }
    //Handle radio button selection
    const handleSelectedSingleAnswer = (value) => {
        setSelectedAnswersIds(value);
    }

    //Handle checkbox selection
    const handleSelectedMultiAnswer = (answer) => {
        answer.checked
            ?
            setSelectedAnswersIds(prevArray => [...prevArray, answer.value])
            :
            setSelectedAnswersIds(selectedAnswersIds.filter(ansID => ansID != answer.value))
    }
    return (
        <div className='questionContainer'>
            <div className={`questionHeaders ${isEnglish ? 'english' : 'hebrew'}`}>
                <div>{parse(question.title)}</div>
                <div>{parse(question.textBelowTitle)}</div>
            </div>
            <div className={`content ${question.isHorizontal === true ? 'showHorizontal' : 'showVertical'} ${isEnglish ? 'english' : 'hebrew'}`}>
                {
                    answersOfQuestion
                        ?
                        //show results mode
                        userSelectedAnswers
                            ?
                            answersOfQuestion.map(((ans, index) => {
                                return (
                                    <div key={index} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'} ${ans.selected == true ? 'selected' : ''}`}>{parse(ans.content)}</div>
                                )
                            }))


                            //Test mode
                            :
                            //If single choice, radio btn, if multi choice, checkbox
                            question.isSingleChoice
                                ?
                                <RadioGroup value={selectedAnswersIds && selectedAnswersIds} row={question.isHorizontal == true ? true : false}
                                    onChange={(e) => handleSelectedSingleAnswer(e.target.value)}>
                                    {answersOfQuestion.map(((ans, index) => {
                                        return (
                                            <FormControlLabel key={index} value={ans.ID} control={<Radio />}
                                                label={parse(ans.content)}
                                                labelPlacement={isEnglish ? 'end' : 'start'} />
                                        )
                                    }))}
                                </RadioGroup>
                                :
                                answersOfQuestion.map(((ans, index) => {
                                    return (
                                        <div className='answer' key={index}>
                                            <FormControlLabel
                                                defaultValue={true}
                                                label={parse(ans.content)}
                                                value={ans.ID}
                                                control={<Checkbox color="success" />}
                                                onChange={(e) => handleSelectedMultiAnswer(e.target)}
                                                labelPlacement={isEnglish ? 'end' : 'start'}
                                            />
                                        </div>

                                    )
                                }))
                        :
                        <div>Load answers</div>
                }
            </div>
        </div>

    )
}
export default QuestionInTest;
