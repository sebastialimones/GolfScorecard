import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from './Layout';
import { Home } from '../components/Home';

export const Routes = () => {
  const renderHome = (props) => <Home { ...props } />;

  return(
    <Router>
      <Layout>
        <Route exact path="/" render={ renderHome } />
      </Layout>
    </Router>

  )
};
