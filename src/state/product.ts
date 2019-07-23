import { createReducer, createAction } from 'redux-starter-kit';
import { ProductComplete, Review, Attribute } from 'state/interfaces';

interface ProductState {
  product: ProductComplete | {};
  reviews: Review[];
  rating: number;
  newRating: number;
  attributes: {
    colors: Attribute[];
    sizes: Attribute[];
  };
}

const initialProductState: ProductState = {
  product: {},
  reviews: [],
  rating: 0,
  newRating: 0,
  attributes: {
    colors: [],
    sizes: [],
  },
};

export const fetchProduct = createAction('PRODUCT/FETCH_PRODUCT');
export const rateProduct = createAction('PRODUCT/RATE_PRODUCT');
export const loadReviews = createAction('PRODUCT/LOAD_REVIEWS');
export const fetchAttributes = createAction('PRODUCT/FETCH_ATTRIBUTES');

const product = createReducer(initialProductState, {
  // @ts-ignore
  [fetchProduct]: (state, action) => {
    state.product = action.payload;
  },
  // @ts-ignore
  [loadReviews]: (state, action) => {
    const reviews = action.payload;
    const total = reviews
      .reduce((accumulator, currentValue) => {
        // I noticed that some reviews have negative ratings as low as -3000
        // some have ratings as high as 1000.
        // Since I am using the 5 star rating setup, it is necessary to restrict values between 0 and 5

        const positive = Math.abs(Number(currentValue.rating));
        const value = positive <= 5 ? positive : 5;
        return accumulator + value;
      }, 0)
      .toFixed(2);
    const rating = reviews.length ? Number(total) / reviews.length : 0;
    state.reviews = reviews;
    state.rating = rating;
  },
  // @ts-ignore
  [rateProduct]: (state, action) => {
    state.newRating = action.payload;
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
