import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ReportsMenu.css';
const ReportsMenu = () => {
    const { topicID } = useParams();
    const history = useHistory();
    return (
        <div className='reportsMenuContainer'>

            <div className='reportsHeader'>
                <div className='iconContainer'>
                    <IconButton aria-label="delete" size={'large'} onClick={() =>history.push('/')}>
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div> Reports menu</div>
            </div>
            <div className='reportButtonsContainer'>
                <div className="reportBtn">
                    <Button className='reportBtn' component={Link} to={{ pathname: `/reports/${topicID}/students` }} color="primary" variant="contained">Reports by student</Button>
                </div>
                <div className="reportBtn">
                    <Button className='reportBtn' component={Link} to={{ pathname: `/reports/${topicID}/tests` }} color="primary" variant="contained">Reports by test</Button>
                </div>
            </div>
        </div>
    )
}
export default ReportsMenu;
