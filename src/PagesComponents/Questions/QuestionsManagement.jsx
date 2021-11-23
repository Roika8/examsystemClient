import React from 'react'
import { Link } from 'react-router-dom';

const QuestionsManagement = () => {
    return (
        <div>
            <Link to={"/questions/new/math"}>Create Question</Link>
            <div>Questions list </div>
        </div>
    )
}
export default QuestionsManagement;
