import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import routes from 'routes';
import { connect } from 'react-redux';
import Loader from 'components/Loader';

interface MainProps {
  history: History;
  loading?: boolean;
}

const App: React.FunctionComponent<MainProps> = ({ history, loading }) => (
  <ConnectedRouter history={history}>
    <MainContainer>
      {routes}
      {loading && <Loader />}
    </MainContainer>
  </ConnectedRouter>
);

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-size: inherit;
  width: 100%;
  box-sizing: border-box;
`;

const mapStateToProps = (state): any => ({
  loading: state.status.loading,
});

export default connect(mapStateToProps)(App);
