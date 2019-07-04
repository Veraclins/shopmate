import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import throttle from 'lodash/throttle';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

import { saveState, loadState } from 'services/persistState';
import auth from 'redux/auth';
import cart from 'redux/cart';

export const history = createBrowserHistory();

const routerReducer = connectRouter(history);
const reducer = {
  auth,
  cart,
  router: routerReducer,
};

const middleware = [
  ...getDefaultMiddleware(),
  routerMiddleware(history),
  logger,
];

const preloadedState = loadState();

const store = configureStore({
  // @ts-ignore
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

store.subscribe(
  throttle(() => {
    const { auth } = store.getState();
    saveState({ auth });
  }, 1000)
);

export default store;
