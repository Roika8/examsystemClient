import React, { useEffect, useState } from 'react'

//Packages
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
//Style
import './QuestionsList.css';

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




    //Handle question actions
    const clickedCell = (params) => {
        switch (params.field) {
            case 'Edit':
                { history.push(`/tests/edit/${topicID}/${params.id}`); }
                break;
            default:
                console.log(params);
                break;
        }
    }


    //Define the columns
    const columns = [
        { field: 'Title', minWidth: 200, headerAlign: 'center', align: 'center' },
        { field: 'Last change', minWidth: 120, headerAlign: 'center', align: 'center' },
        { field: 'Number of questions', minWidth: 150, headerAlign: 'center', align: 'center' },
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
            <DataGrid rows={rows} columns={columns} onCellClick={clickedCell} checkboxSelection={true} />
        </div>
    );
}

export default TestsList;
