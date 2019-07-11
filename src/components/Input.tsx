import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { lightGrey, lighten, white, fade, dark } from 'styles/colors';

interface InputProps {
  type?: string;
  value: string;
  name: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  placeholder: string;
  className?: string;
  background?: string;
  border?: boolean;
  lightenBy?: number;
  color?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  type = 'text',
  value,
  name,
  hasLeftIcon,
  hasRightIcon,
  color,
  lightenBy,
  onChange,
  background = white,
  border,
  placeholder,
  className,
}) => {
  return (
    <Container color={color}>
      <StyledInput
        type={type}
        value={value}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        name={name}
        className={className}
        placeholder={placeholder}
        background={background}
        border={border}
        lightenBy={lightenBy}
        color={color}
        onChange={onChange}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
  align-items: center;
`;

export const StyledInput = styled.input<Partial<InputProps>>`
  padding: ${rem(6)} ${rem(20)};
  padding-left: ${({ hasLeftIcon }) => (hasLeftIcon ? rem(45) : rem(20))};
  padding-right: ${({ hasRightIcon }) => (hasRightIcon ? rem(45) : rem(20))};
  box-sizing: border-box;
  background: ${({ background, lightenBy }) =>
    lightenBy ? lighten(background, lightenBy) : background};
  border: ${({ background }) =>
    background === white ? `${rem(1)} solid ${fade(lightGrey, 0.9)}` : 'none'};
  border-radius: ${rem(10)};
  outline: none;
  color: ${({ color }) => (color ? color : 'inherit')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;
  width: 100%;

  &::placeholder {
    color: ${({ color }) => (color ? color : dark)};
  }
`;

export default Input;
