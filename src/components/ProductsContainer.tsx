/* eslint-disable @typescript-eslint/camelcase */
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Product } from 'state/interfaces';
import { history } from 'store';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, light, white } from 'styles/colors';

interface ProductsProps {
  products: Product[];
  pages: number;
  search?: string;
  currentPage: number;
}

interface LabelProps {
  current: number;
  number?: number;
}

const ProductsContainer: React.FunctionComponent<ProductsProps> = ({
  products,
  currentPage,
  pages,
  search,
}) => {
  let pageNumbers: number[] = [];
  for (let index = 1; index <= pages; index++) {
    pageNumbers = [...pageNumbers, index];
  }
  const gotoPage = page => {
    if (search) {
      history.push(`/search/${page}${search}`);
    } else {
      history.push(page.toString());
    }
  };
  return (
    <Container>
      {pages > 1 && (
        <Paginate>
          <Previous
            onClick={() => gotoPage(currentPage - 1 || 1)}
            disabled={currentPage <= 1}
          >
            <FaAngleLeft />
            Previous
          </Previous>
          {pageNumbers.map(number => (
            <PageLabel
              onClick={() => gotoPage(number)}
              key={number}
              current={currentPage}
              number={number}
            >
              {number}
            </PageLabel>
          ))}
          <Next
            onClick={() =>
              gotoPage(pages > currentPage ? currentPage + 1 : pages)
            }
            disabled={currentPage >= pages}
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
          <Previous
            onClick={() => gotoPage(currentPage - 1 || 1)}
            disabled={currentPage <= 1}
          >
            <FaAngleLeft />
            Previous
          </Previous>
          {pageNumbers.map(number => (
            <PageLabel
              onClick={() => gotoPage(number)}
              key={number}
              current={currentPage}
              number={number}
            >
              {number}
            </PageLabel>
          ))}
          <Next
            onClick={() =>
              gotoPage(pages > currentPage ? currentPage + 1 : pages)
            }
            disabled={currentPage >= pages}
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

const PageLabel = styled(Button)<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(10)};
  padding: ${rem(5)};
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

const Previous = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(30)};
  padding: ${rem(5)} ${rem(10)};

  @media screen and (max-width: ${rem(480)}) {
    margin: 0 ${rem(10)};
  }
`;

const Next = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${rem(30)};
  padding: ${rem(5)} ${rem(10)};

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
