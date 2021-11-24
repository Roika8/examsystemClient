import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './QuestionsList.css';
const QuestionsList = () => {

    const rows = [
        { id: 1, 'ID': '1', 'Question Title and Tags': ['טרוויה,ידע כללי', 'בחר שאלה'], 'Last update': new Date().toUTCString(), 'Question Type': 'Multi', '# Of tests': 2 },

    ];

    const columns = [
        { field: 'ID', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Question Title and Tags', minWidth: 300, headerAlign: 'center', align: 'center', renderCell: (params) => {
                return (
                    <div className="questionTagsTitle">
                        <div className="title" >
                            {params.value[1]}
                        </div>
                        <div className="tags">
                            {params.value[0]}
                        </div>
                    </div>
                );
            }
        },
        { field: 'Last update', minWidth: 250, headerAlign: 'center', align: 'center' },
        { field: 'Question Type', minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: '# Of tests', minWidth: 100, headerAlign: 'center', align: 'center' },
        {
            field: 'Actions', minWidth: 500, headerAlign: 'center', align: 'center', renderCell: () => {
                return (
                    <div className="buttons">
                        <Button className="childBtn" variant="contained" color="secondary" onClick={(e) => console.log('click')}>
                            Show
                        </Button>
                        <Button className="childBtn" variant="contained" color="warning" onClick={(e) => console.log('click')}>
                            Delete
                        </Button>
                        <Button className="childBtn" variant="contained" color="success" onClick={(e) => console.log('click')}>
                            Edit
                        </Button>
                    </div>
                );
            }
        },
    ];

    return (
        <div className="dataGrid">
            <DataGrid
                rows={rows}
                columns={columns} />
        </div>
    );
}

export default QuestionsList;
