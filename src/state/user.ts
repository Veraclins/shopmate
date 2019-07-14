import { createReducer, createAction } from 'redux-starter-kit';
import { setAuthToken, setExpiryTime, clearAuth } from 'helpers/auth';
import { Customer } from 'state/interfaces';

interface UserState {
  authenticated: boolean;
  customer: Customer | {};
}

const initialState: UserState = {
  authenticated: false,
  customer: {},
};

export const login = createAction('USER/LOG_IN');
export const update = createAction('USER/UPDATE_USER');
export const logout = createAction('USER/LOG_OUT');

const user = createReducer(initialState, {
  // @ts-ignore
  [login]: (state, action) => {
    const { accessToken, expires_in: expiresIn, customer } = action.payload;
    setAuthToken(accessToken);
    setExpiryTime(expiresIn);
    state.customer = customer;
    state.authenticated = true;
  },
  // @ts-ignore
  [update]: (state, action) => {
    state.customer = action.payload;
  },
  // @ts-ignore
  [logout]: state => {
    clearAuth();
    state.customer = {};
    state.authenticated = false;
  },
});

export default user;
