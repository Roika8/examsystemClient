
//I made it separated to be more easy make a change in a specific field
const validateFirstName = (firstName) => {
    return firstName.length !== 0;
}
const validateLastName = (lastName) => {
    return lastName.length !== 0;
}
const validateEmail = (email) => {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const validatePhoneNumber = (phoneNumber) => {
    for (let index = 0; index < phoneNumber.length; index++) {
        if (phoneNumber[index] < 0 || phoneNumber[index] > 9)
            return false;
    }
    return phoneNumber.length == 10;
}


export default { validateEmail, validateFirstName, validateLastName, validatePhoneNumber };