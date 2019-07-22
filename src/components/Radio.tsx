import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { lightGrey, dark } from 'styles/colors';

interface RadioProps {
  options: {
    value: string | number;
    label: string;
  }[];
  name: string;
  horizontal?: boolean;
  required?: boolean;
  selected?: string | number;
  className?: string;
  checked?: boolean;
  color?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FunctionComponent<RadioProps> = ({
  options,
  horizontal,
  required,
  color,
  name,
  selected,
  onChange,
  className,
}) => {
  return (
    <Container horizontal={horizontal}>
      {options.map((option, index) => (
        <RadioWrapper key={index} color={color}>
          <StyledRadio
            type="radio"
            value={option.value}
            name={name}
            className={className}
            checked={selected === option.value}
            color={color}
            required={required}
            onChange={onChange}
          />
          <Label>{option.label}</Label>
        </RadioWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div<{ horizontal?: boolean }>`
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  width: 100%;
  align-items: center;
`;

const RadioWrapper = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Label = styled.label`
  text-align: left;
  width: 100%;
  font-weight: normal;
  align-items: center;
`;

export const StyledRadio = styled.input<Partial<RadioProps>>`
  margin: ${rem(6)};
  border-radius: ${rem(10)};
  outline: none;
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  text-align: center;

  &::placeholder {
    color: ${({ color }) => (color ? color : dark)};
    opacity: 0.6;
  }

  &:read-only {
    background: ${lightGrey};
    cursor: not-allowed;
  }
`;

export default Radio;
