import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { lightGrey, white, fade, dark } from 'styles/colors';

interface TextareaProps {
  type?: string;
  value: string;
  name: string;
  color?: string;
  required?: boolean;
  maxLength?: number;
  borderless?: boolean;
  background?: string;
  className?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FunctionComponent<TextareaProps> = ({
  type = 'text',
  value,
  name,
  onChange,
  required,
  borderless,
  background = white,
  color,
  maxLength,
  className,
}) => {
  return (
    <Container>
      <StyledTextarea
        type={type}
        value={value}
        name={name}
        required={required}
        maxLength={maxLength}
        className={className}
        borderless={borderless}
        background={background}
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

export const StyledTextarea = styled.textarea<Partial<TextareaProps>>`
  padding: ${rem(6)} ${rem(20)};
  box-sizing: border-box;
  background: ${white};
  min-height: ${rem(120)};
  outline: none;
  overflow: visible;
  resize: none;
  border: ${({ background }) =>
    background === white ? `${rem(1)} solid ${fade(lightGrey, 0.9)}` : 'none'};
  border: ${({ borderless }) => borderless && 'none'};
  border-radius: ${rem(10)};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;
  width: 100%;

  &::placeholder {
    color: ${({ color }) => (color ? color : dark)};
  }
`;

export default Textarea;
