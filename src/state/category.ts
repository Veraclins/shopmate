import { createReducer, createAction } from 'redux-starter-kit';
import { Category } from 'state/interfaces';

interface CategoryState {
  rows: Category[];
  count: number;
}

const initialState: CategoryState = {
  rows: [],
  count: 0,
};

export const fetchMany = createAction('CATEGORY/FETCH_MANY');

const categories = createReducer(initialState, {
  // @ts-ignore
  [fetchMany]: (state, action) => {
    const { payload } = action;
    state.rows = payload.rows;
    state.count = payload.count;
  },
});

export default categories;
