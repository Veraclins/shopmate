/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Product } from 'state/interfaces';
import ProductsContainer from 'components/ProductsContainer';
import styled from 'styled-components';
import { light } from 'styles/colors';
import { rem } from 'styles';
import Sidebar from 'components/Sidebar';

interface MainProps {
  products: Product[];
  pages: number;
  currentPage: number;
  search?: string;
  match: any;
}

const Main: React.FunctionComponent<MainProps> = ({
  products,
  pages,
  match,
  search,
  currentPage,
}) => {
  return (
    <Container>
      <Sidebar match={match} />
      <StyledMain>
        <ProductsContainer
          products={products}
          search={search}
          pages={pages}
          currentPage={currentPage}
        />
      </StyledMain>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  min-height: 60vh;
`;

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
  padding: ${rem(20)};
  background: ${light};

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    padding: ${rem(20)} 0;
  }
`;

export default Main;
