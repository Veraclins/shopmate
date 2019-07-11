import React from 'react';
import styled from 'styled-components';

import { white, dark } from 'styles/colors';
import { rem } from 'styles';

interface CardProps {
  small?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Card: React.FunctionComponent<CardProps> = ({
  children,
  small,
  onClick,
}) => {
  return (
    <StyledCard small={small} onClick={onClick}>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<Partial<CardProps>>`
  text-align: center;
  margin: ${rem(10)};
  padding: ${rem(16)};
  background: ${white};
  width: ${({ small }) => (small ? rem(240) : '100%')};
  max-width: ${rem(1000)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(-3)} ${dark};

  &:hover {
    box-shadow: 0 ${rem(20)} ${rem(30)} ${rem(-10)} ${dark};
  }

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    margin: ${rem(10)} 0;
    padding: ${rem(10)};
  }
`;

export default Card;
