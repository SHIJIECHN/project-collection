import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/Index.js'
import LoginPage from './pages/Login.js';

import CollectionPage from './pages/sub/Collection';
import RecomCoursePage from './pages/sub/RecomCourse';
import CoursePage from './pages/sub/Course';
import SliderPage from './pages/sub/Slider';
import StudentPage from './pages/sub/Student';
import TeacherPage from './pages/sub/Teacher';
import CrawlerPage from './pages/sub/Crawler';
import ErrorPage from './pages/sub/Error';

function App() {
  return (
    <Router>
      <Switch>
        {/* /login 放在上面 */}
        <Route component={LoginPage} path='/login' />
        {/* <Route component={IndexPage} path='/' /> */}
        <Route path="/" render={props => (
          <IndexPage history={props.history}>
            <Switch>
              <Route component={CollectionPage} path='/collection' />
              <Route component={RecomCoursePage} path='/recom_course' />
              <Route component={CoursePage} path='/course' />
              <Route component={SliderPage} path='/slider' />
              <Route component={StudentPage} path='/student' />
              <Route component={TeacherPage} path='/teacher' />
              <Route component={CrawlerPage} path='/crawler' />
              <Route component={ErrorPage} />
              {/* 路由匹配是从上到下的，如果没有匹配到才会匹配最后一个，path不写 */}
            </Switch>
          </IndexPage>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
