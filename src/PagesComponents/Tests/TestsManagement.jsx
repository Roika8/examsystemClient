import React, { useEffect, useState } from 'react'

//Package
import { Link, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import parse from 'html-react-parser';
//Style
import '../../StyleSheet/ManagementDisplay.css';
//Components
import TestsList from '../../UIComponents/Tests/TestsList';
import ErrorPage from '../ErrorPages/ErrorPage';
//Services
import testService from '../../ApiServices/testService';

const TestsManagement = () => {
    const { topicID } = useParams();
    const [allTests, setAllTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [error, setError] = useState({ isError: false, message: '' });

    useEffect(() => {
        const getTests = async () => {
            try {
                const testsList = await testService.getAllTestsByTopic(topicID);
                setAllTests(testsList);
                setFilteredTests(testsList);
            }
            catch (e) {
                console.log(e);
                setError({ isError: true, message: e.message });
            }
        }
        getTests();
    }, [])

    const handleQuestionsFilter = (value) => {
        let namesFilter = [];
        let tagsFilter = [];
        namesFilter = allTests.filter(data => {
            return parse(data.title).includes(value);
        });
        setFilteredTests(namesFilter);
        if (!value)
            setFilteredTests(allTests);

    }

    return (
        <div>
            {error.isError ?
                <ErrorPage errorMsg={error.message} location={'Tests management'} />
                :
                <>
                    <div className="managementHeader">Tests list </div>
                    <div className="searchBar">
                        <TextField onChange={(e) => handleQuestionsFilter(e.target.value)} id="standard-basic" label="Search question by tags or name" variant="standard" className="styleInput" />
                    </div>
                    {
                        filteredTests ?
                            <TestsList testsList={filteredTests} topicID={topicID} />
                            : <div className='noDataDisplay'>No Tests to display</div>

                    }
                    <div className="buttons">
                        <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                        <Button className="childBtn" component={Link} to={{ pathname: `/tests/new/${topicID}` }} color="success" variant="contained">New Test</Button>
                    </div>
                </>
            }
        </div>
    )
}
export default TestsManagement;