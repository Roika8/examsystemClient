import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const ReportsMenu = () => {
    const { topicID } = useParams();

    return (
        <div>
            Reports menu
            <br />
            <div className="buttons">
                <Button className="childBtn" component={Link} to={{ pathname: `/reports/${topicID}/students` }} color="secondary" variant="contained">Reports by student</Button>
                <Button className="childBtn" component={Link} to={{ pathname: `/reports/${topicID}/tests` }} color="secondary" variant="contained">Reports by test</Button>
            </div>

        </div>
    )
}
export default ReportsMenu;
