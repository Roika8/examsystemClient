import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import parse from 'html-react-parser';
import { Dialog, DialogContent, LinearProgress, Box, Typography } from '@mui/material';
import './QuestionsDataGrid.css';
const QuestionsDataGrid = ({ questionsData }) => {
    const [studentsDataRows, setStudentsDataRows] = useState([]);
    const [openAnswerPreview, setOpenAnswerPreview] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState();
    //Load data as rows to data grid
    useEffect(() => {
        const rowsFromData = [];
        questionsData && questionsData.length > 0 &&
            questionsData.map(question => {
                //parse the title
                let questionTitle = parse(question.details.title).props.children;
                while (typeof (questionTitle) === 'object') {
                    questionTitle = questionTitle.props.children;
                }
                const rowObject = {
                    id: question.questionID,
                    'Question': questionTitle,
                    'Number of Submissions': question.numberOfAnswered,
                    '% Answered Correcly': `${Math.round(question.answeredCorrecly)} %`,
                }
                rowsFromData.push(rowObject);
            });
        setStudentsDataRows(rowsFromData);
    }, [])
    const columns = [
        { field: 'Question', minWidth: 400, headerAlign: 'center', align: 'center', fontSize: 'bold' },
        { field: 'Number of Submissions', minWidth: 300, headerAlign: 'center', align: 'center' },
        { field: '% Answered Correcly', minWidth: 200, headerAlign: 'center', align: 'center' },
    ];
    const handleCellClick = (params) => {
        console.log(params.id);
        const selectedQuestion = questionsData.filter(question => question.questionID == params.id)[0];
        setSelectedQuestion(selectedQuestion)
    }
    //After ID selected, open dialog
    useEffect(() => {
        console.log(selectedQuestion);
        if (selectedQuestion)
            setOpenAnswerPreview(true);
    }, [selectedQuestion])

    const LinearProgressWithLabel = (props) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    return (
        <>
            <DataGrid pagination pageSize={5} rows={studentsDataRows} columns={columns} onCellClick={handleCellClick} className='questionsData' />
            <Dialog open={openAnswerPreview} onClose={() => setOpenAnswerPreview(false)} >
                <DialogContent>
                    <div className='answersContainer'>
                        {
                            selectedQuestion &&
                                selectedQuestion.answersSelection ? selectedQuestion.answersSelection.map((ans, index) => {
                                    return (
                                        <div key={index} className={`answer ${ans.correct === true ? 'correctAnswer' : 'wrongAnswer'}`}> {parse(ans.content)} {<LinearProgressWithLabel variant='determinate' value={ans.selectedPercentage} />} </div>
                                    )
                                })
                                :
                                <div>Wait</div>
                        }
                    </div>

                </DialogContent>

            </Dialog>
        </>

    )
}
export default QuestionsDataGrid;
