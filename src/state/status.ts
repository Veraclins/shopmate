import { createReducer, createAction } from 'redux-starter-kit';

const initialStatus = {
  loading: false,
  error: null,
};

export const changeStatus = createAction('STATUS/CHANGE_STATUS');

export const throwError = createAction('STATUS/THROW_ERROR');

const status = createReducer(initialStatus, {
  // @ts-ignore
  [changeStatus]: (state, action) => {
    state.loading = action.payload;
  },
  // @ts-ignore
  [throwError]: (state, action) => {
    state.error = action.payload;
  },
});

export default status;
