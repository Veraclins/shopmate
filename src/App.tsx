import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import routes from 'routes';

interface MainProps {
  history: History;
}

const App: React.SFC<MainProps> = ({ history }) => (
  <ConnectedRouter history={history}>
    <MainContainer>{routes}</MainContainer>
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

export default App;
