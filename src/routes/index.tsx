import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';

import GlobalStyles from 'styles/globals';
import { themes } from 'styles';

const routes = (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
);

export default routes;
