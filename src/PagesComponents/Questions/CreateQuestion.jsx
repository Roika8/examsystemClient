import React, { useState, useEffect } from 'react'
//Components
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import QuestionPreview from '../../UIComponents/QuestionPreview';
import AnswersSelection from '../../UIComponents/AnswersSelection';

//Matarial UI
import { FormGroup, Select, MenuItem, Button, RadioGroup, Radio, FormControlLabel, TextField } from '@mui/material';
import './CreateQuestion.css';
import { useParams } from 'react-router-dom';
//Packages
import { Link, useHistory } from 'react-router-dom';

//Services
import topicService from '../../ApiServices/topicService';
import questionsService from '../../ApiServices/questionsService';
import questionsValidator from '../../ApiServices/questionsValidator';
const CreateQuestion = () => {
    const history = useHistory();
    const { topicID, questionID } = useParams();
    const [topicName, setTopicName] = useState();
    const [isHorizontal, setIsHorizontal] = useState(true);
    const [isSingleChoice, setIsSingleChoice] = useState(true);
    const [title, setQuestionTitle] = useState("");
    const [textBelowQuestion, setTextBelowQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState("");
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);

    //Get the topic name when page is uploading
    useEffect(() => {
        //Load question details if exist
        if (questionID !== undefined)
            loadExistQuestion();

        const getTopicName = async () => {
            const topic = await topicService.getTopicByID(topicID);
            setTopicName(topic.content);
        }
        getTopicName();
    }, [])
    const loadExistQuestion = async () => {
        const questionData = await questionsService.getQuestionByID(questionID);
        const questionsAnswers = await questionsService.getAnswersByQuestionID(questionID);
        setQuestionTitle(questionData.title);
        setTextBelowQuestion(questionData.textBelowTitle);
        setIsHorizontal(questionData.isHorizontal);
        setIsSingleChoice(questionData.isSingleChoice);
        setTags(questionData.tags);
        setAnswers(questionsAnswers);
    }
    const handleAnswers = (data) => {
        setAnswers(data);
    }
    const submitQuestion = async () => {
        if (!questionsValidator.validateTitle(title)) {
            alert("Your question has to be with title");
            return;
        }
        if (!questionsValidator.validateAnswersContent(answers)) {
            alert("Not all answers have content");
            return;
        }
        if (!questionsValidator.validateAnswersCorrect(answers)) {
            alert("You need to check at least 1 correct answer");
            return;
        }

        const questionAdded = await questionsService.addQuestion({ title, topicID, isSingleChoice, tags, isHorizontal, textBelowQuestion, answers });
        if (questionAdded) {
            alert('Question Added successfully !');
            history.push(`/questions/${topicID}`)
        }
        else alert('Somthing went wrong adding the question ..')

    }
    return (
        <div className="createQuestionContainer">
            <FormGroup>
                <div className="header">Create new question </div>
                <div className="header topic">Topic : {topicName} </div>
                <div className="inputBlock">
                    <span>select question type: </span>
                    <Select value={isSingleChoice} onChange={(e) => { setIsSingleChoice(e.target.value) }}>
                        <MenuItem value={false}>Multiple-choice</MenuItem>
                        <MenuItem value={true}>Single-choice</MenuItem>
                    </Select>
                </div>
                <div className="inputBlock">
                    <span>Enter question title:</span>
                    <CKEditor className="editor" editor={ClassicEditor}
                        config={{
                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                        }}
                        data={title}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setQuestionTitle(data);
                        }}
                    />
                </div>
                <div className="inputBlock">
                    <span>Text below title:</span>
                    <CKEditor editor={ClassicEditor}
                        config={{
                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                        }}
                        data={textBelowQuestion}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setTextBelowQuestion(data);
                        }}

                    />
                </div>
                {questionID !== undefined
                    ?
                    (answers.length > 0 && < AnswersSelection singleChoice={isSingleChoice} answersFromComp={handleAnswers} existAnswers={answers} />)
                    :
                    < AnswersSelection singleChoice={isSingleChoice} answersFromComp={handleAnswers} />
                }
                <div className="fields">
                    <RadioGroup value={isHorizontal} row onChange={(e) => { setIsHorizontal(e.target.value); }}>
                        <FormControlLabel value={true} control={<Radio />} label="Horizontal" />
                        <FormControlLabel value={false} control={<Radio />} label="Vertical" />
                    </RadioGroup>
                </div>
                <div className="fields">
                    <TextField fullWidth label="Tags" variant="outlined" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div className="buttons">
                    <Button className="childBtn" component={Link} to="/questions" variant="contained" color="warning">Back</Button>
                    <Button className="childBtn" variant="contained" color="secondary" onClick={() => { setOpenAnswerPreview(!openAnswerPreview); }}>Show</Button>
                    <Button className="childBtn" color="success" variant="contained" onClick={() => submitQuestion()} >Save</Button>

                </div>

                <QuestionPreview
                    isDialogOpened={openAnswerPreview}
                    handleCloseDialog={() => setOpenAnswerPreview(false)}
                    questionText={title}
                    textBelowQuestion={textBelowQuestion}
                    answers={answers}
                    tags={tags}
                    isHorizontal={isHorizontal} />
            </FormGroup>

        </div >
    )
}
export default CreateQuestion;
