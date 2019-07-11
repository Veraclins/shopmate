import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { brand, white } from 'styles/colors';

interface ButtonProps {
  large?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  large,
  onClick,
  children,
}) => (
  <StyledButton onClick={onClick} large={large}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button<ButtonProps>`
  margin: ${rem(20)} auto;
  padding: ${({ large }) =>
    large ? `${rem(20)} ${rem(70)}` : `${rem(15)} ${rem(40)}`};
  display: flex;
  outline: none;
  box-sizing: border-box;
  background: ${brand};
  border-radius: ${rem(50)};
  color: ${white};
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

export default Button;
