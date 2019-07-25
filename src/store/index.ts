import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import throttle from 'lodash/throttle';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

import { saveState, loadState } from 'services/persistState';
import user, { logout } from 'state/user';
import product from 'state/product';
import products from 'state/products';
import categories from 'state/category';
import status from 'state/status';
import cart from 'state/cart';
import modal from 'state/modal';
import { isValidSession } from 'helpers/auth';

export const history = createBrowserHistory();

const routerReducer = connectRouter(history);
const reducer = {
  user,
  product,
  products,
  categories,
  status,
  cart,
  modal,
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
    const hasSession = isValidSession();
    // By persisting the cart and user state objects, your cart is always intact until order
    // is placed and user information is readily available (this saves several extra api
    // calls to get the cart and user info )
    const { user, cart } = store.getState();

    // Ensures session is invalidated when token expires
    if (!hasSession && user.authenticated) {
      store.dispatch(logout());
    }
    saveState({ user, cart });
  }, 5000)
);

export default store;
