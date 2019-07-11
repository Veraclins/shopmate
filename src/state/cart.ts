import { createReducer, createAction } from 'redux-starter-kit';
import { CartItem, Attribute } from 'state/interfaces';

interface CartState {
  cartId: string;
  items: CartItem[];
}

const initialCartState: CartState = {
  cartId: '',
  items: [],
};

export const generateCartId = createAction('CART/GENERATE_UNIQUE_ID');
export const addToCart = createAction('CART/ADD_TO_CART');
export const removeFromCart = createAction('CART/REMOVE_FROM_CART');
export const emptyCart = createAction('CART/EMPTY_CART');

const cart = createReducer(initialCartState, {
  // @ts-ignore
  [generateCartId]: (state, action) => {
    state.cartId = action.payload.cart_id;
  },
  // @ts-ignore
  [addToCart]: (state, action) => {
    state.items = action.payload;
  },
  // @ts-ignore
  [removeFromCart]: (state, action) => {
    const newItems = state.items.filter(
      item => item.item_id !== action.payload
    );
    state.items = newItems;
  },
  // @ts-ignore
  [emptyCart]: state => {
    state.items = [];
  },
});

export default cart;
