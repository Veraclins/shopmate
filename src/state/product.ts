import { createReducer, createAction } from 'redux-starter-kit';
import { ProductComplete, Review, Attribute } from 'state/interfaces';

interface ProductState {
  product: ProductComplete | {};
  reviews: Review[];
  attributes: {
    colors: Attribute[];
    sizes: Attribute[];
  };
}

const initialProductState: ProductState = {
  product: {},
  reviews: [],
  attributes: {
    colors: [],
    sizes: [],
  },
};

export const fetchProduct = createAction('PRODUCT/FETCH_PRODUCT');
export const addReview = createAction('PRODUCT/ADD_REVIEW');
export const loadReviews = createAction('PRODUCT/LOAD_REVIEWS');
export const fetchAttributes = createAction('PRODUCT/FETCH_ATTRIBUTES');

const product = createReducer(initialProductState, {
  // @ts-ignore
  [fetchProduct]: (state, action) => {
    state.product = action.payload;
  },
  // @ts-ignore
  [addReview]: (state, action) => {
    state.reviews = [...state.reviews, action.payload];
  },
  // @ts-ignore
  [loadReviews]: (state, action) => {
    state.reviews = action.payload;
  },
  // @ts-ignore
  [fetchAttributes]: (state, action) => {
    let sizes: Attribute[] = [];
    let colors: Attribute[] = [];
    action.payload.forEach((attribute: Attribute) => {
      if (attribute.attribute_name.toLowerCase() === 'color') {
        colors = [...colors, attribute];
      } else if (attribute.attribute_name.toLowerCase() === 'size') {
        sizes = [...sizes, attribute];
      }
    });
    state.attributes.colors = colors;
    state.attributes.sizes = sizes;
  },
});

export default product;
