/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Product, Category } from 'state/interfaces';
import { useAxios } from 'helpers/hooks';
import { connect, useDispatch } from 'react-redux';
import { fetchMany } from 'state/products';
import Main from 'components/Main';
import { generateCartId } from 'state/cart';
import api from 'services/api';

interface HomeProps {
  products: Product[];
  categories: Category[];
  count: number;
  pages: number;
  cartId: string;
  match: any;
  status: {
    loading: boolean;
  };
}

const Home: React.FunctionComponent<HomeProps> = ({
  products,
  count,
  pages,
  match,
  categories,
  cartId,
}) => {
  const { params, path } = match;
  const currentPage = Number(params.page) || 1;
  let url = '';

  if (path.includes('categories')) {
    const category = categories.find(
      item => item.name.toLowerCase() === params.category
    );
    if (category) {
      url = `products/inCategory/${category.category_id}/?page=${currentPage}`;
    }
  } else {
    url = `products?page=${currentPage}`;
  }

  const result = useAxios({ url }, { rows: products, count });

  const dispatch = useDispatch();

  if (result.rows && result.rows[0] !== products[0]) {
    dispatch(fetchMany(result));
  }

  const generateUniqueCartId = async () => {
    if (!cartId) {
      const response = await api.get('shoppingcart/generateUniqueId');
      dispatch(generateCartId(response.data));
    }
  };
  generateUniqueCartId();
  return (
    <Main
      match={match}
      products={products}
      pages={pages}
      currentPage={currentPage}
    />
  );
};

const mapStateToProps = state => ({
  products: state.products.rows,
  count: state.products.count,
  categories: state.categories.rows,
  pages: state.products.pages,
  cartId: state.cart.cartId,
});

export default connect(mapStateToProps)(Home);
