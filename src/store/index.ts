import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import throttle from 'lodash/throttle';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

import { saveState, loadState } from 'services/persistState';
import product from 'state/product';
import products from 'state/products';
import categories from 'state/category';
import status from 'state/status';
import cart from 'state/cart';

export const history = createBrowserHistory();

const routerReducer = connectRouter(history);
const reducer = {
  product,
  products,
  categories,
  status,
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
    const { auth, cart } = store.getState();
    saveState({ auth, cart });
  }, 1000)
);

export default store;
