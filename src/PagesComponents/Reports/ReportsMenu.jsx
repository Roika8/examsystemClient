import React from 'react'
import { Link } from 'react-router-dom';

const ReportsMenu = () => {
    return (
        <div>
            Reports menu
            <br />

            <Link to={"/reports/students"}>  Students report</Link>
            <Link to={"reports/tests"}>  Tests report</Link>
        </div>
    )
}
export default ReportsMenu;
