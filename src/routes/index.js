import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from '../components/Home';
import { Dashboard } from '../components/Dashboard';
import { NewCourse } from '../components/NewCourse';
import { Login } from '../components/Login';
import { CourseEditing } from '../components/CourseEditing';
import { Ranking } from '../components/Ranking';
import { LandingPage } from '../components/Landing';
import { CookiesPolicy } from '../components/CookiesPolicy';
import { Profile } from '../components/Profile';

export const Routes = () => {
  const renderHome = (props) => <Home { ...props } />;
  const renderLogin = (props) => <Login { ...props } />;
  const renderDashboard = (props) => <Dashboard { ...props } />;
  const renderNewCourse = (props) => <NewCourse { ...props } />;
  const renderRanking = (props) => <Ranking { ...props } />;  
  const renderProfile = (props) => <Profile { ...props } />;
  const renderCourseEditing = (props) => <CourseEditing { ...props } />;
  const renderLandingPage = (props) => <LandingPage { ...props } />;
  const renderCookiesPolicy = (props) => <CookiesPolicy { ...props } />;

  return(
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" render={ renderHome } />
          <Route exact path="/login" render={ renderLogin } />
          <Route exact path="/dashboard" render={ renderDashboard } />
          <Route exact path="/newCourse" render={ renderNewCourse } />
          <Route exact path="/courses" render={ renderCourseEditing } />
          <Route exact path="/ranking" render={ renderRanking } />
          <Route exact path="/profile" render={ renderProfile } />
          <Route exact path="/landing" render={ renderLandingPage } />
          <Route exact path="/cookiespolicy" render={ renderCookiesPolicy } />
        </Layout>
      </Switch>
    </Router>

  )
};
