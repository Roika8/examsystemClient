import React from 'react';
import './ErrorPage.css';
import { Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorMsg, location }) => {

    return (
        <div className='errorsContainer'>
            <div className="messageShow">
                <Alert severity="error">{errorMsg} at {location}</Alert>
            </div>
            <div className='redirectHome'>
                <Button component={Link} to="/" variant="contained" color="warning">
                    Home
                </Button></div>

        </div>
    )
}
export default ErrorPage;
