/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Product, Category } from 'state/interfaces';
import { useAxios } from 'helpers/hooks';
import { connect, useDispatch } from 'react-redux';
import { fetchMany } from 'state/products';

import Main from 'components/Main';

interface DepartmentProps {
  products: Product[];
  categories: Category[];
  count: number;
  pages: number;
  match: any;
  status: {
    loading: boolean;
  };
}

const Department: React.FunctionComponent<DepartmentProps> = ({
  products,
  count,
  pages,
  match,
  categories,
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
    url = `products/inDepartment/${params.id}/?page=${currentPage}`;
  }
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
      currentPage={currentPage}
    />
  );
};

const mapStateToProps = state => ({
  products: state.products.rows,
  count: state.products.count,
  pages: state.products.pages,
  categories: state.categories.rows,
});

export default connect(mapStateToProps)(Department);
