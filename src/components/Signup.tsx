import Form from 'components/Form';
import Input from 'components/Input';
import { useForm } from 'helpers/hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, dark } from 'styles/colors';
import { useDispatch } from 'react-redux';
import api from 'services/api';
import { login } from 'state/user';
import { changeStatus, throwError } from 'state/status';

interface SignUpProps {
  loginAction: () => void;
  close: () => void;
}
const SignUp: React.FunctionComponent<SignUpProps> = ({
  loginAction,
  close,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const submit = async data => {
    if (data.password !== data.confirmPassword) {
      return setErrors('password and confirm password must match');
    }
    try {
      dispatch(changeStatus(true));
      const response = await api.post('customers', data);
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
    { name: '', email: '', password: '', confirmPassword: '' },
    submit
  );

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        onFocus={() => setErrors('')}
        title="Sign Up"
        submitText="Sign Up"
        errors={errors}
      >
        <SignUpInput
          type="text"
          value={values.name}
          name="name"
          required
          placeholder="Name"
          onChange={handleChange}
        />
        <SignUpInput
          type="email"
          value={values.email}
          name="email"
          required
          placeholder="Email"
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          value={values.password}
          name="password"
          required
          minLength={6}
          placeholder="Password"
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          value={values.confirmPassword}
          name="confirmPassword"
          required
          minLength={6}
          placeholder="Password"
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
