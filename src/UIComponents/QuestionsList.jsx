import React, { useEffect, useState } from 'react'

//Packages
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
//Style
import './QuestionsList.css';
//Components
import QuestionPreview from './QuestionPreview';
import CreateQuestion from '../PagesComponents/Questions/CreateQuestion';
//Services
import questionsService from '../ApiServices/questionsService';
const QuestionsList = ({ questionsList, topicID }) => {
    console.log(questionsList);
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);

    const [isHorizontal, setIsHorizontal] = useState(true);
    const [title, setTitle] = useState("");
    const [textBelowQuestion, setTextBelowQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState("");
    const [ID, setID] = useState(-1);
    const [lastChange, setLastChange] = useState();

    const [rowSelected, setRowSelected] = useState(false);
    //Load data rows
    useEffect(() => {
        const rowsFromData = [];
        questionsList && questionsList.length > 0 &&
            questionsList.map(question => {
                const rowObject =
                {
                    id: question.ID,
                    'ID': question.ID,
                    'Question Title and Tags': [question.tags, question.title],
                    'Last change': question.lastChange,
                    'Question Type': question.isSingleChoice ? 'Singel' : 'Muilti',
                    '# Of tests': 'לעבוד על השאילתה'
                }
                rowsFromData.push(rowObject);
            });
        setRows(rowsFromData);

    }, [questionsList])


    //Get answers of selected question
    useEffect(() => {
        const getAnswers = async () => {
            const res = ID !== -1 ? await questionsService.getAnswersByQuestionID(ID) : [];
            setAnswers(res);
        }
        getAnswers();
    }, [ID])

    const clickedCell = (params) => {
        switch (params.field) {
            case 'Delete':
                break;
            case 'Show':
                setOpenAnswerPreview(!openAnswerPreview);
                break;
            case 'Edit':
                { history.push(`/questions/edit/${topicID}/${params.id}`); }
                break;
            default:
                console.log('Error in the clicked cell value or name');
                prompt('Error in the clicked cell value or name');
                break;
        }


    }

    //Define the columns
    const columns = [
        { field: 'ID', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Question Title and Tags', minWidth: 300, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <div className="questionTagsTitle">
                        <div className="title" >
                            {parse(params.value[1])}
                        </div>
                        <div className="tags">
                            {params.value[0]}
                        </div>
                    </div>
                );
            }
        },
        { field: 'Last change', minWidth: 250, headerAlign: 'center', align: 'center' },
        { field: 'Question Type', minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: '# Of tests', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Show', minWidth: 150, headerAlign: 'center', align: 'center', renderCell: () => {
                return (
                    <React.Fragment>
                        <Button className="childBtn" variant="contained" color="secondary">
                            Show
                        </Button>
                    </React.Fragment >
                );
            }
        },
        {
            field: 'Delete', minWidth: 150, headerAlign: 'center', align: 'center', renderCell: () => {
                return (
                    <React.Fragment>
                        <Button className="childBtn" variant="contained" color="warning" disabled={true}>
                            Delete
                        </Button>
                    </React.Fragment >
                );
            }
        },
        {
            field: 'Edit', minWidth: 150, headerAlign: 'center', align: 'center', renderCell: () => {
                return (
                    <React.Fragment>
                        <Button className="childBtn" variant="contained" color="success">
                            Edit
                        </Button>
                    </React.Fragment >
                );
            }
        },
    ];

    return (
        <div className="dataGrid">
            <DataGrid
                rows={rows}
                columns={columns}

                //Get the selected answers Props
                onSelectionModelChange={questionID => {
                    questionID = questionID[0];
                    const foundQuestion = questionsList.filter(element => element.ID === questionID)[0];
                    setID(foundQuestion.ID);
                    setTitle(foundQuestion.title);
                    setTextBelowQuestion(foundQuestion.textBelowTitle);
                    setTags(foundQuestion.tags);
                    setIsHorizontal(foundQuestion.isHorizontal);
                    setLastChange(foundQuestion.lastChange);
                    setRowSelected(true);
                }}
                onCellClick={clickedCell} />
            {
                <QuestionPreview
                    isDialogOpened={openAnswerPreview}
                    handleCloseDialog={() => setOpenAnswerPreview(false)}
                    questionText={title}
                    textBelowQuestion={textBelowQuestion}
                    answers={answers}
                    tags={tags}
                    isHorizontal={isHorizontal}
                    questionID={ID}
                    lastChange={lastChange} />
            }

        </div>
    );
}

export default QuestionsList;
