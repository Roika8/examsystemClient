import React from 'react'
import { Link } from 'react-router-dom';
const SearchTestReport = () => {
    return (
        <div>
            <Link to={"/reports/tests/15"}> Test report</Link>
        </div>
    )
}

export default SearchTestReport;