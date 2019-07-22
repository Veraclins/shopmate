import Form from 'components/Form';
import Input from 'components/Input';
import { useForm } from 'helpers/hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { dark, brand } from 'styles/colors';
import { useDispatch } from 'react-redux';
import api from 'services/api';
import { changeStatus, throwError } from 'state/status';
import { login } from 'state/user';

interface LoginUpProps {
  signUpAction: () => void;
  close: () => void;
}

const Login: React.FunctionComponent<LoginUpProps> = ({
  signUpAction,
  close,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const submit = async data => {
    try {
      dispatch(changeStatus(true));
      const response = await api.post('customers/login', data);
      dispatch(login(response.data));
      close();
    } catch (error) {
      setErrors(error.message || error.data.error.message);
      dispatch(throwError(error.message || error.data.error.message));
    } finally {
      dispatch(changeStatus(false));
    }
  };
  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    submit
  );

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        onFocus={() => setErrors('')}
        title="Sign In"
        submitText="Sign In"
        errors={errors}
      >
        <LoginInput
          type="email"
          value={values.email}
          required
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <LoginInput
          type="password"
          value={values.password}
          required
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
