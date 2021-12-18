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
//Services
import questionsService from '../ApiServices/questionsService';
const QuestionsList = ({ questionsList, topicID, test, selectedQuestions, existTestQuestions }) => {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState({});

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

        //Check if on test mode and show test exist questions --bug
        if (existTestQuestions && existTestQuestions.length > 0) {
            handleSelectedQuestions(existTestQuestions)
        }
    }, [questionsList])


    //Handle question actions
    const clickedCell = (params) => {
        switch (params.field) {
            case 'Delete':
                break;
            case 'Show':
                console.log(selectedQuestion);
                setOpenAnswerPreview(!openAnswerPreview);
                break;
            case 'Edit':
                { history.push(`/questions/edit/${topicID}/${params.id}`); }
                break;
            default:
                console.log(params);
                break;
        }
    }

    //Get the selected answers Props
    const handleSelectedQuestions = (questionsIDs) => {
        if (questionsIDs.length !== 0) {
            const questionID = questionsIDs[0];
            const foundQuestion = questionsList.filter(element => element.ID === questionID)[0];
            setSelectedQuestion(foundQuestion);

            //Give to parent component questions IDs
            if (test) {
                selectedQuestions(questionsIDs);
            }
        }
        else {
            selectedQuestions([]);
        }

    }

    //Define the columns
    const columns = [
        { field: 'ID', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Question Title and Tags', minWidth: 200, headerAlign: 'center', align: 'center', renderCell: (params) => {
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
        { field: 'Last change', minWidth: 120, headerAlign: 'center', align: 'center' },
        { field: 'Question Type', minWidth: 120, headerAlign: 'center', align: 'center' },
        { field: '# Of tests', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Show', minWidth: 100, headerAlign: 'center', align: 'center', renderCell: () => {
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
            field: 'Delete', minWidth: 100, headerAlign: 'center', align: 'center', renderCell: () => {
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
            field: 'Edit', minWidth: 100, headerAlign: 'center', align: 'center', renderCell: () => {
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
            <DataGrid rows={rows} columns={columns} selectionModel={existTestQuestions}
                onSelectionModelChange={questionsIDs => { handleSelectedQuestions(questionsIDs); }}
                onCellClick={clickedCell}
                checkboxSelection={test} />
            {
                Object.keys(selectedQuestion).length > 0 &&
                <QuestionPreview question={selectedQuestion}
                    isDialogOpened={openAnswerPreview}
                    handleCloseDialog={() => setOpenAnswerPreview(false)}
                />
            }

        </div>
    );
}

export default QuestionsList;
