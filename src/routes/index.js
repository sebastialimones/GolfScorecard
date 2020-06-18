import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from '../components/Home';
import { Dashboard } from '../components/Dashboard';
import { Handicap } from '../components/Handicap';

export const Routes = () => {
  const renderHome = (props) => <Home { ...props } />;
  const renderDashboard = (props) => <Dashboard { ...props } />;
  const renderHandicap = (props) => <Handicap { ...props } />;

  return(
    <Router>
      <Layout>
        <Route exact path="/" render={ renderHome } />
        <Route exact path="/dashboard" render={ renderDashboard } />
        <Route exact path="/handicap" render={ renderHandicap } />
      </Layout>
    </Router>

  )
};
