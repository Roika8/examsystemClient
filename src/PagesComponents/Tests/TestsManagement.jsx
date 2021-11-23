import React from 'react'
import { Link } from 'react-router-dom';

const TestsManagement = () => {
    return (
        <div>
            <Link to={"/tests/new"}>Create Test</Link>
            <div>Tests list   </div>
        </div>
    )
}
export default TestsManagement;