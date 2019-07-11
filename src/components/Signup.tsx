import Form from 'components/Form';
import Input from 'components/Input';
import { useForm } from 'helpers/hooks';
import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, dark } from 'styles/colors';

const SignUp: React.FunctionComponent<{ loginAction: () => void }> = ({ loginAction }) => {
  const submit = data => {
    console.log(data);
  };
  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '', confirmPassword: '' },
    submit
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} title="Sign In">
        <SignUpInput
          type="email"
          value={values.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          value={values.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          value={values.confirmPassword}
          name="confirmPassword"
          placeholder="Retype password"
          onChange={handleChange}
        />
      </Form>
      <Footer>
        Already have an account? <Link onClick={loginAction}>Sign In</Link>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding: 0 ${rem(10)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: ${dark};
  align-items: center;
  max-width: ${rem(500)};
  width: 100%;
`;

const SignUpInput = styled(Input)`
  margin: ${rem(5)} ${rem(20)};
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

const Footer = styled.div`
  margin: ${rem(10)} auto;
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  max-width: ${rem(500)};
  width: 100%;
`;

const Link = styled.div`
  margin: 0 ${rem(20)};
  color: ${brand};
  cursor: pointer;
`;

export default SignUp;
