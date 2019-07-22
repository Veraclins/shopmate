import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { lightGrey, lighten, white, fade, dark } from 'styles/colors';

interface InputProps {
  type?: string;
  value: string;
  label?: string;
  name: string;
  placeholder: string;
  minLength?: number;
  required?: boolean;
  readOnly?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  className?: string;
  background?: string;
  borderless?: boolean;
  lightenBy?: number;
  color?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  type = 'text',
  value,
  name,
  hasLeftIcon,
  required,
  hasRightIcon,
  color,
  lightenBy,
  label,
  onChange,
  onKeyPress,
  minLength,
  readOnly,
  background = white,
  borderless,
  placeholder,
  className,
}) => {
  return (
    <Container color={color}>
      {label && (
        <Label>
          {label} {required && <span>*</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        value={value}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        name={name}
        className={className}
        placeholder={placeholder}
        background={background}
        borderless={borderless}
        lightenBy={lightenBy}
        color={color}
        required={required}
        readOnly={readOnly}
        minLength={minLength}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: column;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
  align-items: center;
`;

const Label = styled.label`
  color: ${({ color }) => (color ? color : 'inherit')};
  text-align: left;
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
  border: ${({ borderless }) => borderless && 'none'};
  border-radius: ${rem(10)};
  outline: none;
  color: ${({ color }) => (color ? color : 'inherit')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;
  width: 100%;

  &::placeholder {
    color: ${({ color }) => (color ? color : dark)};
    opacity: 0.6;
  }
`;

export default Input;
