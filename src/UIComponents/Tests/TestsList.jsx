import React, { useEffect, useState } from 'react'

//Packages
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
//Style
import '../Questions/QuestionsList.css';
import './TestsList.css';
//Services

const TestsList = ({ testsList, topicID, selectedTests }) => {
    const history = useHistory();
    const [rows, setRows] = useState([]);

    //Load data rows
    useEffect(() => {
        const rowsFromData = [];
        testsList && testsList.length > 0 &&
            testsList.map(test => {
                const rowObject =
                {
                    id: test.testID,
                    'Title': test.title,
                    'Number of questions': test.questions.length,
                    'Last change': test.lastChange,
                }
                rowsFromData.push(rowObject);
            });
        setRows(rowsFromData);

    }, [testsList])






    //Define the columns
    const columns = [
        { field: 'Title', minWidth: 200, headerAlign: 'center', align: 'center' },
        { field: 'Last change', minWidth: 120, headerAlign: 'center', align: 'center' },
        { field: 'Number of questions', minWidth: 200, headerAlign: 'center', align: 'center' },
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
        {
            field: 'Test URL', minWidth: 150, headerAlign: 'center', align: 'center', renderCell: () => {
                return (
                    <React.Fragment>
                        <Button className="childBtn" variant="contained" color="primary">
                            Copy URL
                        </Button>
                    </React.Fragment >
                );
            }
        }
    ];

    //Handle question actions
    const clickedCell = (params) => {
        switch (params.field) {
            case 'Edit':
                { history.push(`/tests/edit/${topicID}/${params.id}`); }
                break;
            case 'Test URL':
                navigator.clipboard.writeText(`http://localhost:3000/studentTest/form/${params.id}`)
                break;
            default:
                break;
        }
    }

    return (
        <div className="testsDataContainter">
            <DataGrid rows={rows} columns={columns}
                onCellClick={clickedCell} checkboxSelection={true}
                className='testsData' />
        </div>
    );
}

export default TestsList;
