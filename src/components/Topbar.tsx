import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingBag } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { dark, brand, white } from 'styles/colors';
import { rem } from 'styles';
import GBFlag from 'assets/gbf.png';
import Badge from 'components/Badge';
import Modal from './Modal';
import Login from './Login';
import SignUp from './Signup';
import { CartItem } from 'state/interfaces';

interface TopBarProps {
  items: CartItem[];
  theme?: any;
}

const Top: React.FunctionComponent<TopBarProps> = ({ theme, items }) => {
  const badge = {
    badgeColor: white,
    badgeBackground: brand,
  };
  const [modalId, showModal] = useState('');
  return (
    <Container theme={theme}>
      <Auth>
        Hi! &nbsp;
        <AuthLink onClick={() => showModal('login')}>Sign In</AuthLink>
        &nbsp;or&nbsp;
        <AuthLink onClick={() => showModal('sign-up')}>Register</AuthLink>
      </Auth>
      <Main>
        <NavLink to="deals">Daily Deals</NavLink>
        <NavLink to="sell">Sell</NavLink>
        <NavLink to="help">Help & Contact</NavLink>
      </Main>
      <RightNav>
        <Currency>
          <Flag src={GBFlag} alt="" /> £ GBP
        </Currency>
        <Details>
          <Badge theme={badge} value={items.length}>
            <Cart>
              <FaShoppingBag />
            </Cart>
          </Badge>
          Your bag: £3.98
        </Details>
      </RightNav>
      {modalId && (
        <Modal small close={() => showModal('')}>
          {modalId === 'login' && (
            <Login signUpAction={() => showModal('sign-up')} />
          )}
          {modalId === 'sign-up' && (
            <SignUp loginAction={() => showModal('login')} />
          )}
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
  margin: 0 -${rem(30)};
  width: 100%;
  padding: ${rem(15)} ${rem(30)};
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

const mapStateToProps = (state): any => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Top);
