import parse from 'html-react-parser';

//I made it separated to be more easy make a change in a specific field
const validateTitle = (title) => {
    return parse(title).length !== 0;
}
const validateStarter = (content) => {
    return parse(content).length !== 0;
}
const validateSuccessMessage = (content) => {
    return parse(content).length !== 0;
}
const validateFailMessage = (content) => {
    return parse(content).length !== 0;
}
const validateSelectedQuestions = (selectedQuestions) => {
    return selectedQuestions.length > 0;
}

export default { validateTitle, validateStarter, validateFailMessage, validateSuccessMessage, validateSelectedQuestions };