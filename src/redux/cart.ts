import { createReducer, createAction } from 'redux-starter-kit';

interface CartState {
  products: any[];
}
const initialState: CartState = {
  products: [],
};

export const add = createAction('CART/ADD_TO_CART');
export const remove = createAction('CART/REMOVE_FROM_CART');

const cart = createReducer(initialState, {
  // @ts-ignore
  [add]: (state, action) => {
    state.products = [...state.products, action.payload];
  },
  // @ts-ignore
  [remove]: () => initialState,
});

export default cart;
