import React, { useEffect, useState } from 'react'
//Package
import { Link, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import parse from 'html-react-parser';

//Services
import TestsList from '../../UIComponents/TestsList';
import testService from '../../ApiServices/testService';

const TestsManagement = () => {
    const { topicID } = useParams();
    const [allTests, setAllTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    useEffect(() => {
        const getTests = async () => {
            const testsList = await testService.getAllTestsByTopic(topicID);
            console.log(testsList);
            setAllTests(testsList);
            setFilteredTests(testsList);
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
            <div className="managementHeader">Tests list </div>
            <div className="searchBar">
                <TextField onChange={(e) => handleQuestionsFilter(e.target.value)} id="standard-basic" label="Search question by tags or name" variant="standard" className="styleInput" />
            </div>
            <TestsList testsList={filteredTests} topicID={topicID} />
            <div className="buttons">
                <Button className="childBtn" component={Link} to="/" color="secondary" variant="contained">Back</Button>
                <Button className="childBtn" component={Link} to={{ pathname: `/tests/new/${topicID}` }} color="success" variant="contained">New Test</Button>
            </div>
        </div>
    )
}
export default TestsManagement;