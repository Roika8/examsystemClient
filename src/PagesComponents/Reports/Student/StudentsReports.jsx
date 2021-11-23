import React from 'react'
import { useParams } from 'react-router-dom';

const StudentsReports = () => {
    const {studentTestID}=useParams();
    return (
        <div>
            {studentTestID}
            Student report
        </div>
    )
}
export default StudentsReports;
