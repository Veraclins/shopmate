import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { grey, white, dark } from 'styles/colors';
import { rem } from 'styles';
import Facebook from 'assets/facebook.png';
import Instagram from 'assets/instagram.png';
import Twitter from 'assets/twitter.png';
import Pinterest from 'assets/pinterest.png';
import Navigation from 'components/Navigation';

interface FooterProps {
  theme?: any;
}

const Footer: React.FunctionComponent<FooterProps> = ({ theme }) => (
  <Container>
    <Main>
      <Navigation theme={theme} />
    </Main>
    <IconSection>
      <Icon src={Instagram} alt="" />
      <Icon src={Pinterest} alt="" />
      <Icon src={Twitter} alt="" />
      <Icon src={Facebook} alt="" />
    </IconSection>
    <Links>
      <div>&copy;2019 Shopmate Ltd</div>
      <div>&#9679;</div>
      <NavLink to="contact">Contact</NavLink>
      <div>&#9679;</div>
      <NavLink to="privacy">Privacy Policy</NavLink>
    </Links>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 -${rem(50)};
  padding: ${rem(50)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  background: ${dark};
  color: ${white};
  width: 100%;
  height: auto;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    padding: ${rem(20)};
    margin: 0 -${rem(20)};
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: ${rem(500)};
  width: 100%;
  margin-bottom: ${rem(20)};
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${rem(300)};
  margin-bottom: ${rem(20)};
  width: 100%;
`;

const Icon = styled.img`
  cursor: pointer;
  height: ${rem(50)};
  margin: ${rem(10)};
`;

const Links = styled.div`
  color: ${grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${rem(18)};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  max-width: ${rem(500)};
  width: 100%;
  @media screen and (max-width: ${rem(480)}) {
    flex-direction: column;
  }
`;

export default Footer;
