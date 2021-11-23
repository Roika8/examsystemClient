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
import { uuid } from 'uuidv4';

//Services
import QuestionsService from '../../ApiServices/QuestionsService';
const CreateQuestion = () => {
    const { topic } = useParams();
    const [questionID] = useState(uuid());
    const [isHorizontal, setIsHorizontal] = useState(true);
    const [isSingleChoice, setIsSingleChoice] = useState(true);
    const [title, setQuestionTitle] = useState("");
    const [textBelowQuestion, setTextBelowQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState("");
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);

    const handleAnswers = (data) => {
        setAnswers(data);
    }
    const submitQuestion = () => {
        QuestionsService.addQuestion({title,isSingleChoice,tags,isHorizontal,textBelowQuestion,answers});
    }
    return (
        <div className="createQuestionContainer">
            <FormGroup>
                <div className="header">Create new question </div>
                <div className="header topic">Topic : {topic} </div>
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
                    <span>Text below question:</span>
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
                <AnswersSelection singleChoice={isSingleChoice} answersFromComp={handleAnswers} />
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
                    <Button id="childBtn" variant="contained" color="warning">Back</Button>
                    <Button id="childBtn" variant="contained" color="secondary" onClick={() => { setOpenAnswerPreview(!openAnswerPreview); }}>Show</Button>
                    <Button id="childBtn" color="success" variant="contained" onClick={()=>submitQuestion()} >Save</Button>

                </div>

                <QuestionPreview
                    isDialogOpened={openAnswerPreview}
                    handleCloseDialog={() => setOpenAnswerPreview(false)}
                    questionText={title}
                    textBelowQuestion={textBelowQuestion}
                    answers={answers}
                    tags={tags}
                    //Change the question ID
                    questionID={questionID}
                    isHorizontal={isHorizontal} />
            </FormGroup>

        </div >
    )
}
export default CreateQuestion;
