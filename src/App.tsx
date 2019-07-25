import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        autoClose={5000}
        position={toast.POSITION.BOTTOM_CENTER}
      />
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
