import React, { useState } from 'react'
//Packages
import { Link, useParams, useHistory } from 'react-router-dom';
//Design
import { FormGroup, TextField, Button } from '@mui/material';
import './StudentTestForm.css';
//Service
import studentTestService from '../../ApiServices/studentTestService';
const StudentTestForm = () => {
    const { testID } = useParams();
    const history = useHistory();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const submitTest = async () => {
        const res = await studentTestService.addStudent({ firstName, lastName, email, phoneNumber });
        if (res) {
            //Redirect to test
            alert('Good luck!')
            history.push(`/onTest/${email}/${testID}`)

        }
    }
    return (
        <div className="studentFormContainer">
            <FormGroup>
                <div className="header"> Test </div>
                <div className="inputBlock">
                    <TextField
                        label="First name"
                        variant="filled"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        inputProps={{ style: { background: 'white' } }}
                    />
                </div>
                <div className="inputBlock">
                    <TextField
                        label="Last name"
                        variant="filled"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        inputProps={{ style: { background: 'white' } }}
                    />
                </div> <div className="inputBlock testTitle">
                    <TextField
                        label="Phone number"
                        variant="filled"
                        value={phoneNumber}
                        type="text"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}

                        inputProps={{ maxLength: 10, style: { background: 'white' } }}
                    />
                </div> <div className="inputBlock">
                    <TextField
                        label="Email"
                        variant="filled"
                        value={email}
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}

                        inputProps={{ style: { maxLength: 10, background: 'white' } }}
                    />
                </div>
                <div className="buttons">
                    <Button className="childBtn" color="success" variant="contained" onClick={() => submitTest()}>Enter test </Button>
                </div>
            </FormGroup>
        </div>
    )
}
export default StudentTestForm
