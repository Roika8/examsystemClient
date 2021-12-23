import React, { useState } from 'react'
//Packages
import { Link, useParams, useHistory } from 'react-router-dom';
//Design
import { FormGroup, TextField, Button } from '@mui/material';
import './StudentTestForm.css';
//Service
import studentTestService from '../../ApiServices/studentTestService';
import studentValidator from '../../Validators/studentValidator';
const StudentTestForm = () => {
    const { testID } = useParams();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const submitTest = async () => {
        let errorFound = false;
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);

        if (!studentValidator.validateFirstName(firstName)) {
            setFirstNameError(true);
            errorFound = true;
        }
        if (!studentValidator.validateLastName(lastName)) {
            setLastNameError(true);
            errorFound = true;
        }
        if (!studentValidator.validateEmail(email)) {
            setEmailError(true);
            errorFound = true;
        }
        if (!studentValidator.validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError(true);
            errorFound = true;
        }
        if (!errorFound) {
            try {
                const res = await studentTestService.addStudent({ firstName, lastName, email, phoneNumber });
                if (res) {
                    alert('Good luck!')
                    history.push(`/onTest/${email}/${testID}`)
                }
            }
            catch (e) {
                alert(e.message);
            }
        }
    }
    return (
        <div className="studentFormContainer">
            <FormGroup>
                <div className="header"> Test </div>
                <div className="inputBlock">
                    <TextField
                        error={firstNameError}
                        label="First name"
                        variant="filled"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        inputProps={{ style: { background: 'white' } }}
                        required
                    />
                </div>
                <div className="inputBlock">
                    <TextField
                        error={lastNameError}
                        label="Last name"
                        variant="filled"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        inputProps={{ style: { background: 'white' } }}
                        required
                    />
                </div>
                <div className="inputBlock testTitle">
                    <TextField
                        error={phoneNumberError}
                        label="Phone number"
                        variant="filled"
                        value={phoneNumber}
                        type="number"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                        required
                        inputProps={{ maxLength: 10, style: { background: 'white' } }}
                    />
                </div>
                <div className="inputBlock">
                    <TextField
                        error={emailError}
                        label="Email"
                        variant="filled"
                        value={email}
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value.toLowerCase());
                        }}
                        required
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
