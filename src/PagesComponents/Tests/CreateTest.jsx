import React, { useEffect, useState } from 'react'
//Components
import QuestionsList from '../../UIComponents/Questions/QuestionsList';
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
import testValidator from '../../Validators/testValidator';
import QuestionsManagement from '../Questions/QuestionsManagement';
import ErrorPage from '../ErrorPages/ErrorPage';
const CreateTest = () => {

    const history = useHistory();
    const { topicID, existTestID } = useParams();

    const [testID] = useState(existTestID === undefined ? uuidv4() : existTestID);
    const [topicName, setTopicName] = useState();
    //Test props
    const [isEnglish, setIsEnglish] = useState(false);
    const [title, setTitle] = useState('');
    const [testStarter, setTestStarter] = useState('');
    const [passingGrade, setPassingGrade] = useState(55);
    const [showResults, setShowResults] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [qustionsOptions, setQuestionsOptions] = useState([]);
    const [selectedQuestionsIDs, setSelectedQuestionsIDs] = useState([]);
    const [error, setError] = useState({ isError: false, message: '' });

    useEffect(() => {
        if (existTestID !== undefined) {

            const getExistTest = async () => {
                try {
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
                        console.log(idsArray);
                        setSelectedQuestionsIDs(idsArray)
                    }
                }
                catch (e) {
                    setError({ isError: true, message: e.message });
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
        try {
            existTestID ? await testService.editTest(testObj) : await testService.addTest(testObj);
            alert("Test added successfully");
            history.push(`/tests/${topicID}`)

        }
        catch (e) {
            alert(e.message);
        }

    }
    return (
        <>
            {
                error.isError ?
                    <ErrorPage errorMsg={error.message} location={'Edit test'} />
                    :
                    <div className="formContainer">
                        <div className="testHeader">Create new Test </div>
                        <div className="header testTopic">Topic : {topicName} </div>
                        <div className="header id">Test ID: {testID}</div>

                        <div className="inputBlock">
                            <div>select question language: </div>
                            <div className='selectLanguage'>
                                <Select value={isEnglish} onChange={(e) => { setIsEnglish(e.target.value) }}>
                                    <MenuItem value={true}>English</MenuItem>
                                    <MenuItem value={false}>עברית</MenuItem>
                                </Select>
                            </div>

                        </div>
                        <div className='inputBlock' >
                            <TextField
                                fullWidth
                                label="Title"
                                variant="filled"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                inputProps={{ maxLength: 200 }}
                            />
                        </div>
                        <div className="inputBlock grade">
                            <TextField
                                label="Passing Grade"
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
                                    minWidth: 500,
                                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "BlockQuote", "Table", "Heading"]
                                }}
                                data={successMessage}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setSuccessMessage(data);
                                }}
                                style={{ maxWidth: '400px' }}
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
                            <QuestionsManagement inCreateTest={true} existTestQuestions={selectedQuestionsIDs}
                                setSelectedQuestionsIDs={(questionsIds) => { setSelectedQuestionsIDs(questionsIds) }} />
                            {/* <QuestionsList topicID={topicID} questionsList={qustionsOptions} test={true} existTestQuestions={selectedQuestionsIDs}
                    selectedQuestions={(questionsIds) => { setSelectedQuestionsIDs(questionsIds); }} /> */}
                        </div>
                        <div className="buttons">
                            <Button className="childBtn" component={Link} to="/questions" variant="contained" color="warning">Back</Button>
                            <Button className="childBtn" color="success" variant="contained" onClick={() => submitTest()}>Create </Button>
                        </div>
                    </div >
            }
        </>
    )
}
export default CreateTest;