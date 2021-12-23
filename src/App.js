import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import ManagerLogin from './PagesComponents/ManagerLogin';
import ManagerMainMenu from './PagesComponents/ManagerMainMenu';
import CreateQuestion from './PagesComponents/Questions/CreateQuestion';
import QuestionsManagement from './PagesComponents/Questions/QuestionsManagement';
import CreateTest from './PagesComponents/Tests/CreateTest';
import TestManagment from './PagesComponents/Tests/TestsManagement';
import SearchStudentReport from './PagesComponents/Reports/Student/SearchStudentReport';
import SearchTestReport from './PagesComponents/Reports/Test/SearchTestReport';
import TestsReports from './PagesComponents/Reports/Test/TestsReports';
import ReportsMenu from './PagesComponents/Reports/ReportsMenu';
import StudentTestForm from './PagesComponents/StudentTest/StudentTestForm';
import Test from './PagesComponents/StudentTest/Test';
import TestStudentData from './UIComponents/Reports/TestStudentData';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            {/* Questions routes */}
            <Route path='/' exact component={ManagerMainMenu} />
            <Route path='/questions/:topicID' exact component={QuestionsManagement} />
            <Route path='/questions/new/:topicID' exact component={CreateQuestion} />
            <Route path='/questions/edit/:topicID/:questionID' exact component={CreateQuestion} />

            {/* tests routes */}
            <Route path='/tests/:topicID' exact component={TestManagment} />
            <Route path='/tests/new/:topicID' exact component={CreateTest} />
            <Route path='/tests/edit/:topicID/:existTestID' exact component={CreateTest} />

            {/*Reports routes */}
            <Route path='/reports/:topicID' exact component={ReportsMenu} />
            <Route path='/reports/:topicID/students' exact component={SearchStudentReport} />

            <Route path='/reports/:topicID/tests' exact component={SearchTestReport} />
            <Route path='/reports/:topicID/tests/:testID/from/:fromDate/to/:toDate' component={TestsReports} />

            <Route path='/reports/testStudentReport/:studentEmail' exact component={TestStudentData} />
            {/* Student test route */}
            <Route path='/studentTest/form/:testID' exact component={StudentTestForm} />
            <Route path='/onTest/:studentEmail/:testID' exact component={Test} />
            {/* Login route */}
            <Route path="/Login" exact component={ManagerLogin} />
            <Route path="*"><Redirect to="/" /></Route>


          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
