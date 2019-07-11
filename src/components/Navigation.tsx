import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { rem } from 'styles';

interface NavigationProps {
  theme: any;
  pathname?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface MenuProps {
  active: boolean;
}

interface NavItemProps {
  to: string;
  pathname?: string;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  theme,
  pathname,
  onClick,
}) => {
  return (
    <Main>
      <NavItem
        pathname={pathname}
        theme={theme}
        onClick={onClick}
        to="/departments/1/"
      >
        Regional
      </NavItem>
      <NavItem
        pathname={pathname}
        theme={theme}
        onClick={onClick}
        to="/departments/2/"
      >
        Nature
      </NavItem>
      <NavItem
        pathname={pathname}
        theme={theme}
        onClick={onClick}
        to="/departments/3/"
      >
        Seasonal
      </NavItem>
    </Main>
  );
};

const NavItem = styled(NavLink)<NavItemProps>`
  color: ${({ to, pathname, theme }) =>
    pathname && pathname.includes(to) && theme.activeNavColor};
  @media screen and (max-width: ${rem(480)}) {
    margin-bottom: ${rem(10)};
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 2;
  max-width: ${rem(800)};
  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    flex-direction: column;
  }
`;

const mapStateToProps = (state): any => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Navigation);
