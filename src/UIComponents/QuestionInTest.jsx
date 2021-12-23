import React, { useState, useEffect } from 'react'
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import './QuestionInTest.css';
import '../StyleSheet/AnswersDisplay.css';
import testService from '../ApiServices/testService';
const QuestionInTest = ({ question, currentSelectedAnswerID, userSelectedAnswers, setAnswers, isEnglish }) => {
    const history = useHistory();
    const { testID } = useParams();
    const [answersOfQuestion, setAnswersOfQuestion] = useState()
    //Inilize here the what I selected
    const [selectedAnswersIds, setSelectedAnswersIds] = useState('');


    //Every question showup
    useEffect(() => {
        const isConnected = async () => {
            try {

                await testService.getTestByID(testID);
            }
            catch (e) {
                console.log(testID);

                alert(e.message);
                history.push(`studentTest/form/${testID}`)
            }
        }
        isConnected();
        let modifiedAnswers = modifyAnswersArray(question.answers);
        if (question.isSingleChoice)
            setSelectedAnswersIds(currentSelectedAnswerID)
        else {
            currentSelectedAnswerID = [...new Set(currentSelectedAnswerID)];
            modifiedAnswers = setMultiChoiceSelectedAsnwers(currentSelectedAnswerID, modifiedAnswers);
            setSelectedAnswersIds(currentSelectedAnswerID)
        }
        setAnswersOfQuestion(modifiedAnswers)

    }, [question])

    const setMultiChoiceSelectedAsnwers = (selectedAnswersIDs, answersArray) => {
        let answers = answersArray;
        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < selectedAnswersIDs.length; j++) {
                if (answers[i].ID == selectedAnswersIDs[j]) {
                    answers[i].selected = true;
                    break;
                }
            }
        }
        return answers
    }

    //Set user selected answer/s every question , send the answers to  the question stepper
    useEffect(() => {
        //On test mode
        if (!userSelectedAnswers) {
            selectedAnswersIds && setAnswers(selectedAnswersIds);
        }
    }, [selectedAnswersIds])

    //Add to array to prop selected
    const modifyAnswersArray = (answersArray) => {
        answersArray.map(ans => {
            ans.selected = false;
        })
        //Show mode
        if (userSelectedAnswers) {
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
        }
        return answersArray;
    }
    //Handle radio button selection
    const handleSelectedSingleAnswer = (value) => {
        setSelectedAnswersIds(value);
    }

    //Handle checkbox selection
    const handleSelectedMultiAnswer = (answer) => {
        const answers = [...answersOfQuestion];
        const foundAnsIndex = answers.findIndex(ans => ans.ID == answer.value);
        const selectedAnswers = [...selectedAnswersIds];
        if (answer.checked) {
            selectedAnswers.push(answer.value);
            setSelectedAnswersIds(selectedAnswers)
            answers[foundAnsIndex].selected = true;
        } else {
            const filtredAnswers = selectedAnswers.filter(ansID => ansID != answer.value)
            setSelectedAnswersIds(filtredAnswers)
            answers[foundAnsIndex].selected = false;
        }
        setAnswersOfQuestion(answers);
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
                                    <div key={index}
                                        className=
                                        {`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'} ${ans.selected == true ? 'selected' : ''} ${isEnglish == true ? 'english' : 'hebrew'}`}>
                                        {parse(ans.content)}
                                    </div>
                                )
                            }))
                            //Test mode
                            :
                            //single choice
                            question.isSingleChoice
                                ?
                                <RadioGroup value={selectedAnswersIds && selectedAnswersIds} row={question.isHorizontal == true ? true : false}
                                    onChange={(e) => handleSelectedSingleAnswer(e.target.value)}>
                                    {answersOfQuestion.map(((ans, index) => {
                                        return (
                                            <FormControlLabel key={index} value={ans.ID} control={<Radio />}
                                                label={parse(ans.content)}
                                                labelPlacement={isEnglish ? 'end' : 'start'} className={isEnglish ? 'english' : 'hebrew'} />
                                        )
                                    }))}
                                </RadioGroup>
                                :
                                //multi choice
                                answersOfQuestion.map(((ans, index) => {
                                    return (
                                        <div className='answer' key={index}>
                                            <FormControlLabel
                                                checked={ans.selected}
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
