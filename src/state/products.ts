import { createReducer, createAction } from 'redux-starter-kit';
import { Product } from 'state/interfaces';
import config from 'config';

interface ProductsState {
  rows: Product[];
  count: number;
  pages: number;
}

const initialProductsState: ProductsState = {
  rows: [],
  count: 0,
  pages: 0,
};

export const fetchMany = createAction('PRODUCTS/FETCH_MANY');

const products = createReducer(initialProductsState, {
  // @ts-ignore
  [fetchMany]: (state, action) => {
    const { payload } = action;
    const pages = Math.ceil(Number(payload.count) / Number(config.LIMIT));
    state.rows = payload.rows;
    state.count = payload.count;
    state.pages = pages;
  },
});

export default products;
