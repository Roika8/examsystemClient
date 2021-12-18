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
                const rowObject = {
                    id: question.questionID,
                    'Question': parse(question.details.title).props.children,
                    'Number of Submissions': question.numberOfAnswered,
                    '% Answered Correcly': `${question.answeredCorrecly} %`,
                }
                rowsFromData.push(rowObject);
            });
        setStudentsDataRows(rowsFromData);
    }, [])
    const columns = [
        { field: 'Question', minWidth: 130, headerAlign: 'center', align: 'center' },
        { field: 'Number of Submissions', minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: '% Answered Correcly', minWidth: 250, headerAlign: 'center', align: 'center' },
    ];
    const handleCellClick = (params) => {
        console.log(params.id);
        const selectedQuestion = questionsData.filter(question => question.questionID == params.id)[0];
        setSelectedQuestion(selectedQuestion)
    }
    //After ID selected, open dialog
    useEffect(() => {
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
            <DataGrid rows={studentsDataRows} columns={columns}
                onCellClick={handleCellClick} />
            <Dialog open={openAnswerPreview} onClose={() => setOpenAnswerPreview(false)} >
                <DialogContent>
                    <div className='answersContainer'>
                        {
                            selectedQuestion &&
                                selectedQuestion.answersSelection ? selectedQuestion.answersSelection.map((ans, index) => {
                                    return (
                                        <div> {parse(ans.content)} {<LinearProgressWithLabel variant='determinate' value={ans.selectedPercentage} />} </div>
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
