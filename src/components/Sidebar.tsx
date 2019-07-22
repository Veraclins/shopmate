import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { white, grey, brand } from 'styles/colors';
import { rem } from 'styles';
import { useAxios } from 'helpers/hooks';
import { fetchMany } from 'state/category';
import { Category } from 'state/interfaces';

interface SidebarProps {
  match: any;
  categories?: Category[];
  count?: number;
  status?: {
    loading: boolean;
  };
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  match,
  categories = [],
  count,
}) => {
  const result = useAxios({ url: 'categories' }, { rows: categories, count });
  const dispatch = useDispatch();
  if (result.rows && result.rows[0] !== categories[0]) {
    dispatch(fetchMany(result));
  }

  const { path, params } = match;
  const isDepartmentPage = path.includes('departments');
  return (
    <>
      <Container>
        <Title>Categories</Title>
        <Main>
          {categories.map(category => (
            <React.Fragment key={`${category.category_id}`}>
              {((isDepartmentPage &&
                Number(params.id) === category.department_id) ||
                !isDepartmentPage) && (
                <Item
                  match={match}
                  to={`${
                    isDepartmentPage
                      ? `/departments/${
                          category.department_id
                        }/categories/${category.name.toLowerCase()}/`
                      : `/categories/${category.name.toLowerCase()}/`
                  }`}
                >
                  {category.name}
                </Item>
              )}
            </React.Fragment>
          ))}
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: ${rem(200)};
  padding: ${rem(25)} 0;
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  background: ${white};
  color: ${({ theme }) => theme.color};

  @media screen and (max-width: ${rem(480)}) {
    align-items: center;
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: ${rem(24)};
  padding-bottom: ${rem(4)};
  border-bottom: ${rem(3)} solid ${grey};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  max-height: ${rem(800)};
  padding: ${rem(30)};
  @media screen and (max-width: ${rem(480)}) {
    align-items: center;
  }
`;

const Item = styled(NavLink)<SidebarProps>`
  border-bottom: ${({ to, match }) =>
    match.params &&
    to.toString().includes(match.params.category) &&
    `${rem(2)} solid ${brand}`};
  margin-bottom: ${rem(30)};
`;

const mapStateToProps = (state): any => ({
  count: state.categories.count,
  categories: state.categories.rows,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Sidebar);
