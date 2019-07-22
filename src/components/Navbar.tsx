import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { rem } from 'styles';
import TopBar from 'components/Topbar';
import Input from 'components/Input';
import Navigation from 'components/Navigation';
import { connect } from 'react-redux';
import { CartItem, Customer } from 'state/interfaces';
import CartIcon from 'components/CartIcon';

import { history } from 'store';

interface NavbarProps {
  theme: any;
  items: CartItem[];
  customer: Customer;
  authenticated?: boolean;
  bag: number;
  cartId: string;
}

interface MenuProps {
  active: boolean;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  theme,
  items,
  bag,
  cartId,
  customer,
  authenticated,
}) => {
  const [navActive, toggleNav] = useState(false);
  const [search, setSearch] = useState('');
  const [searchActive, toggleSearch] = useState(false);

  const searchProduct = async () => {
    if (!search) return;
    history.push(`/search?query_string=${search}`);
  };

  const onKeyPress = e => {
    if (e.which === 13) {
      searchProduct();
    }
  };

  return (
    <>
      <TopBar
        theme={theme}
        items={items}
        customer={customer}
        bag={bag}
        cartId={cartId}
        authenticated={authenticated}
      />
      <Container theme={theme}>
        <NavLeft>
          <Logo theme={theme}>
            <NavLink to="/">SHOPMATE</NavLink>
          </Logo>
          <Menu
            theme={theme}
            active={navActive}
            onClick={() => toggleNav(!navActive)}
          >
            <span />
            <span />
            <span />
            <span />
          </Menu>
        </NavLeft>
        <NavRight active={navActive}>
          <Main>
            <Navigation onClick={() => toggleNav(!navActive)} theme={theme} />
          </Main>
          <Icons>
            <Search>
              {searchActive && (
                <>
                  <LeftIcon>
                    <FaSearch onClick={() => searchProduct()} />
                  </LeftIcon>
                  <SearchInput
                    type="text"
                    value={search}
                    name="search"
                    placeholder="search anything"
                    hasLeftIcon
                    hasRightIcon
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={e => onKeyPress(e)}
                    background={theme.background}
                    lightenBy={0.4}
                    color={theme.color}
                  />
                  <RightIcon>
                    <FaTimes onClick={() => toggleSearch(!searchActive)} />
                  </RightIcon>
                </>
              )}
              {!searchActive && (
                <FaSearch onClick={() => toggleSearch(!searchActive)} />
              )}
            </Search>
            <CartIcon
              theme={theme}
              customer={customer}
              items={items}
              cartId={cartId}
              bag={bag}
            />
          </Icons>
        </NavRight>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -${rem(50)};
  padding: ${rem(25)} ${rem(50)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    padding: ${rem(20)};
    margin: 0 -${rem(20)};
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
  }
`;

const NavRight = styled.div<MenuProps>`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: space-between;
  margin-left: ${rem(40)};

  @media screen and (max-width: ${rem(480)}) {
    display: ${({ active }) => (active ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    margin: ${rem(20)} auto;
    box-sizing: border-box;
  }
`;

const Logo = styled.div`
  font-size: ${rem(34)};
  color: ${({ theme }) => theme.logoColor};
  letter-spacing: ${rem(10)};
  line-height: 120%;

  @media screen and (max-width: ${rem(480)}) {
    font-size: ${rem(26)};
    letter-spacing: ${rem(4)};
  }
`;

const Menu = styled.div<MenuProps>`
  width: 40px;
  height: 25px;
  position: relative;
  display: none;
  span {
    background: ${({ theme }) => theme.logoColor};
    width: 30px;
    height: 3px;
    display: block;
    margin: -2px 0 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transition: 0.3s ease;
    &:first-child {
      top: 0;
      opacity: ${({ active }) => (active ? 0 : 1)};
    }
    &:last-child {
      bottom: 0;
      opacity: ${({ active }) => (active ? 0 : 1)};
      top: auto;
    }
    &:nth-child(2) {
      transform: ${({ active }) => active && 'rotate(45deg)'};
    }
    &:nth-child(3) {
      transform: ${({ active }) => active && 'rotate(-45deg)'};
    }
  }
  @media screen and (max-width: ${rem(480)}) {
    display: block;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-width: ${rem(800)};
`;

const Icons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  font-size: ${rem(25)};
  min-width: ${rem(80)};

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    min-height: ${rem(75)};
    margin-top: ${rem(10)};
  }
`;

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 ${rem(40)};
  @media screen and (max-width: ${rem(480)}) {
    margin: 0;
  }
`;

const SearchInput = styled(Input)`
  border-radius: ${rem(50)};
  font-size: ${rem(23)};
  font-weight: bold;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: ${rem(25)};
  top: 50%;
  transform: translateY(-50%);
`;

const RightIcon = styled.div`
  position: absolute;
  right: ${rem(25)};
  top: 50%;
  transform: translateY(-50%);
`;

const mapStateToProps = state => ({
  items: state.cart.items,
  cartId: state.cart.cartId,
  pathname: state.router.location.pathname,
  customer: state.user.customer,
  authenticated: state.user.authenticated,
  bag: state.cart.bag,
});

export default connect(mapStateToProps)(Navbar);
