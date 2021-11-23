import React from 'react'
import { Link } from 'react-router-dom';

const SearchStudentReport = () => {
    return (
        <div>
            Search student report
            <Link to={"/reports/students/12"}>Generate report</Link>
        </div>
    )
}
export default SearchStudentReport;