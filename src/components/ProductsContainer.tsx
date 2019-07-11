/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styled from 'styled-components';
import ProductCard from 'components/ProductCard';
import { Product } from 'state/interfaces';
import { rem } from 'styles';
import { grey, brand, white, light } from 'styles/colors';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface ProductsProps {
  products: Product[];
  pages: number;
  currentPage: number;
}

interface LabelProps {
  current: number;
  number?: number;
}

interface NextProps {
  current: number;
  pages: number;
  number?: number;
}

const ProductsContainer: React.FunctionComponent<ProductsProps> = ({
  products,
  currentPage,
  pages,
}) => {
  let pageNumbers: number[] = [];
  for (let index = 1; index <= pages; index++) {
    pageNumbers = [...pageNumbers, index];
  }
  return (
    <Container>
      {pages > 1 && (
        <Paginate>
          <Previous to={`${currentPage - 1 || 1}`} current={currentPage}>
            <FaAngleLeft />
            Previous
          </Previous>
          {pageNumbers.map(number => (
            <PageLabel
              to={`${number}`}
              key={number}
              current={currentPage}
              number={number}
            >
              {number}
            </PageLabel>
          ))}
          <Next
            to={`${pages > currentPage ? currentPage + 1 : pages}`}
            current={currentPage}
            pages={pages}
          >
            Next
            <FaAngleRight />
          </Next>
        </Paginate>
      )}
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
      {pages > 1 && (
        <Paginate>
          <Previous to={`${currentPage - 1 || 1}`} current={currentPage}>
            <FaAngleLeft />
            Previous
          </Previous>
          {pageNumbers.map(number => (
            <PageLabel
              to={`${number}`}
              key={number}
              current={currentPage}
              number={number}
            >
              {number}
            </PageLabel>
          ))}
          <Next
            to={`${pages > currentPage ? currentPage + 1 : pages}`}
            current={currentPage}
            pages={pages}
          >
            Next
            <FaAngleRight />
          </Next>
        </Paginate>
      )}
    </Container>
  );
};

const Paginate = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: ${rem(10)} auto;
  box-sizing: border-box;

  @media screen and (max-width: ${rem(480)}) {
    font-size: ${rem(14)};
    justify-content: space-evenly;
  }
`;

const PageLabel = styled(Link)<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(10)};
  width: ${rem(30)};
  height: ${rem(30)};
  color: ${({ current, number }) => (current === number ? white : 'inherit')};
  background: ${({ current, number }) => (current === number ? brand : light)};
  border-radius: 50%;

  @media screen and (max-width: ${rem(480)}) {
    margin: 0 ${rem(5)};
    width: ${rem(20)};
    height: ${rem(18)};
  }
`;

const Previous = styled(Link)<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(30)};
  padding: ${rem(5)};
  color: ${({ current }) => (current > 1 ? brand : 'inherit')};
  border: ${({ current }) =>
    current > 1 ? `${rem(1)} solid ${brand}` : `${rem(1)} solid ${grey}`};

  @media screen and (max-width: ${rem(480)}) {
    margin: 0 ${rem(10)};
  }
`;

const Next = styled(Link)<NextProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(30)};
  padding: ${rem(5)};
  color: ${({ current, pages }) => (current < pages ? brand : 'inherit')};
  border: ${({ current, pages }) =>
    current < pages ? `${rem(1)} solid ${brand}` : `${rem(1)} solid ${grey}`};

  @media screen and (max-width: ${rem(480)}) {
    margin: 0 ${rem(10)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export default ProductsContainer;
