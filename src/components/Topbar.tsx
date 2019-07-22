import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaAddressCard } from 'react-icons/fa';

import { dark, brand, white, light, grey } from 'styles/colors';
import { rem } from 'styles';
import USFlag from 'assets/usflag.jpeg';
import Modal from 'components/Modal';
import Login from 'components/Login';
import SignUp from 'components/Signup';
import { CartItem, Customer } from 'state/interfaces';
import CartIcon from 'components/CartIcon';
import Profile from 'components/Profile';
import Address from 'components/Address';
import { logout } from 'state/user';
import { useDispatch } from 'react-redux';

interface TopBarProps {
  items: CartItem[];
  theme?: any;
  customer: Customer;
  authenticated?: boolean;
  cartId: string;
  bag: number;
}

const Top: React.FunctionComponent<TopBarProps> = ({
  theme,
  items,
  bag,
  cartId,
  customer,
  authenticated,
}) => {
  const badge = {
    badgeColor: white,
    badgeBackground: brand,
  };
  const [modalId, showModal] = useState('');
  const [showUserMenu, toggleUserMenu] = useState(false);

  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(logout());
  };

  return (
    <Container theme={theme}>
      <Auth>
        Hi! &nbsp;
        {authenticated && customer ? (
          <User>
            <AuthLink onClick={() => toggleUserMenu(!showUserMenu)}>
              {customer.name}
            </AuthLink>
            {showUserMenu && (
              <UserMenu>
                <UserMenuItem
                  onClick={() => {
                    showModal('profile');
                    toggleUserMenu(false);
                  }}
                >
                  <FaUser />
                  Update Profile
                </UserMenuItem>
                <UserMenuItem
                  onClick={() => {
                    showModal('address');
                    toggleUserMenu(false);
                  }}
                >
                  <FaAddressCard />
                  Update Address
                </UserMenuItem>
                <UserMenuItem onClick={() => LogOut()}>
                  <FaSignOutAlt />
                  Logout
                </UserMenuItem>
              </UserMenu>
            )}
          </User>
        ) : (
          <>
            <AuthLink onClick={() => showModal('login')}>Sign In</AuthLink>
            &nbsp; or &nbsp;
            <AuthLink onClick={() => showModal('sign-up')}>Register</AuthLink>
          </>
        )}
      </Auth>
      <Main>
        <NavLink to="deals">Daily Deals</NavLink>
        <NavLink to="sell">Sell</NavLink>
        <NavLink to="help">Help & Contact</NavLink>
      </Main>
      <RightNav>
        <Currency>
          <Flag src={USFlag} alt="" /> $ USD
        </Currency>
        <Details>
          <Cart>
            <CartIcon
              theme={badge}
              customer={customer}
              items={items}
              cartId={cartId}
              bag={bag}
            />
          </Cart>
          Your bag: ${bag}
        </Details>
      </RightNav>
      {modalId && (
        <Modal small close={() => showModal('')}>
          {modalId === 'login' && (
            <Login
              signUpAction={() => showModal('sign-up')}
              close={() => showModal('')}
            />
          )}
          {modalId === 'sign-up' && (
            <SignUp
              loginAction={() => showModal('login')}
              close={() => showModal('')}
            />
          )}
        </Modal>
      )}
      {modalId === 'profile' && (
        <Modal close={() => showModal('')}>
          <Profile close={() => showModal('')} customer={customer} />
        </Modal>
      )}
      {modalId === 'address' && (
        <Modal close={() => showModal('')}>
          <Address close={() => showModal('')} customer={customer} />
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 -${rem(50)};
  width: 100%;
  padding: ${rem(15)} ${rem(50)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  background: ${({ theme }) => theme.topNavBackground};
  color: ${dark};

  @media screen and (max-width: ${rem(480)}) {
    display: none;
  }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AuthLink = styled.div`
  color: ${brand};
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  padding: 0 ${rem(160)} 0 ${rem(80)};
`;

const RightNav = styled.div`
  justify-content: space-between;
  display: flex;
  min-width: ${rem(400)};
`;

const Details = styled.div`
  justify-content: space-between;
  display: flex;
`;

const Currency = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: ${rem(40)};
`;
const Cart = styled.div`
  margin: 0 ${rem(20)};
`;

const Flag = styled.img`
  height: ${rem(20)};
  margin-right: ${rem(10)};
`;

const User = styled.div`
  position: relative;
`;

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  transition: 0.5s all ease;
  z-index: 3;
  width: auto;
  background: ${light};
  white-space: nowrap;
  padding: ${rem(10)} ${rem(20)};
  display: flex;
  font-size: ${rem(14)};
  border-radius: ${rem(8)};
  min-height: ${rem(90)};
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-3)} ${dark};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UserMenuItem = styled.div`
  color: ${grey};
  display: flex;
  align-items: center;

  cursor: pointer;
  &:hover {
    border-bottom: ${rem(1)} solid;
  }
`;

export default Top;
