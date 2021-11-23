import React from 'react'
import { useParams } from 'react-router-dom';

const TestsReports = () => {
    const {testID}=useParams();
    return (
        <div>
            {testID}
            Test report
        </div>
    )
}
export default TestsReports;
