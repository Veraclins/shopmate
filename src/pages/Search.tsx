/* eslint-disable @typescript-eslint/camelcase */
import Main from 'components/Main';
import { useAxios } from 'helpers/hooks';
import { Location } from 'history';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Product } from 'state/interfaces';
import { fetchMany } from 'state/products';

interface HomeProps {
  products: Product[];
  count: number;
  pages: number;
  match: any;
  location: Location;
}

const Home: React.FunctionComponent<HomeProps> = ({
  products,
  count,
  pages,
  match,
  location,
}) => {
  const { params } = match;
  const currentPage = Number(params.page) || 1;
  const { search } = location;
  const searchString = search.split('=')[1];
  const url = `/products/search?query_string=${searchString}&page=${currentPage}`;

  const result = useAxios({ url }, { rows: products, count });

  const dispatch = useDispatch();

  if (result.rows && result.rows[0] !== products[0]) {
    dispatch(fetchMany(result));
  }

  return (
    <Main
      match={match}
      products={products}
      pages={pages}
      search={search}
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
  location: state.router.location,
});

export default connect(mapStateToProps)(Home);
