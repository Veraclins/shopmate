import { createReducer, createAction } from 'redux-starter-kit';
import { CartItem } from 'state/interfaces';

interface CartState {
  cartId: string;
  items: CartItem[];
  bag: number;
  orderId: number;
}

const initialCartState: CartState = {
  cartId: '',
  items: [],
  bag: 0,
  orderId: 0,
};

export const generateCartId = createAction('CART/GENERATE_UNIQUE_ID');
export const addToCart = createAction('CART/ADD_TO_CART');
export const placeOrder = createAction('CART/PLACE_ORDER');

const cart = createReducer(initialCartState, {
  // @ts-ignore
  [generateCartId]: (state, action) => {
    state.cartId = action.payload.cart_id;
  },
  // @ts-ignore
  [addToCart]: (state, action) => {
    const bag = action.payload
      .reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.subtotal),
        0
      )
      .toFixed(2);
    state.bag = Number(bag);
    state.items = action.payload;
  },
  // @ts-ignore
  [placeOrder]: (state, action) => {
    state.cartId = '';
    state.items = [];
    state.bag = 0;
    state.orderId = action.payload.orderId;
  },
});

export default cart;
