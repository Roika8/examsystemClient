import parse from 'html-react-parser';

const validateTitle = (title) => {
    return parse(title).length !== 0;
}
const validateAnswersCorrect = (answers) => {
    return answers.filter(ans => ans.correct === true).length > 0;
}
const validateAnswersContent = (answers) => {
    return (answers.filter(ans =>parse(ans.content).length !== 0).length) === (answers.length);
}
export default { validateTitle, validateAnswersCorrect, validateAnswersContent };