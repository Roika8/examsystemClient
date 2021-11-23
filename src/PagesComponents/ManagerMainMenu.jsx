import React from 'react'
import { Link } from 'react-router-dom';

const ManagerMainMenu = () => {
    return (
        <div>
            <Link to={"/questions"}>Manage questions</Link>
            <Link to={"/tests"}>Manage Tests</Link>
            <Link to={"/reports"}>Reports</Link>
        </div>
    )
}
export default ManagerMainMenu;
