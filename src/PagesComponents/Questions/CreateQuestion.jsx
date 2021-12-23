import React, { useState, useEffect } from 'react'
//Components
import QuestionPreview from '../../UIComponents/Questions/QuestionPreview';
import AnswersSelection from '../../UIComponents/Questions/AnswersSelection';

//Matarial UI
import { Select, MenuItem, Button, RadioGroup, Radio, FormControlLabel, TextField } from '@mui/material';
import './CreateQuestion.css';
import { useParams } from 'react-router-dom';
//Packages
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useHistory } from 'react-router-dom';

//Services
import topicService from '../../ApiServices/topicService';
import questionsService from '../../ApiServices/questionsService';
import questionsValidator from '../../Validators/questionsValidator';
import ErrorPage from '../ErrorPages/ErrorPage';
const CreateQuestion = () => {
    const history = useHistory();
    const { topicID, questionID } = useParams();
    const [topicName, setTopicName] = useState();
    const [isHorizontal, setIsHorizontal] = useState('true');
    const [isSingleChoice, setIsSingleChoice] = useState(true);
    const [title, setQuestionTitle] = useState("");
    const [textBelowTitle, setTextBelowTitle] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState("");
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);
    const [error, setError] = useState({ isError: false, message: '' });

    //Get the topic name when page is uploading
    useEffect(() => {
        //Load question details if exist
        questionID !== undefined && loadExistQuestion();
        const getTopicName = async () => {
            try {
                const topic = await topicService.getTopicByID(topicID);
                setTopicName(topic.content);
            }
            catch (e) {
                console.log(e);
                setError({ isError: true, message: e.message });
            }
        }

        getTopicName();
    }, [])

    const loadExistQuestion = async () => {
        try {
            const questionData = await questionsService.getQuestionByID(questionID);
            const questionsAnswers = await questionsService.getAnswersByQuestionID(questionID);
            const allQuestionsByTopic = await questionsService.getAllQuestionsByTopicID(topicID);

            //Validate that the question match the topic
            const foundQuestion = allQuestionsByTopic.find(question => question.ID == questionData.ID);
            if (!foundQuestion) throw new Error('Question is not matching the topic')
            setQuestionTitle(questionData.title);
            setTextBelowTitle(questionData.textBelowTitle);
            setIsHorizontal(questionData.isHorizontal);
            setIsSingleChoice(questionData.isSingleChoice);
            setTags(questionData.tags);
            setAnswers(questionsAnswers);
        }
        catch (e) {
            console.log('here');
            setError({ isError: true, message: e.message });
        }
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
        if (!isSingleChoice && !questionsValidator.validateMuiltiAnswersCorrect(answers)) {
            alert("If you checked question type as muiltiple, you need to select more then 1 correct answer");
            return;
        }
        const questionObj = { title, topicID, isSingleChoice, tags, isHorizontal, textBelowTitle, answers }
        try {
            const questionAdded =
                questionID === undefined
                    ? await questionsService.addQuestion(questionObj)
                    : await questionsService.editQuestion(questionObj, questionID);

            if (questionAdded) {
                if (questionID === undefined)
                    alert('Question Added successfully !');
                else
                    alert('Question updated successfully !');

                history.push(`/questions/${topicID}`)
            }
            else alert('Somthing went wrong adding the question ..')

        }
        catch (e) {
            alert(e.message)
        }

    }

    return (

        <>
            {error.isError ?
                <ErrorPage errorMsg={error.message} location={'Edit Question'} />
                :
                <div className="formContainer">
                    <div className="questionHeader">Create new question </div>
                    <div className="header questionTopic">Topic : {topicName} </div>
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
                            onChange={(_, editor) => {
                                const data = editor.getData();
                                setQuestionTitle(data)
                            }}
                        />
                    </div>
                    <div className="inputBlock">
                        <span>Text below title:</span>
                        <CKEditor editor={ClassicEditor}
                            config={{
                                removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                            }}
                            data={textBelowTitle}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setTextBelowTitle(data);
                            }}

                        />
                    </div>
                    {questionID !== undefined
                        ?
                        (answers.length > 0 && < AnswersSelection singleChoice={isSingleChoice} selectedAnswers={(data) => setAnswers(data)} existAnswers={answers} />)
                        :
                        < AnswersSelection singleChoice={isSingleChoice} selectedAnswers={(data) => { setAnswers(data) }} />
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
                        question={{ openAnswerPreview, title, textBelowTitle, answers, tags, isHorizontal }}
                        handleCloseDialog={() => setOpenAnswerPreview(false)}
                    />
                </div >
            }
        </>
    )
}
export default CreateQuestion;
