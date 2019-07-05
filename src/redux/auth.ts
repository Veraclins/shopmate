import { createReducer, createAction } from 'redux-starter-kit';

const initialState = {
  authenticated: false,
  user: null,
};

export const login = createAction('USER/LOG_IN');
export const logout = createAction('USER/LOG_OUT');

const auth = createReducer(initialState, {
  // @ts-ignore
  [login]: (state, action) => {
    state.user = action.payload;
    state.authenticated = true;
  },
  // @ts-ignore
  [logout]: () => initialState,
});

export default auth;
