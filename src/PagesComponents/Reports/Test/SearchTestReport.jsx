import React, { useEffect, useState } from 'react'
import './SearchTestReport.css'
import { Link, useParams } from 'react-router-dom';
import { Button, Select, MenuItem, TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
//Download matarial ui
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import DateRangePicker from '@mui/lab/DateRangePicker';

//Services
import topicService from '../../../ApiServices/topicService';
import testService from '../../../ApiServices/testService';

//Components
import ErrorPage from '../../ErrorPages/ErrorPage';
const SearchTestReport = () => {
    const { topicID } = useParams();
    const [topicName, setTopicName] = useState('');
    const [testsList, setTestsList] = useState([]);
    const [selectedTestID, setSelectedTestID] = useState('');
    const [anyDateInThePast, setAnyDateInThePast] = useState(true);
    const [path, setPath] = useState('');
    const [error, setError] = useState({ isError: false, message: '' });
    //Date range picker
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    useEffect(() => {
        const getTopicName = async () => {
            try {
                const topic = await topicService.getTopicByID(topicID);
                setTopicName(topic.content);
            }
            catch (e) {
                setError({ isError: true, message: e.message });
            }
        }
        const getTests = async () => {
            try {
                const tests = await testService.getAllTestsByTopic(topicID);
                setTestsList(tests)
                setSelectedTestID(tests[0].testID);
            }
            catch (e) {
                setError({ isError: true, message: e.message });
            }
        }
        getTopicName();
        getTests();


    }, [])

    //Set the path to the report
    useEffect(() => {
        anyDateInThePast
            ?
            setPath(`/reports/${topicID}/tests/${selectedTestID}
        /from/${new Date(1970, 1, 1).toLocaleDateString()}/to/${new Date(Date.now()).toLocaleDateString()}`)
            :
            setPath(`/reports/${topicID}/tests/${selectedTestID}
            /from/${selectedDateRange[0] ? selectedDateRange[0].$d.toLocaleDateString() : new Date(1970, 1, 1).toLocaleDateString()}
            /to/${selectedDateRange[1] ? selectedDateRange[1].$d.toLocaleDateString() : new Date(Date.now()).toLocaleDateString()}`)
    }, [anyDateInThePast, selectedDateRange, selectedTestID])

    const handleChange = (testID) => {
        setSelectedTestID(testID)
    }
    return (
        <>
            {error.isError ?
                <ErrorPage errorMsg={error.message} location={'Search test report'} />
                :
                <>
                    <div className="topic">Test results for:{<span className='topicLabel'>{topicName}</span>}</div>
                    <div className='testReportForm'>
                        <div className='testsListContainer'>
                            {testsList
                                ?
                                <div className='testsList'>
                                    <Select fullWidth label="Select test" value={selectedTestID} onChange={(e) => handleChange(e.target.value)}>
                                        {testsList.map(test => {
                                            return (
                                                <MenuItem key={test.testID} value={test.testID}>{test.title}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                                :
                                <div>Loading tests list</div>
                            }
                        </div>
                        <div className="dateRangeContainter">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                    disabled={anyDateInThePast}
                                    startText="From"
                                    endText="To"
                                    value={selectedDateRange}
                                    onChange={(dateRange) => setSelectedDateRange(dateRange)}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}

                                    inputFormat="DD/MM/YYYY"

                                />
                            </LocalizationProvider>
                            <FormControlLabel className="checkBox" control={<Checkbox color="secondary" checked={anyDateInThePast} />}
                                label="Any date in the past"
                                onChange={() => {
                                    setAnyDateInThePast(!anyDateInThePast);
                                }} />

                        </div>
                        <div className="backBtn">
                            <Button component={Link} to={{ pathname: `/reports/${topicID}` }} color="warning" variant="contained">Back</Button>
                        </div>
                        <div className="generateBtn">
                            <Button className="generateBtn" component={Link}
                                to={{ pathname: path }} color="secondary" variant="contained">
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default SearchTestReport;