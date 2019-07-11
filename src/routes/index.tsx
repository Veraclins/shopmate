import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';

import GlobalStyles from 'styles/globals';
import NavBar from 'components/Navbar';
import { themes } from 'styles';
import Footer from 'components/Footer';
import Department from 'pages/Department';

const routes = (
  <>
    <GlobalStyles />
    <NavBar theme={themes.white} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:page" component={Home} />
      <Route exact path="/categories/:category" component={Home} />
      <Route exact path="/categories/:category/:page" component={Home} />
      <Route exact path="/departments/:id" component={Department} />
      <Route exact path="/departments/:id/:page" component={Department} />
      <Route
        exact
        path="/departments/:id/categories/:category"
        component={Department}
      />
      <Route
        exact
        path="/departments/:id/categories/:category/:page"
        component={Department}
      />
    </Switch>
    <Footer />
  </>
);

export default routes;
