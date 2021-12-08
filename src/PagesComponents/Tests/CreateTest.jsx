import React, { useEffect, useState } from 'react'
//Components
import QuestionsList from '../../UIComponents/QuestionsList';
//Matarial UI
import { FormGroup, FormLabel, Select, MenuItem, Button, RadioGroup, Radio, FormControlLabel, TextField } from '@mui/material';
import './CreateTest.css';
//Packages
import { Link, useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Services
import questionsService from '../../ApiServices/questionsService';
import testService from '../../ApiServices/testService';
import topicService from '../../ApiServices/topicService';
import testValidator from '../../ApiServices/testValidator';
const CreateTest = () => {

    const history = useHistory();
    const { topicID, existTestID } = useParams();

    const [testID] = useState(existTestID === undefined ? uuidv4() : existTestID);
    const [topicName, setTopicName] = useState();
    //Test propslg
    const [isEnglish, setIsEnglish] = useState(false);
    const [title, setTitle] = useState('');
    const [testStarter, setTestStarter] = useState('');
    const [passingGrade, setPassingGrade] = useState(55);
    const [showResults, setShowResults] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [qustionsOptions, setQuestionsOptions] = useState([]);
    const [selectedQuestionsIDs, setSelectedQuestionsIDs] = useState([]);
    useEffect(() => {
        if (existTestID !== undefined) {
            const getExistTest = async () => {
                const test = await testService.getTestByID(testID)
                if (test) {
                    console.log(test);
                    setTitle(test.title);
                    setIsEnglish(test.isEnglish);
                    setTestStarter(test.testStarter);
                    setPassingGrade(test.passingGrade);
                    setShowResults(test.showResults);
                    setSuccessMessage(test.successMessage);
                    setFailMessage(test.failMessage);
                    const testQuestions = test.questions;
                    const idsArray = [];
                    testQuestions.map(question => idsArray.push(question.ID))
                    setSelectedQuestionsIDs(idsArray)
                }
            }
            getExistTest();
        }

        const getQuestionsByTopic = async () => {
            const questionsList = await questionsService.getAllQuestionsByTopicID(topicID);
            setQuestionsOptions(questionsList);
        }
        const getTopicName = async () => {
            const topic = await topicService.getTopicByID(topicID);
            setTopicName(topic.content);
        }

        getTopicName();
        getQuestionsByTopic();
    }, [])


    const submitTest = async () => {
        if (!testValidator.validateTitle(title)) {
            alert("Your question has to be with title");
            return;
        }
        if (!testValidator.validateStarter(testStarter)) {
            alert("Your question has to be with starter");
            return;
        }
        if (!testValidator.validateFailMessage(failMessage)) {
            alert("Your question has to be with fail message");
            return;
        }
        if (!testValidator.validateSuccessMessage(successMessage)) {
            alert("Your question has to be with success message");
            return;
        }
        if (!testValidator.validateSelectedQuestions(selectedQuestionsIDs)) {
            alert("You must select at least 1 question");
            return;
        }

        const testObj = { testID, isEnglish, title, testStarter, passingGrade, showResults, successMessage, failMessage, topicID, selectedQuestionsIDs }
        const res = existTestID ? await testService.editTest(testObj) : await testService.addTest(testObj);
        if (res) {
            alert("Test added successfully");
            history.push(`/tests/${topicID}`)
        }
        else alert("Somthing went wrong adding test");

    }
    return (
        <div className="formContainer">
            <FormGroup>
                <div className="header">Create new Test </div>
                <div className="header topic">Topic : {topicName} </div>
                <div className="header id">Test ID: {testID}</div>

                <div className="inputBlock">
                    <span>select question language: </span>
                    <Select value={isEnglish} onChange={(e) => { setIsEnglish(e.target.value) }}>
                        <MenuItem value={false}>English</MenuItem>
                        <MenuItem value={true}>עברית</MenuItem>
                    </Select>
                </div>
                <div className="inputBlock testTitle">
                    <TextField
                        label="Title"
                        variant="filled"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        inputProps={{ maxLength: 20 }}
                    />
                </div>
                <div className="inputBlock grade">
                    <TextField
                        label="Grade"
                        type="number"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={passingGrade}
                        onChange={(e) => {
                            const val = e.target.value;
                            var isNumber = /^\d+$/.test(val);
                            if (isNumber && val < 100 && val >= 0)
                                setPassingGrade(e.target.value)
                        }}
                    />
                </div>
                <div className="inputBlock">
                    <span>Enter test starter:</span>
                    <CKEditor className="editor" editor={ClassicEditor}
                        config={{
                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                        }}
                        data={testStarter}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log(data);
                            setTestStarter(data);
                        }}
                    />
                </div>
                <div className="inputBlock">
                    <FormLabel >Show results</FormLabel>
                    <RadioGroup row value={showResults} onChange={(e) => setShowResults(e.target.value)}>
                        <FormControlLabel value={true} control={<Radio />} label="Show" />
                        <FormControlLabel value={false} control={<Radio />} label="Hide" />
                    </RadioGroup>
                </div>
                <div className="inputBlock">
                    <span>Enter success message:</span>
                    <CKEditor className="editor" editor={ClassicEditor}
                        config={{
                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                        }}
                        data={successMessage}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setSuccessMessage(data);
                        }}
                    />
                </div>
                <div className="inputBlock">
                    <span>Enter fail message:</span>
                    <CKEditor className="editor" editor={ClassicEditor}
                        config={{
                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                        }}
                        data={failMessage}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFailMessage(data);
                        }}
                    />
                </div>
                <div className="questionsListWrapper">
                    <QuestionsList topicID={topicID} questionsList={qustionsOptions} test={true} existSelectedQuestions={selectedQuestionsIDs}
                        selectedQuestions={(questionsIds) => { setSelectedQuestionsIDs(questionsIds); }} />
                </div>
                <div className="buttons">
                    <Button className="childBtn" component={Link} to="/questions" variant="contained" color="warning">Back</Button>
                    <Button className="childBtn" color="success" variant="contained" onClick={() => submitTest()}>Create </Button>
                </div>
            </FormGroup>

        </div >
    )
}
export default CreateTest;