import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, white } from 'styles/colors';

interface FormProps {
  title?: string;
  submitText?: string;
  hasError?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FunctionComponent<FormProps> = ({
  title,
  hasError,
  onSubmit,
  submitText = 'Submit',
  children,
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <StyledForm hasError={hasError} onSubmit={onSubmit}>
        {children}
        <Submit type="submit" value={submitText} />
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
`;

const StyledForm = styled.form<Partial<FormProps>>`
  padding: ${rem(7.5)} ${rem(20)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ hasError }) => (hasError ? `${rem(1)} solid ${brand}` : 'none')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-weight: bold;
  border-radius: ${rem(50)};
  width: 100%;

  &::placeholder {
    color: ${({ color }) => color};
    opacity: 0.6;
  }
`;

const Submit = styled.input`
  margin: ${rem(20)} auto;
  padding: ${rem(15)} ${rem(40)};
  display: flex;
  background: ${brand};
  border-radius: ${rem(50)};
  color: ${white};
  align-items: center;
  font-weight: bold;
  justify-content: center;
`;

const Title = styled.div`
  margin: ${rem(20)} auto;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  font-size: ${rem(25)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  align-items: center;
`;

export default Form;
