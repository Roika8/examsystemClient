import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import QuestionsList from '../../UIComponents/QuestionsList';
import './QuestionsManagement.css'
const QuestionsManagement = () => {
    return (
        <div>
            <div>Questions list </div>

            <QuestionsList />
            <div className="buttons">
                <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                <Button className="childBtn" component={Link} to="/questions/new/math" color="success" variant="contained">New question</Button>

            </div>
        </div>
    )
}
export default QuestionsManagement;
