import Form from 'components/Form';
import Input from 'components/Input';
import { useForm } from 'helpers/hooks';
import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { dark, brand } from 'styles/colors';

const Login: React.FunctionComponent<{ signUpAction: () => void }> = ({
  signUpAction,
}) => {
  const submit = data => {
    console.log(data);
  };
  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    submit
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} title="Sign In" submitText="Sign In">
        <LoginInput
          type="email"
          value={values.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <LoginInput
          type="password"
          value={values.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form>
      <Footer>
        <Link>Forgot password</Link>
        <Link onClick={signUpAction}>Have an account</Link>
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
  align-items: center;
  color: ${dark};
  max-width: ${rem(500)};
  width: 100%;
`;

const LoginInput = styled(Input)`
  margin: ${rem(5)} ${rem(20)};
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

const Footer = styled.div`
  margin: ${rem(10)} auto;
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: space-between;
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

export default Login;
