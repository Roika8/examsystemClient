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
import { lightGreen } from '@mui/material/colors';
const SearchTestReport = () => {
    const { topicID } = useParams();
    const [topicName, setTopicName] = useState('');
    const [testsList, setTestsList] = useState([]);
    const [selectedTestID, setSelectedTestID] = useState('');
    const [anyDateInThePast, setAnyDateInThePast] = useState(false);

    //Date range picker
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    useEffect(() => {
        const getTopicName = async () => {
            const topic = await topicService.getTopicByID(topicID);
            setTopicName(topic.content);
        }
        const getTests = async () => {
            const tests = await testService.getAllTestsByTopic(topicID);
            setTestsList(tests)
            setSelectedTestID(tests[0].testID);
            console.log(tests);
        }
        getTopicName();
        getTests();
    }, [])


    const handleChange = (testID) => {
        setSelectedTestID(testID)
    }
    return (
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
                            onChange={(newValue) => {
                                setSelectedDateRange(newValue)
                                // const fromDate = newValue[0] ? newValue[0].$d.toLocaleDateString() : null;
                                // const toDate = newValue[1] ? newValue[1].$d.toLocaleDateString() : null;
                                // setSelectedDateRange([fromDate, toDate]);
                            }}
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
                    <FormControlLabel className="checkBox" control={<Checkbox color="secondary" checked={anyDateInThePast} />} label="Any date in the past" onChange={() => { setAnyDateInThePast(!anyDateInThePast); setSelectedDateRange([null, new Date(Date.now()).toLocaleDateString()]) }} />

                </div>
                <div className="backBtn">
                    <Button component={Link} to={{ pathname: `/reports/${topicID}` }} color="warning" variant="contained">Back</Button>
                </div>
                <div className="generateBtn">
                    <Button className="generateBtn" component={Link}
                        to={{
                            pathname:
                                `/reports/${topicID}/tests/${selectedTestID}
                                /from/${selectedDateRange[0] ? selectedDateRange[0].$d.toLocaleDateString() : null}
                                /to/${selectedDateRange[1] ? selectedDateRange[1].$d.toLocaleDateString() : null}`
                        }}
                        color="secondary" variant="contained">Generate Report</Button>
                </div>
            </div>
        </>
    )
}

export default SearchTestReport;